const React = require('react')
// import React from 'react'
// import Layout from './Layout'
const Layout = require('./Layout')
// import css from './Home.css'


class Home extends React.Component {
    render(){
        return(
            <Layout>
                {/* <!-- Nav --> */}
                <nav className="navbar navbar-expand-md">
                    <a className="navbar-brand">Psych•Bite</a>
                </nav>
                {/* <!-- Landing --> */}
                <div className="container">
                    <div className="jumbotron">
                        <h1 className="display-4">Welcome to Psych•Bite</h1>
                        <p className="lead">A service that emails a random quote from either <br /> Dr. Jordan Peterson, C.S Lewis or
                            Naval
                            Ravikant everyday at <b>8am</b> to start your morning with a bite of knowledge.</p>
                    </div>
                    {/* <!-- Email field --> */}
                    <div className="container">
                        <form>
                            <div className="form-group row">
                                <div className="col-md-6 offset-md-3">

                                    <label htmlFor="inputEmail" className="sr-only">Enter Email</label>
                                    <input type="email" id="inputEmail" className="form-control" placeholder="Enter email"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-6 offset-md-3">
                                    <button type="submit" id="submitBtn" className="btn btn-primary btn-block">Subscribe</button>
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
// export default Home