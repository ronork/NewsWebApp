import React from 'react';
import PageHeader from '../PageHeader/pageheader';
import HomeButton from '../HomeButton/homeButton'
import '../../Globals/css/index.css';
export default function page4XX(props) {
    return (<div className="wrapper">
        <HomeButton />
        <PageHeader />
        <p className="pd20">{props.isError ? "Some Error Occured.Try refreshing the webpage." : "Sorry, but the page you were trying to view does not exist :("}</p>
    </div>)
}