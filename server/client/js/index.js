const data = document.querySelector('#data');
const form = document.querySelector('#form');
let delButtons;

const getTest = async() => {
    const url = 'http://localhost:4000/websites';
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson.msg
};


const deleteTest = async(id) => {
    const url = 'http://localhost:4000/websites';
    const response = await fetch(url, {
        method:'DELETE',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ id: id })
    });
    const responseJson = await response.json();
    return responseJson.message;
};


getTest().then(result => {
    result.forEach(row => {
        const text = row.url;
        const site = document.createElement('p');
        site.innerHTML = text;
        const delbutton = document.createElement('span');
        delbutton.innerHTML = ' X';
        delbutton.setAttribute('data-id', row.id);
        site.appendChild(delbutton);
        data.appendChild(site);
    });
    delButtons = document.querySelectorAll('span');
    delButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            deleteTest(e.target.dataset.id).then(result => {
                console.log(result)
            });
        })
    })
});

