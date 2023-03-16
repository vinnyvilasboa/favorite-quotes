const React = require('react')
const Layout = require('./Layout')


class Home extends React.Component {
    render() {
        return (
            <Layout>
             
                <nav className="navbar navbar-expand-md">
                    <a className="navbar-brand">Psych•Bite</a>
                </nav>
                {/* <!-- Landing --> */}
                <div className="container">
                    <div className="jumbotron">
                        <h1 className="display-4">Welcome to Psych•Bite</h1>
                        <p className="lead">Fuel your mind with brilliance: Wake up to a fresh, insightful quote every morning from the wise words of Dr. Jordan Peterson, C.S. Lewis, or Naval Ravikant.</p>
                    </div>
                    {/* <!-- Email field --> */}
                    <div className="container">
                        <form action="/user" method="POST">
                            <div className="form-group row">
                                <div className="col-md-6 offset-md-3">

                                    <label htmlFor="inputEmail" className="sr-only">Enter Email</label>
                                    <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Enter email" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-6 offset-md-3">
                                    <input type="submit" id="submitBtn" className="btn btn-primary btn-block" value="Subscribe" ></input>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* <!-- Evenly Sized Rows --> */}
                    <div className="row">
                        <div className="col-sm-3 bg-dark"></div>
                        <div className="col-sm-9 bg-light"></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 bg-dark"></div>
                        <div className="col-sm-9 bg-light"></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 bg-dark"></div>
                        <div className="col-sm-9 bg-light"></div>
                    </div>
                </div>
            </Layout>
        )
    }
}

module.exports = Home
