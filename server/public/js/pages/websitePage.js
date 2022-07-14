import getWebsiteData from "../dbRequests/getWebsiteData.js";
import fetchWithLoadingIndication from "../helpers/loadingSpinner.js";
import modal from "../helpers/modal.js";

const optionsForm = document.querySelector("#options-form");
const optionsModal = document.querySelector("#options-modal");
const openOptionsbtn = document.querySelector("#open-options");
const closeOptionsbtn = document.querySelector("#close-options");
const tableOptions = document.querySelector("#table-options");
const tableContainer = document.querySelector("#table-container");

const params = new URLSearchParams(document.location.search);
const websiteId = params.get("id");

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
    for (const key in data[0]) {
        const tableHead = document.createElement("th");
        tableHead.innerHTML = key;
        tableHeadRow.appendChild(tableHead);
    }
    table.appendChild(tableHeadRow);

    //fill table with data
    data.forEach((row) => {
        const tableRow = document.createElement("tr");
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
    fetchedWebsiteData = result; // <<< save data in global var for later use
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
