require('dotenv').config()
const express  = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const Quote = require('./models/quote')
const User = require('./models/user')
// This is where the old quotes will be stored
const Archive = require('./models/archive')
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
// const functions = require('./server')
const PORT = process.env.PORT


//views
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())


//MVC SETUP
app.use(express.static('public'));
app.use(methodOverride('_method'))

//Models
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.set('strictQuery', true)

//Middleware
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    next()
})

app.get('/', (req, res) => {
    res.render('Home')
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

async function sendEmails() {
    console.log('Send mail function')
    const result = await getRandomQuote()
    const users = await getAllUsers()

    const transporter = nodemailer.createTransport({
        host: 'smtp.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: `${userEmail}`,
            pass: `${password}`
        }
    });

    const message = {
        from: 'Daily Quotes <lookout-intothe@outlook.com>',
        to: "Subscribers <vinnycesca@gmail.com>",
        bcc: '',
        subject: "Quote of the Day",
        text: `Good Morning!\n\n${result}`,
    }

    for(let user of users){
        if(message.bcc === ''){
            message.bcc = `${user.email}`
        } else {
            message.bcc += `, ${user.email}`
        }
    }
   
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

}




const getAllQuotes = async() => {
    return await Quote.find({})
}

const getAllUsers = async () => {
    return await User.find({})
}

//Get all Archives
const allArchives = async () => {
    return await Archive.find({})
}

//Delete User
app.delete('/user', (req, res) => {
    User.findOneAndDelete({email: req.body}, (err) => {
        if(err){
            res.status(400).send(err)
        } else {
            res.render('Home')
        }
    })
})

// Create User
app.post('/user', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if(err){
            res.status(403).send(err)
        } else {
            res.render('Home')
        }
    })
})

// Create Quote
app.post('/quote', (req, res) => {
    Quote.create(req.body, (err, createdQuote) => {
        if(err){
            res.status(403).send(err)
        } else {
            res.redirect('/')
        }
    })
})

// Create Archive quote
const newArchive = (quote) => {
    Archive.create(quote, (err, archivedQuote) => {
        if(err){
            console.log(err)
        } else {
            console.log('quote archived, ', archivedQuote)
        }
    })
}

//Delete Archive
const removeArchive = async (id) => {
   await Archive.findByIdAndDelete(id)
}

//Catch all
app.get('/*', (req, res) => {
    res.render('Home.jsx')
})

sendEmails().catch(console.error)

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})

