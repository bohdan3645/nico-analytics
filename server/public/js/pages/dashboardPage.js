import getWebsitesListRequest from "../dbRequests/getWebsitesListRequest.js";
import addWebsiteRequest from "../dbRequests/addWebsiteRequest.js";
import deleteWebsiteRequest from "../dbRequests/deleteWebsiteRequest.js";
import fetchWithLoadingIndication from "../features/fetchWithLoadingIndication.js";
import modal from "../helpers/modal.js";
import mountWebsitesListItem from "../features/websitesListItem.js";

const websitesContainer = document.querySelector("#websites");
const openFormBtn = document.querySelector("#open-form");
const closeFormBtn = document.querySelector("#close-form");
const formModal = document.querySelector("#form-modal");
const form = document.querySelector("#form");

const closeModal = modal(formModal, openFormBtn, closeFormBtn);

const deleteWebsiteFromDOM = async (listItem, id) => {
    const result = await deleteWebsiteRequest(id);
    listItem.remove();
    console.log(result);
};

const deleteWebsiteItem = (listItem, id) => {
    fetchWithLoadingIndication(listItem, deleteWebsiteFromDOM, [listItem, id]);
};

const mountWebsitesToDOM = async (container, delFunc) => {
    const websites = await getWebsitesListRequest();
    websites.forEach((website) => {
        mountWebsitesListItem(website.hostname, website.id, container, delFunc);
    });
};

fetchWithLoadingIndication(websitesContainer, mountWebsitesToDOM, [
    websitesContainer,
    deleteWebsiteItem,
]);

const AddNewWebsite = async (hostname, container, delFunc) => {
    const id = Date.now();
    const result = await addWebsiteRequest(hostname, id);
    closeModal();
    mountWebsitesListItem(hostname, id, container, delFunc);
    console.log(result);
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchWithLoadingIndication(e.target, AddNewWebsite, [
        e.target.hostname.value,
        websitesContainer,
        deleteWebsiteItem,
    ]);
    e.target.hostname.value = "";
});
