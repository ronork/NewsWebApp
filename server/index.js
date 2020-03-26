
const express = require('express');
const app = express();
const path = require("path");
const rootPath = path.join(__dirname, '../');
const compression = require('compression');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('5392ef443eea40368acb3445592ad2f7');

const cors = require("cors");
app.use(cors());
app.use(compression());

if (process.argv[2] == 'dev') {//serving chunks from different dir in development
    app.use(express.static(rootPath + 'dev-chunks'))
}


app.use(express.static(rootPath + 'chunks'))

app.get('/ajaxrequest/getSourceList', function (req, res) {
    require('./apiHandler/getSourceList')(newsapi).then(data => {
        res.status(200).send(data);
    })
})

app.get('/ajaxrequest/getNewsItems', function (req, res) {
    let page = req.query.page,
        source = req.query.source;
    if (page && source) {
        require('./apiHandler/getNewsItems')(newsapi, page, source).then(data => {
            res.status(200).send(data);
        })
    }
    else {
        res.status(200).send({
            status: "error"
        });
    }
})

app.get('*', function (req, res) {
    res.sendFile(rootPath + 'public/index.html');
})



app.listen(8000, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Server started on port:8000");
    }
});