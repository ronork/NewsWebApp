import React from 'react';
import makeRequest from '@i-mart/fetcher';
import { Link } from 'react-router-dom';
import '../../Globals/css/index.css';
import Loader from '../../utility/Loader/loaderView';
import Paginate from '../../utility/Pagination/paginate';
import PageHeader from '../../utility/PageHeader/pageheader';
import helpers from '../../Globals/helpers';
export default class NewsSources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceList: '',
            index: '',
            loading: true
        };
        this.constructList = this.constructList.bind(this);
    }
    componentDidMount() {
        console.log(this.props)
        let succ = (data) => {
            this.setState({ sourceList: data, index: helpers.getPageIndex(this.props.location.search), loading: false })
        }
        let err = () => {
            this.setState({ sourceList: "error", loading: false })
        }
        makeRequest({ url: '/ajaxrequest/getSourceList' }).then(data => {
            if (data.response.status == "ok") {
                succ(data.response.sources)
            }
            else {
                err();
            }
        }, error => {
            err();
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        if ((this.state.sourceList != nextState.sourceList)) {
            return true;
        }
        else if ((this.state.index != nextState.index)) {
            return true;
        }
        else if (this.props.location.search != nextProps.location.search) {
            window.scrollTo(0, 0)
            this.setState({ index: helpers.getPageIndex(nextProps.location.search) });
            return false;
        }
        else {
            return false;
        }
    }
    constructList() {
        let list = [];
        this.state.sourceList[this.state.index].forEach((element, index) => {
            list.push(this.constructCard(element, index));
        });
        return (
            <div className="content">
                {list}
            </div>
        );
    }
    constructCard(data, i) {
        let url = "/dailyfeed?source=" + data.id + "&page=1";
        return (
            <Link key={data.id} to={url}>
                <div className={i == 0 ? "card first" : "card"}>
                    <h2>{data.name}</h2>
                    <p>
                        {data.description}
                    </p>
                </div>
            </Link>
        );
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
                    {this.state.sourceList ? this.constructList() : ''}
                </div>
                <Paginate pageCount={9} selectedIndex={this.state.index} />
            </div>)

        }
    }
    render() {
        return (<>
            {this.constructView()}
        </>)
    }
}