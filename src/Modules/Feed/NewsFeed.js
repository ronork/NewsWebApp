import React from 'react';
import makeRequest from '@i-mart/fetcher';
import { Link } from 'react-router-dom';
import '../../Globals/css/index.css';
import Loader from '../../utility/Loader/loaderView';
import Paginate from '../../utility/Pagination/paginate';
import PageHeader from '../../utility/PageHeader/pageheader';
import helpers from '../../Globals/helpers';
import { PageSize } from '../../Globals/constants';
import LazyLoad from 'react-lazyload';
import HomeButton from '../../utility/HomeButton/homeButton';
import ErrorPage from '../../utility/Error/errorPage';

export default class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedData: '',
            loading: true,
            index: '',
            listLoading: false
        }
        this.pageCount = '';
        this.updateNewsFeed = this.updateNewsFeed.bind(this);
    }
    updateNewsFeed() {
        let succ = (data) => {
            this.pageCount = data.totalResults;
            this.setState({ feedData: data.articles, loading: false, listLoading: false, index: helpers.getPageIndex(this.props.location.search) })
        }
        let err = () => {
            this.setState({ feedData: "error", loading: false, listLoading: false })
        }
        makeRequest({ url: '/ajaxrequest/getNewsItems' + this.props.location.search }).then(data => {
            if (data.response.status == "ok" && data.response.articles.length > 0) {
                succ(data.response)
            }
            else {
                err();
            }
        }, error => {
            console.log(error);
            err();
        })
    }
    constructList() {
        let list = [];
        this.state.feedData.forEach((element, index) => {
            list.push(this.constructCard(element, index));
        });
        return (
            <div className="content">
                {list}
            </div>
        );
    }
    formatDate(dateString) {
        let publishedDt = new Date(dateString);
        return `${publishedDt.toDateString()}`

    }
    constructCard(data, i) {
        return (
            <a key={"card-" + this.state.index + "-" + i} href={data.url} target="_blank">
                <div className={i == 0 ? "card first" : "card"}>
                    <h2>{data.title}</h2>
                    {data.author ? <p>{data.author}</p> : ''}
                    {data.publishedAt ? <p className="date">{this.formatDate(data.publishedAt)}</p> : ''}
                    {data.urlToImage && data.urlToImage !== "null" ?
                        <LazyLoad>
                            <p className="tc">
                                <img className="feedImg" loading="lazy" src={data.urlToImage} alt="Expected Image Here"></img>
                            </p>
                        </LazyLoad > : ''}
                    <p>
                        {data.description}
                    </p>
                </div>
            </a>
        );
    }
    componentDidMount() {
        this.updateNewsFeed();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.search !== prevProps.location.search) {
            window.scrollTo(0, 0);
            this.setState({ listLoading: true })
            this.updateNewsFeed();
        }
    }
    constructView() {
        if (this.state.loading) {
            return (
                <>
                    <PageHeader />
                    <Loader />
                </>
            )
        }
        else if (this.state.feedData == "error") {
            return (
                <ErrorPage isError={true} />
            )
        }
        else {
            let totalPageCount = Math.ceil(this.pageCount / PageSize);
            totalPageCount = totalPageCount > 10 ? 10 : totalPageCount
            return (<div>
                <div className="wrapper">
                    <PageHeader />
                    {this.state.listLoading ? <Loader /> :
                        this.constructList()}
                </div>
                <Paginate location={this.props.location} page="newsFeed" pageCount={totalPageCount} selectedIndex={this.state.index} />
            </div>)

        }
    }
    render() {
        return (<>
            <HomeButton />
            {this.constructView()}
        </>)
    }
}