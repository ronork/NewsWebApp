import React from 'react';
import makeRequest from '@i-mart/fetcher';
import { Link } from 'react-router-dom';
import '../../Globals/css/index.css';
import Loader from '../../utility/Loader/loaderView';
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
    getPageIndex(srchParams) {
        if (srchParams.indexOf('page=') > -1) {
            try {
                return srchParams.split('=')[1];
            }
            catch (err) {
                console.log(err);
                return "1";
            }
        }
        else {
            return "1";
        }
    }
    componentDidMount() {
        let succ = (data) => {
            this.setState({ sourceList: data, index: this.getPageIndex(this.props.location.search), loading: false })
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
            this.setState({ index: this.getPageIndex(nextProps.location.search) });
            return false;
        }
        else {
            return false;
        }
    }
    pageHeader() {
        return (
            <div className="top tc">
                <div className="pageTitle dib">News on <span style={{ color: "#db5461" }}>Web</span></div>
            </div>
        )
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
                    {this.pageHeader()}
                    <Loader />
                </>
            )
        }
        else {
            return (<div className="wrapper">
                {this.pageHeader()}
                {this.state.sourceList ? this.constructList() : ''}
                <div className="w100 tc"><div class="pagination">
                    <a href="#">&laquo;</a>
                    <a href="#">1</a>
                    <a href="#" class="active">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                    <a href="#">5</a>
                    <a href="#">6</a>
                    <a href="#">&raquo;</a>
                </div></div>
            </div>)

        }
    }
    render() {
        return (<>
            {this.constructView()}
        </>)
    }
}