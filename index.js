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
    return "Here is your quote of the day: " + '"' + randomQuote.quote + '" ' + "by " + randomQuote.author


}


async function sendEmails(){
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
        to: 'lucas2carlos@hotmail.com',
        subject: "Quote of the Day",
        text: `Good Morning!\n\n${result}`
    }
    ////////////////////////////////
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(0, 7)];
    rule.hour = 8;
    rule.minute = 0;
    // for(let user of users){
    //     message.to += ', ', user.email
    // }
    // console.log(message.to)

    ////////////////////////////////
    // let info = await transporter.sendMail({
    //     from: '"Daily Quotes" lookout-intothe@outlook.com', // sender address
    //     to: "lucas2carlos@gmail.com", // list of receivers
    //     subject: "Quote of the Day", // Subject line
    //     text: `Good Morning!\n\n${result}`, // plain text body
    //     // html: `<b>Good Morning!\n\n${result}</b>`, // html body
    //   });
    //   console.log("Message sent: %s", info.messageId);
    const job = schedule.scheduleJob(rule, async function () {
        // loops through all users subscribed
        for(let user of users){
            message.to = user.email
            //update the user receiveing the email
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

sendEmails().catch(console.error)

// PM2 breakdown: https://pm2.keymetrics.io/docs/usage/log-management/

