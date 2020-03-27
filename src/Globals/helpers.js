let pageHelpers = {
    getPageIndex: (queryParams) => {
        let params = new URLSearchParams(queryParams);
        let page = params.get('page');
        return page ? page : 1;
    }
}
export default pageHelpers;