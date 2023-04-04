const React = require('react')
const Layout = require('../views/Layout')

class Unsubscribed extends React.Component{
    render(){
        const email = this.props.email
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
                <div className="unsubscribed">
                    <div>
                        <h2>We are Sorry to see you go.</h2>
                        <strong>Unsubscribed successfully:</strong>
                        <p>{email}</p>
                    </div>
                    <div></div>
                </div>
            </Layout>
        )
    }
}

module.exports = Unsubscribed