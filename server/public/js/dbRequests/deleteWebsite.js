const deleteWebsite = async (id) => {
    const url = "http://localhost:4000/websites";
    const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
    });
    const responseJson = await response.json();
    return responseJson.message;
};

export default deleteWebsite;
