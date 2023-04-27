const React = require('react')
const Layout = require('./Layout')

class New extends React.Component{
    render(){
        return(
            <Layout>
                <form action="/quotes/quote" method='POST'>
                    <div className="form-group row d-flex align-items-center justify-content-center">
                        <div className="col-md-6 ">
                            <label htmlFor="quote" className="sr-only">Enter Quote</label>
                            <input
                                type="quote"
                                name="quote"
                                id="inputEmail"
                                className="form-control form-control-lg"
                                placeholder="Enter quote"
                                />
                        </div>
                        <div className="col-md-6 ">
                            <label htmlFor="author" className="sr-only">Enter Author</label>
                            <input
                                type="author"
                                name="author"
                                id="inputEmail"
                                className="form-control form-control-lg"
                                placeholder="Enter author"
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
            </Layout>
        )
    }
}

module.exports = New