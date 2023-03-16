const React = require('react')
const Layout = require('./Layout')


class Home extends React.Component {
    render() {
        return (
            <Layout>

                <nav className="navbar navbar-expand-md">
                    <a className="navbar-brand" href="#" style={{ textDecoration: 'none' }}>
                        <img src="assets/coffee.svg" style={{ width: '50px', height: '50px' }} />
                    </a>

                </nav>
                {/* <!-- Landing --> */}
                <div className="container">
                    <div className="container header ">
                        <div className="jumbotron" >
                      
                            <h1 className="display-4">Welcome to Psych•Bite</h1>
                            <hr class="my-4" />
                            <p className="lead">Fuel your mind with brilliance: <br />Wake up to a fresh, insightful quote every morning from the wise words of <br />Dr. Jordan Peterson, C.S. Lewis, or Naval Ravikant.</p>
                        </div>
                    </div>
                    {/* <!-- Email field --> */}
                    <div className="container ">
                        <form action="/user" method="POST">
                            <div className="form-group row d-flex align-items-center justify-content-center">
                                {/* <div className="col-md-2"></div> */}
                                <div className="col-md-6 ">
                                    <label htmlFor="inputEmail" className="sr-only">Enter Email</label>
                                    <input type="email" name="email" id="inputEmail" className="form-control form-control-lg" placeholder="Enter email" />
                                </div>
                                <div className="col-md-3 d-flex align-items-center">
                                    <input type="submit" id="submitBtn" className="btn btn-primary btn-block btn-lg" value="Subscribe" ></input>
                                </div>
                            </div>
                            {/* <div className="col-md-2 "></div> */}
                        </form>
                    </div>
                    {/* <!-- Evenly Sized Rows --> */}
                    <div className="author-container">
                        <div className="row">
                            <div className="col-sm-3 bg-light thumbnail1"></div>
                            <div className="col-sm-9 bg-light"></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3  bg-light thumbnail2"></div>
                            <div className="col-sm-9 bg-light"></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3  bg-light thumbnail3"></div>
                            <div className="col-sm-9 bg-light"></div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

module.exports = Home
