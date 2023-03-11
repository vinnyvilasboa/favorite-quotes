const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const functions = require('./server')

// email credentials
const userEmail = process.env.EMAIL;
const password = process.env.EMAIL_PASS;


async function getRandomQuote() {
    // archive is where old quotes are stored
    const archive = await functions.allArchives()
    // quote database
    const quoteDB = await functions.getAllQuotes()
    let randomIndex = Math.floor(Math.random() * quoteDB.length);
    let randomQuote = quoteDB[randomIndex]
    // loop if quote is included in archive
    while(archive.includes(randomQuote._id)){
        randomIndex = Math.floor(Math.random() * quoteDB.length);
        randomQuote = quoteDB[randomIndex]
    }
    // add quote to archive until there are 7, then replace new one with an existing one. 
    if(archive.length < 7){
        functions.newArchive({_id: randomQuote._id})
    } else {
        let id = archive[0]._id
        functions.removeArchive(id)
        functions.newArchive({_id: randomQuote._id})
    }
    console.log("Here is your quote of the day: " + '"' + randomQuote.quote + '" ' + "by " + randomQuote.author )
    return "Here is your quote of the day: " + '" "' + randomQuote.quote + '" "' + "by " + randomQuote.author 

}


async function sendEmails(){
const result = await getRandomQuote()

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
    from: 'lookout-intothe@outlook.com',
    to: '',
    subject: "Quote of the Day",
    html: '<h1>Good Morning!</h1><br/>' + result
};

////////////////////////////////
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0, 7)];
rule.hour = 13;
rule.minute = 30;

////////////////////////////////


const job = schedule.scheduleJob(rule, async function () {
    let quotes = await functions.getAllQuotes()
    const users = await functions.getAllUsers()
    // loops through all users subscribed
    for(let user of users){
        //update the user receiveing the email
        message.to = user.email;
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log(message.to, " didn't receive the email. Error: ", error);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });
    }
    console.log('Task running at 8am every day');
})

}

sendEmails()

// PM2 breakdown: https://pm2.keymetrics.io/docs/usage/log-management/

