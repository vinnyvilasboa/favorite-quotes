require('dotenv').config()
const express  = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')
const app = express()
const userController = require('./controllers/user')
const quoteController = require('./controllers/quotes')
const path = require('path')
const Quote = require('./models/quote')
const User = require('./models/user')
// This is where the old quotes will be stored
const Archive = require('./models/archive')
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
// const functions = require('./server')
const PORT = process.env.PORT || 3000


//views
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())


//MVC SETUP


//Models
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


//Middleware
app.use(morgan('tiny'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static('public'));

app.use((req, res, next) => {
    next()
})


// Routes
app.use('/', userController)
app.use('/quotes', quoteController)

app.get('/*', (req, res) => {
    res.redirect('/')
})


// email credentials
const userEmail = process.env.EMAIL;
const password = process.env.EMAIL_PASS;


async function getRandomQuote() {
    // archive is where old quotes are stored
    const archive = await allArchives()
    // quote database
    const quoteDB = await getAllQuotes()
    let randomIndex = Math.floor(Math.random() * quoteDB.length);
    let randomQuote = quoteDB[randomIndex]
    // loop if quote is included in archive
    while (archive.includes(randomQuote._id)) {
        randomIndex = Math.floor(Math.random() * quoteDB.length);
        randomQuote = quoteDB[randomIndex]
    }
    // add quote to archive until there are 7, then replace new one with an existing one. 
    if (archive.length < 7) {
        newArchive({ _id: randomQuote._id })
    } else {
        let id = archive[0]._id
        removeArchive(id)
        newArchive({ _id: randomQuote._id })
    }
    console.log('Here is your quote of the day: "' + randomQuote.quote + '"' + ' by '  + randomQuote.author)
    return 'Here is your quote of the day: "' + randomQuote.quote + '"' + ' by '  + randomQuote.author

}

let unsubscribeEmail


async function sendEmails() {
    console.log('Send mail function')
    const result = await getRandomQuote()
    const users = await getAllUsers()
    const emailHTML = `
    <h2>Good Morning!</h2>
    <p style="font-size:large"><span style="color:red">Here is your quote of the day: </span>${result}</p>
    <br/>
    <a href="https://psych-bite.herokuapp.com/user?email=${unsubscribeEmail}">Click me</a>
    `

    const transporter = nodemailer.createTransport({
        host: 'smtp.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: `${userEmail}`,
            pass: `${password}`
        }
    });

    let message = {
        from: 'Daily Quotes <lookout-intothe@outlook.com>',
        to: "Subscribers <vinnycesca@gmail.com>",
        bcc: '',
        subject: "Quote of the Day",
        text: `Good Morning!\n\n${result}`,
    }

    // for(let user of users){
    //     if(message.bcc === ''){
    //         message.bcc = `${user.email}`
    //     } else {
    //         message.bcc += `, ${user.email}`
    //     }
    // }
   
    ////////////////////////////////
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(0, 7)];
    rule.hour = 7;
    rule.minute = 00;

    const job = schedule.scheduleJob(rule, async function () {
        // loops through all users subscribed
        // update the user receiveing the email
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log(message.bcc, " didn't receive the email. Error: ", error);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });
        console.log(`Task running at ${rule.hour}am every day!`);
    })

    // for(let user of users){
    //     message = {
    //         from: 'Daily Quotes <lookout-intothe@outlook.com>',
    //         subject: "Quote of the Day",
    //         text: `Good Morning!\n\n${result}`,
    //         html: `${emailHTML}`
    //     }
    //     message.to = `Subscribers <${user.email}>`
    //     unsubscribeEmail = user.email
        
    //     transporter.sendMail(message, (error, info) => {
    //         if (error) {
    //             console.log(message.to, " didn't receive the email. Error: ", error);
    //         } else {
    //             console.log(`Email sent: ${info.response}`);
    //             console.log(info.accepted)
    //         }
    //     });
    // }


    // message = {
    //     from: 'Daily Quotes <lookout-intothe@outlook.com>',
    //     bcc: '',
    //     subject: "Quote of the Day",
    //     text: `Good Morning!\n\n${result}`,
    //     html: `${emailHTML}`
    // }
    // message.to = `Subscribers <lucas2carlos@hotmail.com>`
    // unsubscribeEmail = 'lucas2carlos@hotmail.com'
    
    // transporter.sendMail(message, (error, info) => {
    //     if (error) {
    //         console.log(message.to, " didn't receive the email. Error: ", error);
    //     } else {
    //         console.log(`Email sent: ${info.response}`);
    //         console.log(info.accepted)
    //     }
    // })

}


const getAllQuotes = async() => {
    try{
        const quotes = await Quote.find({})
        return quotes
    } catch(e) {
        console.log(e)
        return e
    }
}

const getAllUsers = async () => {
    try{
        const users = await User.find({})
        return users
    } catch(e) {
        console.log(e)
        return e
    }
}


//Get all Archives
const allArchives = async () => {
    try{
        const archives = await Archive.find({})
        return archives
    } catch(e) {
        console.log(e)
        return e
    }
}




// Create Archive quote
const newArchive = (quote) => {
    try{
        Archive.create(quote)
    }catch(err){
        console.log(err)
    }
}

//Delete Archive
const removeArchive = async (id) => {
    try{
        return await Archive.findByIdAndDelete(id)
    } catch(e) {
        console.log(e)
        return e
    }
}


sendEmails().catch(console.error)

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})

