const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

const allQuotes = [
    {
        quote: "Do not let your children do anything that makes you dislike them.",
        author: "Jordan Peterson"
    },
    {
        quote: "Happiness is a pointless goal. Strive for meaning instead.",
        author: "Jordan Peterson"
    },
    {
        quote: "Compare yourself to who you were yesterday, not to who someone else is today.",
        author: "Jordan Peterson"
    },
    {
        quote: "It is far better to render Beings in your care competent than to protect them.",
        author: "Jordan Peterson"
    },
    {
        quote: "People who have everything given to them become lazy, selfish, and insensitive to the real values of life.",
        author: "Jordan Peterson"
    },
    {
        quote: "People who have everything given to them become lazy, selfish, and insensitive to the real values of life.",
        author: "Jordan Peterson"
    },
    {
        quote: "The things that are necessary and evil should be done joyfully.",
        author: "Jordan Peterson"
    },
    { quote: "You're going to pay a price for every bloody thing you do and everything you don't do. You don't get to choose to not pay a price. You get to choose which poison you're going to take. That's it.", author: "Jordan Peterson" },
    {
        quote: "Do not allow yourself to become corrupted. Just because society is unjust doesn't mean that you have to be.",
        author: "Jordan Peterson"
    },
    {
        quote: "There is no faith and no courage and no sacrifice in doing what is expedient.",
        author: "Jordan Peterson"
    },
    { quote: "There is no route that you can take to escape the limitations that constitute existence." },
    {
        quote: "The pursuit of happiness is a pointless goal. Happiness is a fleeting byproduct of meaningful action.",
        author: "Jordan Peterson"
    },
    {
        quote: "Desire is a contract you make with yourself to be unhappy until you get what you want.",
        author: "Naval Ravikant"
    },
    {
        quote: "Happiness is a state where nothing is missing.",
        author: "Naval Ravikant"
    },
    {
        quote: "The fundamental delusion - there is something out there that will make me happy and fulfilled forever.",
        author: "Naval Ravikant"
    },
    {
        quote: "A fit body, a calm mind, and a house full of love. These things cannot be bought – they must be earned.",
        author: "Naval Ravikant"
    },
    {
        quote: "The trick to forgetting the big picture is to look at everything close-up.",
        author: "Naval Ravikant"
    },
    {
        quote: "Suffering is a moment of clarity, when you can no longer deny the truth of a situation and are forced into uncomfortable change.",
        author: "Naval Ravikant"
    },
    {
        quote: "Seek wealth, not money or status. Wealth is having assets that earn while you sleep. Money is how we transfer time and wealth. Status is your place in the social hierarchy.",
        author: "Naval Ravikant"
    },
    {
        quote: "The best way to get your life back is to stop reading everyone else's and start writing your own.",
        author: "Naval Ravikant"
    },
    {
        quote: "If you want to be successful, surround yourself with people who are more successful than you are, but if you want to be happy, surround yourself with people who are less successful than you are.",
        author: "Naval Ravikant"
    },
    {
        quote: "Don't do things that you know are morally wrong. Not because someone is watching, but because you are. Self-esteem is just the reputation that you have with yourself.",
        author: "Naval Ravikant"
    }, {
        quote: "We are what we believe we are.",
        author: "C.S. Lewis"
    },
    {
        quote: "I believe in Christianity as I believe that the sun has risen: not only because I see it, but because by it I see everything else.",
        author: "C.S. Lewis"
    },
    {
        quote: "You can never get a cup of tea large enough or a book long enough to suit me.",
        author: "C.S. Lewis"
    },
    {
        quote: "True humility is not thinking less of yourself; it is thinking of yourself less.",
        author: "C.S. Lewis"
    },
    {
        quote: "To be a Christian means to forgive the inexcusable because God has forgiven the inexcusable in you.",
        author: "C.S. Lewis"
    },
    {
        quote: "The task of the modern educator is not to cut down jungles, but to irrigate deserts.",
        author: "C.S. Lewis"
    },
    {
        quote: "You are never too old to set another goal or to dream a new dream.",
        author: "C.S. Lewis"
    },
    {
        quote: "Hardships often prepare ordinary people for an extraordinary destiny.",
        author: "C.S. Lewis"
    },
    {
        quote: "There are far, far better things ahead than any we leave behind.",
        author: "C.S. Lewis"
    },
    {
        quote: "We are mirrors whose brightness is wholly derived from the sun that shines upon us.",
        author: "C.S. Lewis"
    }
];


function getRandomQuote() {
    let randomIndex = Math.floor(Math.random() * allQuotes.length);
    let randomQuote = allQuotes[randomIndex]
    console.log("Here is your quote of the day: " + '"' + randomQuote.quote + '" ' + "by " + randomQuote.author )
    return "Here is your quote of the day: " + '"' + randomQuote.quote + '" ' + "by " + randomQuote.author

    
}

const result = getRandomQuote()

const transporter = nodemailer.createTransport({
    host: 'smtp.outlook.com',
  port: 587,
  secure: false,
  auth: {
      user: 'lookout-intothe@outlook.com',
      pass: 'Vini11!!qq'
    }
});
const message = {
    from: 'lookout-intothe@outlook.com',
    to:'vinnycesca@gmail.com',
    subject: "Quote of the Day",
    text: `Good Morning!\n\n${result}`
}
////////////////////////////////
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0, 7)];
rule.hour = 8;
rule.minute = 0;
////////////////////////////////


const job = schedule.scheduleJob(rule,function(){
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });

})


