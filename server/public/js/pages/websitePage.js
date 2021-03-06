import getWebsiteData from "../dbRequests/getWebsiteData.js";
import fetchWithLoadingIndication from "../helpers/loadingSpinner.js";
import modal from "../helpers/modal.js";

const breadcrumbContainer = document.querySelector("#breadcrumb");
const websiteHostnameHeading = document.querySelector("#website-hostname");
const optionsForm = document.querySelector("#options-form");
const optionsModal = document.querySelector("#options-modal");
const openOptionsbtn = document.querySelector("#open-options");
const closeOptionsbtn = document.querySelector("#close-options");
const tableOptions = document.querySelector("#table-options");
const tableContainer = document.querySelector("#table-container");

const params = new URLSearchParams(document.location.search);
const websiteId = params.get("id");
const websiteHostname = params.get("hostname");

//set page heading to current website hostname
websiteHostnameHeading.innerHTML = websiteHostname;

//create breadcrumb
const createBreadcrumb = (node) => {
    const currentWebsite = document.createElement("span");
    currentWebsite.innerHTML = websiteHostname;
    const websitesLink = document.createElement("a");
    websitesLink.classList.add("highlited--link");
    websitesLink.setAttribute("href", "http://localhost:4000/");
    websitesLink.innerHTML = "websites";

    node.append(websitesLink, " > ", currentWebsite);
};

(() => {
    createBreadcrumb(breadcrumbContainer);
})();

let fetchedWebsiteData;

const mountTable = (data) => {
    //if no data
    if (!data[0]) {
        const text = document.createElement("h2");
        text.innerHTML = "No data";
        text.style.textAlign = "center";
        tableContainer.appendChild(text);
        return;
    }

    //create table
    const table = document.createElement("table");
    table.setAttribute("id", "table");

    //create table head
    const tableHeadRow = document.createElement("tr");

    //add row number column
    const tableRowNoCol = document.createElement("th");
    tableRowNoCol.innerHTML = "no.";
    tableHeadRow.appendChild(tableRowNoCol);

    for (const key in data[0]) {
        const tableHead = document.createElement("th");
        tableHead.innerHTML = key;
        tableHeadRow.appendChild(tableHead);
    }
    table.appendChild(tableHeadRow);

    //fill table with data
    data.forEach((row, i) => {
        const tableRow = document.createElement("tr");

        //add row nomber
        const tableRowNo = document.createElement("td");
        tableRowNo.innerHTML = i + 1;
        tableRow.appendChild(tableRowNo);

        for (const key_1 in row) {
            const tableData = document.createElement("td");
            tableData.innerHTML = row[key_1];
            tableRow.appendChild(tableData);
        }
        table.appendChild(tableRow);
    });

    tableContainer.appendChild(table);
};

const mountOptions = (data) => {
    //create options
    for (const key in data[0]) {
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", key);
        checkbox.setAttribute("id", key);
        checkbox.setAttribute("checked", true);

        const label = document.createElement("label");
        label.setAttribute("for", key);
        label.innerHTML = key;

        const span = document.createElement("label");
        span.setAttribute("for", key);
        span.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        span.classList.add("checkbox");

        const container = document.createElement("div");

        container.append(checkbox, span, label);
        tableOptions.appendChild(container);
    }
};

const fetchAndMountTable = async () => {
    const result = await getWebsiteData(websiteId);
    fetchedWebsiteData = result; // <<< save data to global var for later use
    mountTable(result);
    mountOptions(result);
};

fetchWithLoadingIndication(tableContainer, fetchAndMountTable);
const closeModal = modal(optionsModal, openOptionsbtn, closeOptionsbtn);

const getCheckedOptions = (form) => {
    const checkedOptions = [];
    const formdata = new FormData(form);
    for (const pair of formdata.entries()) {
        checkedOptions.push(pair[0]);
    }
    return checkedOptions;
};

const filterColumns = (data, options) => {
    const filteredColumns = data.map((row) => {
        const filteredRow = {};
        options.forEach((option) => {
            for (const key in row) {
                if (key === option) {
                    filteredRow[key] = row[key];
                }
            }
        });
        return filteredRow;
    });

    return filteredColumns;
};

const unmountTable = () => {
    const table = document.querySelector("#table");
    table.remove();
};

const filterTable = (e) => {
    e.preventDefault();
    const checkedOptions = getCheckedOptions(optionsForm);
    const filteredData = filterColumns(fetchedWebsiteData, checkedOptions);
    unmountTable();
    mountTable(filteredData);
    closeModal();
};

optionsForm.addEventListener("submit", filterTable);
