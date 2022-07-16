const getWebsitesListRequest = async () => {
    const url = "http://localhost:4000/websites";
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson.msg;
};

export default getWebsitesListRequest;
