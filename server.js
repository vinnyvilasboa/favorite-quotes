



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




