const React = require('react')
const Layout = require('./Layout')

class Unsubscribed extends React.Component{
    render(){
        const email = this.props.email
        return(
            <Layout>
                <h2>Unsubscribed</h2>
                <p>{email} Unsubscribed successfully.</p>
            </Layout>
        )
    }
}

module.exports = Unsubscribed