const SERVER_HOST = "http://localhost:4000/";

//client data
let ip;
const hostname = window.location.host;
const date = getCurrentDate();
const time = getCurrentTime();
const timeZoneOffset = currentTimeZoneOffsetInHours();
const primaryLanguage = navigator.language;
const languages = navigator.languages.join(", ");
const platform = navigator.userAgentData.platform;

function getCurrentDate() {
    const today = new Date();
    return (
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate()
    );
}

function getCurrentTime() {
    const today = new Date();
    return (
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    );
}

function currentTimeZoneOffsetInHours() {
    var today = new Date();
    return `${today.getTimezoneOffset() / 60} hours`;
}

const getClientIp = async () => {
    const endpoint = "https://api.ipify.org?format=json";
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    ip = responseJson.ip;
};

const postVisit = async () => {
    const endpoint = SERVER_HOST + "visit";
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ip,
            hostname,
            date,
            time,
            timeZoneOffset,
            primaryLanguage,
            languages,
            platform,
        }),
    };
    const response = await fetch(endpoint, options);
    const responseJson = await response.json();
    console.log(responseJson.message);
};

getClientIp().then(() => {
    postVisit();
});
