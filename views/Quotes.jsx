const React = require('react')
const Layout = require('./Layout')

class Quotes extends React.Component{
    render(){
        const {quotes, access} = this.props
        return(
            <Layout>
                {
                    !access ?
                        <div className="container">
                            <form action="/quotes/access" method='POST'>
                                <div className="form-group row d-flex align-items-center justify-content-center">
                                    <div className="col-md-6 ">
                                        <label htmlFor="inputPassword" className="sr-only">Enter Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="inputEmail"
                                            className="form-control form-control-lg"
                                            placeholder="Enter password"
                                            />
                                    </div>
                                    <div className="col-md-3 d-flex align-items-center">
                                        <input
                                            type="submit"
                                            id="submitBtn"
                                            className="btn btn-primary btn-block btn-lg"
                                            value="Submit" ></input>
                                    </div>
                                </div>
                            </form>
                        </div> :
                        <div>
                            <h1>Quotes</h1>
                            {
                                quotes.map((quote) => {
                                    return(
                                        <div key={quote._id}>
                                            <h4>{quote.quote}</h4>
                                            <p>By {quote.author} </p>
                                        </div>
                                    )
                                })
                            }
                        </div>

                }
            </Layout>
        )
    }
}

module.exports = Quotes