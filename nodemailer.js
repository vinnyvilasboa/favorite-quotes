const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const {getAllQuotes} = require('./controllers/quotes')
const {getAllUsers} = require('./controllers/user')
const archivesController = require('./controllers/archive')
const { addHours } = require('date-fns');


// email credentials
const userEmail = process.env.EMAIL;
const password = process.env.EMAIL_PASS;


async function getRandomQuote() {
    // archive is where old quotes are stored
    const archive = await archivesController.allArchives()
    // quote database
    const quoteDB = await getAllQuotes()
    let randomIndex = Math.floor(Math.random() * quoteDB.length);
    let randomQuote = quoteDB[randomIndex]
    // loop if quote is included in archive
    while (archive.includes({ quoteId: randomQuote._id })) {
        randomIndex = Math.floor(Math.random() * quoteDB.length);
        randomQuote = quoteDB[randomIndex]
    }
    // add quote to archive until there are 7, then replace new one with an existing one. 
    if (archive.length < 7) {
        archivesController.newArchive(randomQuote)
    } else {
        let id = archive[0].quoteId
        archivesController.removeArchive(id)
        archivesController.newArchive(randomQuote)
    }
    console.log('Here is your quote of the day: "' + randomQuote.quote + '"' + ' by ' + randomQuote.author)
    return randomQuote

}


const transporter = nodemailer.createTransport({
    host: 'smtp.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: `${userEmail}`,
        pass: `${password}`
    }
});

let message = {}

async function scheduleEmails() {
    console.log('Send mail function')
    const result = await getRandomQuote()
    const users = await getAllUsers()
    

    const emailHtml = `
    <html>
        <head>
            <style>
                .header {
                    background-color: #0074D9; 
                    color: #FFFFFF;
                    padding: 20px; 
                    text-align: center;
                }
                .body {
                    background-color: white; 
                    color: #000000; 
                    padding: 20px;
                }

            </style>
        </head>
        <body>
            <div class="header">
                <h2>Good Morning,</h2>
                <h3>Here is your quote of the day: </h3>
            </div>
            <div class="body">
            <h3>"${result.quote}"</h3>
             <p style="margin-top:0; font-style:italic">by ${result.author}</p>
            </div>
            <br/>
           <small style="margin-top:0; font-style:italic"><a style="text-decoration:none" href="https://psych-bite.herokuapp.com/unsubscribe">Unsubscribe</a></small>
        </body>
    </html>
`;


    message = {
        from: 'Daily Quotes <lookout-intothe@outlook.com>',
        to: "Subscribers <vinnycesca@gmail.com>",
        bcc: '',
        subject: "Quote of the Day",
        text: `Good Morning!\n\n${result.quote} by ${result.author}`,
        html: emailHtml
    }


    ////////////////////////////////
    // Get the current UTC time
    const utcDate = addHours(new Date(), -new Date().getTimezoneOffset() / 60);

    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(0, 6)];
    rule.hour =11;
    rule.minute = 05;
    rule.tz = 'UTC';
    rule.start = utcDate;

    // delay function 
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    const job = schedule.scheduleJob(rule, async function () {

        // loops through all users subscribed
        for (let user of users) {
            message = {
                from: 'Daily Quotes <lookout-intothe@outlook.com>',
                subject: "Quote of the Day",
                text: `Good Morning!\n\n${result.quote} by ${result.author}`,
                html: emailHtml
            }
            // update the user receiveing the email
            message.to = `Subscribers <${user.email}>`

            // Adds a 5 second delay between each email to prevent maximun limit reach
            await delay(5000)

            transporter.sendMail(message, (error, info) => {
                if (error) {
                    console.log(message.to, " didn't receive the email. Error: ", error);
                } else {
                    console.log(`Email sent: ${info.response}`);
                    console.log(info.accepted)
                }
            });
        }
        console.log(`Task running at ${rule.hour - 4}am every day!`);
    })

}

const oneEmail = async () => {
    const result = await getRandomQuote()
    message = {
        from: 'Test Email <lookout-intothe@outlook.com>',
        subject: "Test",
        to: 'lucas2carlos@gmail.com',
        text: `Good Morning!\n\n${result.quote} by ${result.author}`,
    }
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent: ${info.response}`);
            console.log(info.accepted)
        }
    });
}



module.exports = {
    scheduleEmails,
    oneEmail
}