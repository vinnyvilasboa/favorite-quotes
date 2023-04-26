const React = require('react')
const Layout = require('./Layout')

class Access extends React.Component{
    render(){
        return(
            <Layout>
                <div className="container">
                    <form action="/quotes">
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
                </div>
            </Layout>
        )
    }
}

module.exports = Access