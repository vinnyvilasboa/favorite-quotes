const React = require('react')
const Layout = require('./Layout')

class Quotes extends React.Component{
    render(){
        const props = this.props
        const {quotes} = props
        return(
            <Layout>
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
            </Layout>
        )
    }
}

module.exports = Quotes