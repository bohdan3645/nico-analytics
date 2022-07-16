const addWebsiteRequest = async (hostname, id) => {
    const url = "http://localhost:4000/websites";
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostname: hostname, id: id }),
    });
    const responseJson = await response.json();
    return responseJson.message;
};

export default addWebsiteRequest;
