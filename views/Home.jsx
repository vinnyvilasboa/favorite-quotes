const React = require('react')
const Layout = require('../views/Layout')

class Home extends React.Component {
    render() {
        return (
            <Layout>

                <nav className="navbar navbar-expand-md">
                    <a className="navbar-brand" href="/" style={{ textDecoration: 'none' }}>
                        <img src="assets/coffee.svg"
                            style={{
                                width: '3rem',
                                height: '3rem',
                                marginLeft: "30px",
                                marginRight: "30px"
                            }} />
                        Psych•Bite
                    </a>
                </nav>

                {/* <!-- Landing --> */}
                <div className="container">
                    <div className="container header">
                        <div className="jumbotron"  >
                            <h1 className="display-5"><b>Welcome to Psych Bite</b></h1>
                            <hr className="my-4" />
                            <div className="subtitle">
                                <div class="col-md-8 offset-md-2"><p className="lead">Fuel your mind with brilliance: Wake up to a fresh, insightful quote every morning at <span style={{ color: "black" }}>7AM </span> from the wise words of <i>Dr. Jordan Peterson, C.S. Lewis, or Naval Ravikant!!</i></p></div>

                            </div>

                        </div>

                    </div>
                    {/* <!-- Email field --> */}
                    <div className="container ">
                        <form action="/user" method="POST">
                            <div className="form-group row d-flex align-items-center justify-content-center">
                                <div className="col-md-6 ">
                                    <label htmlFor="inputEmail" className="sr-only">Enter Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="inputEmail"
                                        className="form-control form-control-lg"
                                        placeholder="Enter email"
                                        />
                                </div>
                                <div className="col-md-3 d-flex align-items-center">
                                    <input
                                        type="submit"
                                        id="submitBtn"
                                        className="btn btn-primary btn-block btn-lg"
                                        value="Subscribe" ></input>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* <!-- Evenly Sized Rows --> */}
                    <div className="author-container">
                        <div className="row justify-content-around" style={{ minHeight: "25vh" }}>
                            <div className="col-sm-2 bg-light thumbnail1"></div>
                            <div className=" col-sm-7  bg-light author-text">
                                <h4>Dr. Jordan Peterson</h4>
                                <p >Canadian clinical psychologist and professor known for his lectures and books on psychology, religion, and politics. His work explores the relationship between individual responsibility and personal freedom, and he has become a polarizing figure in public discourse.</p>

                            </div>
                        </div>
                        <div className="row justify-content-around" style={{ minHeight: "25vh" }}>
                            <div className="col-sm-2  bg-light thumbnail2"></div>
                            <div className=" col-sm-7 bg-light author-text">
                                <h4>C.S Lewis</h4>
                                <p >British writer and scholar famous for his Christian apologetics and fantasy novels. He wrote extensively on theology, ethics, and the nature of humanity, and his works continue to influence Christian thinking and popular culture today.</p>
                            </div>
                        </div>
                        <div className="row justify-content-around" style={{ minHeight: "25vh" }}>
                            <div className="col-sm-2  bg-light thumbnail3"></div>
                            <div className=" col-sm-7 bg-light author-text">
                                <h4>Naval Ravikant</h4>
                                <p>An entrepreneur, investor, and writer known for his ideas on startups, wealth, and personal growth. He is the founder of AngelList and has been an early investor in several successful startups. His writing focuses on the principles of building wealth and living a fulfilling life.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer" style={{ minHeight: "20vh" }}></div>

            </Layout>
        )
    }
}


module.exports = Home
