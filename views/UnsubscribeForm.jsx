const React = require('react')
const Layout = require('./Layout')

class UnsubscribeForm extends React.Component{
    render(){
        return(
            <Layout>
                <nav className="navbar navbar-expand-md">
                    <a className="navbar-brand" href="#" style={{ textDecoration: 'none' }}>
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
                <div className="container ">
                    <form action="/confirmation?_method=DELETE" method="POST">
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
                                    value="Unsubscribe" ></input>
                            </div>
                        </div>
                    </form>
                </div>
            </Layout>
        )
    }
}

module.exports = UnsubscribeForm