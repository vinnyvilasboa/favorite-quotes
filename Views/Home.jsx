const React = require('react')


class Home extends React.Component {
    render(){
        return(
            <div className="container">
                <form>
                    <div className="form-group row">
                        <div className="col-md-6 offset-md-3">

                            <label for="inputEmail" className="sr-only">Enter Email</label>
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
        )
    }
}

module.exports = Home