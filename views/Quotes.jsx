const React = require('react')
const Layout = require('./Layout')

class Quotes extends React.Component{
    render(){
        const {quotes} = this.props
        return(
            <Layout>
                <div>
                    <h1>Quotes</h1>
                    {
                        quotes.map((quote) => {
                            return(
                                <div>
                                    <h4>{quote.quote}</h4>
                                    <p>By {quote.author} </p>
                                </div>
                            )
                        })
                    }
                </div>
            </Layout>
        )
    }
}

module.exports = Quotes