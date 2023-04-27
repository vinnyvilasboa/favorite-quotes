const React = require('react')
const Layout = require('./Layout')

class Edit extends React.Component{
    render(){
        const {quote} = this.props
        return(
            <Layout>
                <form action={`/quotes/${quote._id}?method=PUT`} method='POST'>
                    <div className="form-group d-flex flex-column align-items-center justify-content-center">
                        <div className="col-md-6 py-3">
                            <label htmlFor="quote" className="">Edit Quote</label>
                            <textarea
                                style={{height: "150px"}}
                                name="quote"
                                id="inputEmail"
                                className="form-control form-control-lg"
                                value={quote.quote}
                                />
                        </div>
                        <div className="col-md-6 py-3">
                            <label htmlFor="author" className="">Edit Author</label>
                            <input
                                type="text"
                                name="author"
                                id="inputEmail"
                                className="form-control form-control-lg"
                                value={quote.author}
                                />
                        </div>
                        <div className="col-md-3 d-flex align-items-center py-3">
                            <input
                                type="submit"
                                id="submitBtn"
                                className="btn btn-primary btn-block btn-lg"
                                value="Submit" ></input>
                        </div>
                    </div>
                </form>
            </Layout>
        )
    }
}

module.exports = Edit