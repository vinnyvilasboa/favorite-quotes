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
const cron = require('node-cron')
const https = require('node:https');
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
    while (archive.includes({quoteId: randomQuote._id})) {
        randomIndex = Math.floor(Math.random() * quoteDB.length);
        randomQuote = quoteDB[randomIndex]
    }
    // add quote to archive until there are 7, then replace new one with an existing one. 
    if (archive.length < 7) {
        newArchive(randomQuote)
    } else {
        let id = archive[0].quoteId
        removeArchive(id)
        newArchive(randomQuote)
    }
    console.log('Here is your quote of the day: "' + randomQuote.quote + '"' + ' by '  + randomQuote.author)
    return randomQuote

}


// Open the page to prevent idling in the morning
cron.schedule('10 50 6 * * *', () => {
    https.get("https://psych-bite.herokuapp.com/")
    console.log('opening page at 6:50am');
  });

async function sendEmails() {
    console.log('Send mail function')
    const result = await getRandomQuote()
    const users = await getAllUsers()

    const emailHtml = `
        <h2 style="font-style:bold; text-decoration:underline">Good Morning!</h2>
        <p style="font-size:large; margin-bottom:0"><span style="text-decoration:underline">Here is your quote of the day</span>: "${result.quote}"</p>
        <p style="margin-top:0; font-style:italic">by ${result.author}</p>
        <br/>
        <a style="text-decoration:none" href="https://psych-bite.herokuapp.com/unsubscribe">Unsubscribe</a>
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
        text: `Good Morning!\n\n${result.quote} by ${result.author}`,
        html: emailHtml
    }

   
    ////////////////////////////////
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(0, 7)];
    rule.hour = 7;
    rule.minute =00;

    // delay function 
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    const job = schedule.scheduleJob(rule, async function () {
        // loops through all users subscribed
        // update the user receiveing the email

        for(let user of users){
            // console.log(user.email)
            message = {
                from: 'Daily Quotes <lookout-intothe@outlook.com>',
                subject: "Quote of the Day",
                text: `Good Morning!\n\n${result.quote} by ${result.author}`,
                html: emailHtml
            }
            message.to = `Subscribers <${user.email}>`

            // Adds a 5 second delay between each email to prevent maximun limit reach
            await delay(5000)
            
            transporter.sendMail(message, (error, info) => {
                // console.log('SENT EMAIL TO: ', user)
                if (error) {
                    console.log(message.to, " didn't receive the email. Error: ", error);
                } else {
                    console.log(`Email sent: ${info.response}`);
                    console.log(info.accepted)
                }
            });
        }
        console.log(`Task running at ${rule.hour}am every day!`);
    })
    
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
        console.log('New Archive')
        console.log(quote)
        // console.log(req.body)
        Archive.create({quoteId:quote._id, quote: quote.quote, author:quote.author})
    }catch(err){
        console.log(err)
    }
}

//Delete Archive
const removeArchive = async (id) => {
    try{
        return await Archive.findOneAndDelete({quoteId: id})
    } catch(e) {
        console.log(e)
        return e
    }
}


sendEmails().catch(console.error)

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})

