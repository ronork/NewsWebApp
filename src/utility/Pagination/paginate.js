import React from 'react';
import { Link } from 'react-router-dom';
import { PaginateLength } from '../../Globals/constants';
import './paginate.css'

export default class Paginate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state['startIndex'] = this.setStartIndex(true);
        this.constructPageNav = this.constructPageNav.bind(this);
        this.setStartIndex = this.setStartIndex.bind(this);
        this.moveIndex = this.moveIndex.bind(this);
        this.getUrl = this.getUrl.bind(this);
    }
    getUrl(i) {
        if (this.props.page == "newsFeed") {
            let params = new URLSearchParams(this.props.location.search);
            let src = params.get('source');
            return `/dailyfeed?source=${src}&page=${i}`
        }
        else {
            return location.pathname + "?page=" + i
        }
    }

    setStartIndex(initialise = false) {
        let strtInd = ''
        if (this.props.pageCount == this.props.selectedIndex)//the last Index is selected
        {
            strtInd = this.props.pageCount - PaginateLength;
        }
        else if (this.props.selectedIndex == PaginateLength) {//selected matches PaginatedLength
            strtInd = PaginateLength;
        }
        else {
            let selectedIn = Number(this.props.selectedIndex);
            strtInd = Math.floor((selectedIn / PaginateLength)) * PaginateLength + 1;
        }
        if (initialise)
            return strtInd;
        else
            this.setState({ startIndex: strtInd });
    }
    moveIndex(forward = false) {
        if (forward) {
            this.setState((prevState) => {
                return { startIndex: prevState.startIndex + 1 };
            })
        }
        else {
            this.setState((prevState) => {
                return { startIndex: prevState.startIndex - 1 };
            })
        }
    }
    constructPageNav() {
        let paginateView = [];
        let endIndex = this.state.startIndex + ((this.props.pageCount - this.state.startIndex) / PaginateLength >= 1 ? (PaginateLength - 1) : (this.props.pageCount - this.state.startIndex) % PaginateLength);
        if (this.state.startIndex > 1) {
            paginateView.push(<a key="-1" onClick={() => { this.moveIndex() }}>
                &laquo;
            </a>)
        }
        for (let i = this.state.startIndex; i <= endIndex; i++) {
            paginateView.push(<Link key={i} className={i == this.props.selectedIndex ? "active" : ""} to={this.getUrl(i)}>
                {i}
            </Link>)
        }
        if (endIndex < this.props.pageCount) {
            paginateView.push(<a key="-11" onClick={() => { this.moveIndex(true) }}>
                &raquo;
            </a>)
        }
        return (
            <div className="w100 tc pf bt0 bgclr08c2"><div className="pagination vam">
                {paginateView}
            </div></div>
        );
    }
    render() {
        return (
            <>
                {this.constructPageNav()}
            </>
        )
    }
}

