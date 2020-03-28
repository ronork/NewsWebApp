import React from 'react';
import PageHeader from '../PageHeader/pageheader';
import BackButton from '../BackButton/backButton'
import '../../Globals/css/index.css';
export default function page4XX(props) {
    return (<div className="wrapper">
        <BackButton backTo="/" />
        <PageHeader />
        <p className="pd20">{props.isError ? "Some Error Occured.Try refreshing the webpage." : "Sorry, but the page you were trying to view does not exist :("}</p>
    </div>)
}