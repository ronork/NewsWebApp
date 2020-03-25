const language = require('../constants').language;

function getSourceList(newsapi) {
    return new Promise(function (resolve) {
        newsapi.v2.sources({
            language: language,
        }).then(response => {
            resolve(response);
        }, error => {
            console.log(error);//logs errors on server for future debugging
            resolve({
                status: "error"
            })
        });
    })
}
module.exports = getSourceList;