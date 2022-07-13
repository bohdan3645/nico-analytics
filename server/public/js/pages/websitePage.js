import getWebsiteData from "../dbRequests/getWebsiteData.js";
import fetchWithLoadingIndication from "../helpers/loadingSpinner.js";

const table = document.querySelector("#table");
const params = new URLSearchParams(document.location.search);
const websiteId = params.get("id");

const fetchTable = async () => {
    const result = await getWebsiteData(websiteId);

    if (!result[0]) {
        const text = document.createElement("h2");
        text.innerHTML = "No data";
        text.style.textAlign = "center";
        table.appendChild(text);
        return;
    }
    const tableHeadRow = document.createElement("tr");
    for (const key in result[0]) {
        const tableHead = document.createElement("th");
        tableHead.innerHTML = key;
        tableHeadRow.appendChild(tableHead);
    }
    table.appendChild(tableHeadRow);
    result.forEach((row) => {
        console.log(row);
        const tableRow = document.createElement("tr");
        for (const key_1 in row) {
            const tableData = document.createElement("td");
            tableData.innerHTML = row[key_1];
            tableRow.appendChild(tableData);
        }
        table.appendChild(tableRow);
    });
};

fetchWithLoadingIndication(table, fetchTable);
