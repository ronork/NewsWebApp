import React from 'react';
import makeRequest from '@i-mart/fetcher';
import { Link } from 'react-router-dom';
import '../../Globals/css/index.css';
import Loader from '../../utility/Loader/loaderView';
import Paginate from '../../utility/Pagination/paginate';
import PageHeader from '../../utility/PageHeader/pageheader';
import helpers from '../../Globals/helpers';
import { PageSize } from '../../Globals/constants';

export default class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedData: '',
            loading: true,
            index: ''
        }
        this.pageCount = '';
        this.updateNewsFeed = this.updateNewsFeed.bind(this);
    }
    updateNewsFeed() {
        let succ = (data) => {
            this.pageCount = data.totalResults;
            this.setState({ feedData: data.articles, loading: false, index: helpers.getPageIndex(this.props.location.search) })
        }
        let err = () => {
            this.setState({ feedData: "error", loading: false })
        }
        makeRequest({ url: '/ajaxrequest/getNewsItems' + this.props.location.search }).then(data => {
            if (data.response.status == "ok") {
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
    constructCard(data, i) {
        return (
            <a key={"card-" + this.state.index + "-" + i} href={data.url} target="_blank">
                <div className={i == 0 ? "card first" : "card"}>
                    <h2>{data.title}</h2>
                    {data.urlToImage ? <p className="tc"><img className="feedImg" src={data.urlToImage} alt=""></img></p> : ''}
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
        else {
            return (<div>
                <div className="wrapper">
                    <PageHeader />
                    {this.constructList()}
                </div>
                <Paginate location={this.props.location} page="newsFeed" pageCount={Math.ceil(this.pageCount / PageSize)} selectedIndex={this.state.index} />
            </div>)

        }
    }
    render() {
        return (<>
            {this.constructView()}
        </>)
    }
}