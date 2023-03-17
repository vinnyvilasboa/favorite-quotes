const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const functions = require('./server')
const PORT = process.env.PORT

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
    while (archive.includes(randomQuote._id)) {
        randomIndex = Math.floor(Math.random() * quoteDB.length);
        randomQuote = quoteDB[randomIndex]
    }
    // add quote to archive until there are 7, then replace new one with an existing one. 
    if (archive.length < 7) {
        functions.newArchive({ _id: randomQuote._id })
    } else {
        let id = archive[0]._id
        functions.removeArchive(id)
        functions.newArchive({ _id: randomQuote._id })
    }
    console.log("Here is your quote of the day: " + '"' + randomQuote.quote + '" ' + "by " + randomQuote.author)
    return "Here is your quote of the day: " + '" "' + randomQuote.quote + '" "' + "by " + randomQuote.author

}

async function sendEmails() {
    console.log('Send mail function')
    const result = await getRandomQuote()
    let quotes = await functions.getAllQuotes()
    const users = await functions.getAllUsers()

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
        to: "Subscribers <vinnycesca@gmail.com>",
        bcc: '',
        subject: "Quote of the Day",
        text: `Good Morning!\n\n${result}`,
        envelope: {
            from: 'lookout-intothe@outlook.com',
            to: "Subscribers <vinnycesca@gmail.com>"
        }
    }

    for(let user of users){
        if(message.bcc === ''){
            message.bcc = `${user.email}`
        } else {
            message.bcc += `, ${user.email}`
        }
    }
    console.log(message.to)
    console.log(message.bcc)
   
    ////////////////////////////////
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(0, 7)];
    rule.hour = 8;
    rule.minute = 00;

    const job = schedule.scheduleJob(rule, async function () {
        // loops through all users subscribed
        // update the user receiveing the email
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log(message.to, " didn't receive the email. Error: ", error);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });
        console.log('Task running at 8am every day');
    })

}

sendEmails().catch(console.error)

functions.app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})

