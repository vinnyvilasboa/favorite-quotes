require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')
const app = express()
const userRoutes = require('./routes/user')
const quoteRoutes = require('./routes/quotes')
const {scheduleEmails} = require('./nodemailer')
const path = require('path')
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
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'));

app.use((req, res, next) => {
    next()
})


// Routes
app.use('/', userRoutes)
app.use('/quotes', quoteRoutes)

app.get('/*', (req, res) => {
    res.redirect('/')
})

// Send emails
scheduleEmails()


app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})


