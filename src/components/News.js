import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'


export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number

    }

    constructor(props) {
        super(props);
        console.log("News constructor is invoked");
        this.state = {
            articles: [],
            loading: false,
            page: 2
        }
        document.title = `${this.props.category} | News-o-phile`;
    }
    //async waits for the task to be get completed inisde the fucntion which is also refereed to as promise
    //main function which fetches the news at first
    async componentDidMount() {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18625f381b244e2bbfdb5cdf7a5277f1&pageSize=${this.props.pageSize}`
        //will show laoding spinner till news is fetched
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(60);
        //fetching the articles and the total results
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        // in the below line the data whixh is fetched from the actual website resides in parsedData and parsedData.articles means the articles[] in the freshly fetched current data.
        this.props.setProgress(100);
    }


    fetchMoreData = async ()  =>{
        this.setState({page: this.state.page + 1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18625f381b244e2bbfdb5cdf7a5277f1&page=${this.state.page}&pageSize=${this.props.pageSize}`
        //will show laoding spinner till news is fetched
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        //fetching the articles and the total results
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
   

    render() {
        // let {theme} = this.props;
        return (
            <>
                
                    <div className="typewritter">

                        <h2 className='text-center text typewritter-text' style={{ margin: '35px 0px', color: (this.props.theme === 'dark' ? 'white' : 'black') }} >News-o-phile - Brief {this.props.category}news for the nerds</h2>
                    </div>
                    {/* the below spinner will only show when the state of the loading will be true */}
                    {/* {this.state.loading && <Spinner/>} */}

                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length!==this.state.totalResults}
                        loader={<Spinner/>}
                    >
                    <div className="container">
                        <div className="row">

                            {/* the below map function will only run when laoding is false i.e. when the page is completely loaded */}
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-3">
                                    <Newsitem title={element.title === undefined ? "" : element.title.slice(0, 45)} description={element.description === null ? "" : element.description.slice(0, 90)} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author ? "Unknown" : element.author} timeStamp={element.publishedAt} source={element.source.name} theme={this.props.theme} />
                                </div>
                            })}
                        </div>
                        </div>
                    </InfiniteScroll>
                    
                   

                
            </>
        )
    }
}

// handleNext = async () => {
//     if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 20)) {

//         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18625f381b244e2bbfdb5cdf7a5277f1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
//         this.setState({ loading: true })
//         let data = await fetch(url);
//         let parsedData = await data.json();

//         this.setState({
//             page: this.state.page + 1,
//             articles: parsedData.articles,
//             loading: false
//         })
//     }
//     else {
//         console.log("This is is the last page")
//     }
// }

// handlePrevious = async () => {
//     if (this.state.page > 1) {


//         let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=18625f381b244e2bbfdb5cdf7a5277f1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
//         this.setState({ loading: true })
//         let data = await fetch(url);
//         let parsedData = await data.json();
//         this.setState({
//             page: this.state.page - 1,
//             articles: parsedData.articles,
//             loading: false
//         })
//     }
//     else {
//         console.log("This is the first page")
//     }
// }

//previous and next buttons

{/* <div className="container d-flex justify-content-between">

<button disabled={this.state.page === 1} type="button" className="btn btn-outline-danger" onClick={this.handlePrevious}>&larr; Previous</button>
<button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-outline-danger" onClick={this.handleNext}>Next &rarr;</button> */}