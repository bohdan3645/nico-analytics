import getWebsitesList from "../dbRequests/getWebsitesList.js";
import addWebsite from "../dbRequests/addWebsite.js";
import deleteWebsite from "../dbRequests/deleteWebsite.js";
import fetchWithLoadingIndication from "../helpers/loadingSpinner.js";
import modal from "../helpers/modal.js";

const websitesContainer = document.querySelector("#websites");
const openFormBtn = document.querySelector("#open-form");
const closeFormBtn = document.querySelector("#close-form");
const formModal = document.querySelector("#form-modal");
const form = document.querySelector("#form");

const closeModal = modal(formModal, openFormBtn, closeFormBtn);

const deleteWebsiteItem = (e, id) => {
    const websiteItem = e.target.parentElement;
    const deleteWeb = async () => {
        const result = await deleteWebsite(id);
        websiteItem.remove();
        console.log(result);
    };

    fetchWithLoadingIndication(websiteItem, deleteWeb);
};

const mountWebsiteItemIntoList = (hostname, id, node) => {
    const listItem = document.createElement("li");
    listItem.classList.add("website__item");

    const link = document.createElement("a");
    link.innerHTML = '<i class="fa-solid fa-earth-europe"></i>  ' + hostname;
    link.setAttribute("href", `./website.html?id=${id}&hostname=${hostname}`);

    const delbutton = document.createElement("button");
    delbutton.classList.add("button--round", "dell--button");
    delbutton.setAttribute("type", "button");
    delbutton.innerHTML = "X";
    delbutton.addEventListener("click", (e) => deleteWebsiteItem(e, id));

    listItem.appendChild(link);
    listItem.appendChild(delbutton);
    node.appendChild(listItem);
};

const fetchAndMountWebsites = async () => {
    const websites = await getWebsitesList();
    websites.forEach((website) => {
        mountWebsiteItemIntoList(
            website.hostname,
            website.id,
            websitesContainer
        );
    });
};

fetchWithLoadingIndication(websitesContainer, fetchAndMountWebsites);

const AddNewWebsite = async () => {
    const id = Date.now();
    const hostname = form.hostname.value;
    const result = await addWebsite(hostname, id);
    closeModal();
    mountWebsiteItemIntoList(hostname, id, websitesContainer);
    console.log(result);
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchWithLoadingIndication(form, AddNewWebsite);
});
