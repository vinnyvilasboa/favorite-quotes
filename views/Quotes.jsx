const React = require('react')
const Layout = require('./Layout')

class Quotes extends React.Component{
    render(){
        const {quotes, access} = this.props
        return(
            <Layout>
                {
                    !access ?
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
                    :
                        <>
                            <h1>Quotes</h1>
                            <form action="/quotes/new">
                                <div className="form-group row d-flex align-items-center justify-content-center">
                                    <div className="col-md-3 d-flex align-items-center">
                                        <input
                                            type="submit"
                                            className="btn btn-success btn-block btn-sm"
                                            value="New Quote" ></input>
                                    </div>
                                </div>
                            </form>
                            {
                                quotes.map((quote) => {
                                    return(
                                        <div key={quote._id} className="form group d-flex flex-column align-items-center py-4">
                                            <h4 className="my-1 text-center">{quote.quote}</h4>
                                            <p className="mb-1">By {quote.author} </p>
                                            <div className="d-flex col-2 justify-content-around">
                                                <a href="" className="btn btn-primary" id="submitBtn">Edit</a>
                                                <a href="" className="btn btn-danger">Delete</a>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>

                }
            </Layout>
        )
    }
}

module.exports = Quotes