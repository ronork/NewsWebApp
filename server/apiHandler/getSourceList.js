const servConsts = require('../constants');

function cookData(response) {
    if (response.status == "ok" && response.sources) {
        let resSources = response.sources;
        let pageCount = Math.ceil(response.sources.length / servConsts.pageSize)
        let paginatedSources = {};
        for (let i = 1; i <= pageCount; i++) {
            if (resSources.length > servConsts.pageSize) {
                paginatedSources[`${i}`] = resSources.splice(0, servConsts.pageSize);
            }
            else {
                paginatedSources[`${i}`] = resSources.splice(0);
            }
        }
        return ({
            status: response.status,
            sources: paginatedSources
        })
    }
    else {
        return response;
    }

}

function getSourceList(newsapi) {
    return new Promise(function (resolve) {
        newsapi.v2.sources({
            language: servConsts.language,
        }).then(response => {
            resolve(cookData(response));
        }, error => {
            console.log(error);//logs errors on server for future debugging
            resolve({
                status: "error"
            })
        });
    })
}
module.exports = getSourceList;