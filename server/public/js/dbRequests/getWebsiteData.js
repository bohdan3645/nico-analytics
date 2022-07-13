const getWebsiteData = async (id) => {
    const url = "http://localhost:4000/visits";
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
    });
    const responseJson = await response.json();
    return responseJson.rows;
};

export default getWebsiteData;
