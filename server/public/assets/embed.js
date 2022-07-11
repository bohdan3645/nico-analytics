const SERVER_HOST = 'http://localhost:4000/';

//client data
let ip;
const host = window.location.host;

const getClientIp = async() => {
    const endpoint = 'https://api.ipify.org?format=json';
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    ip = responseJson.ip;
};

const postClient = async() => {
    const endpoint = SERVER_HOST + 'visit';
    const options = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ 
            ip,
            host
        })
    }
    const response = await fetch(endpoint, options);
    const responseJson = await response.json();
    console.log(responseJson.message);
};

getClientIp().then(() => {
    postClient();
});

