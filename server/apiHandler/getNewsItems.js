const serverConsts = require('../constants');

function getNewsItems(newsapi, page, source) {
    return new Promise(function (resolve) {
        newsapi.v2.everything({
            sources: source,
            pageSize: serverConsts.pageSize,
            language: serverConsts.language,
            page: page
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
module.exports = getNewsItems;