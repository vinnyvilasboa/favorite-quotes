const React = require('react')
const Layout = require('../views/Layout')

class Unsubscribed extends React.Component{
    render(){
        const {email, found} = this.props
        console.log(email)
        console.log(found)
        return(
            <Layout>
                <nav className="navbar navbar-expand-md">
                    <a className="navbar-brand" href="https://psych-bite.herokuapp.com/" style={{ textDecoration: 'none' }}>
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
                {
                    !found ?
                    <div className="unsubscribed">
                        <div>
                            <h2>Email not found.</h2>
                            <strong>Unsubscribed successfully:</strong>
                            <p>{email}</p>
                        </div>
                        <div></div>
                    </div> :
                    <div className="unsubscribed">
                        <div>
                            <h2>We are sorry to see you go.</h2>
                            <strong>Unsubscribed successfully:</strong>
                            <p>{email}</p>
                        </div>
                        <div></div>
                    </div>
                }
            </Layout>
        )
    }
}

module.exports = Unsubscribed