const React = require('react')

class Layout extends React.Component {
    render(){
        return(
            <>
                <html lang="en">
                    <head>
                        <meta charSet="UTF-8"/>
                        <title>Psych•Bite</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
                        <link rel="stylesheet" href="/css/style.css" />
                    </head>
                </html>
                <body>
                    {this.props.children}
                    {/* <!-- Scripts --> */}
                    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper-base.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
                </body>
            </>
        )
    }
}

module.exports = Layout