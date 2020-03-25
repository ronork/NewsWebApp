
const express = require('express');
const app = express();
const path = require("path");
const rootPath = path.join(__dirname, '../');
const compression = require('compression');


const cors = require("cors");
app.use(cors());
app.use(compression());




if (process.argv[2] == 'dev') {
    console.log(rootPath + 'dev-chunks')
    app.use(express.static(rootPath + 'dev-chunks'))
}
app.use(express.static(rootPath + 'chunks'))

app.listen(8000, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Server started on port:8000");
    }
});


app.get('/', function (req, res) {
    res.sendFile(rootPath + 'public/index.html');
})

