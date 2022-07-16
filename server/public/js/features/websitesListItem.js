import createEl from "../helpers/createEl.js";

const createWebsitesListItem = (hostname, id, delFunc) => {
    const listItem = createEl({ element: "li", classes: ["website__item"] });

    const websiteIcon = createEl({
        element: "i",
        classes: ["fa-solid", "fa-earth-europe"],
    });

    const hostnameContainer = createEl({
        element: "span",
        text: hostname,
    });

    const link = createEl({
        element: "a",
        classes: ["website--link"],
        attributes: [
            {
                name: "href",
                value: `./website.html?id=${id}&hostname=${hostname}`,
            },
        ],
    });

    const delIcon = createEl({
        element: "i",
        classes: ["fa-solid", "fa-xmark"],
    });

    const delbutton = createEl({
        element: "button",
        classes: ["button--round", "dell--button"],
        attributes: [{ name: "type", value: "button" }],
        eListener: {
            trigger: "click",
            callback: () => delFunc(listItem, id),
        },
    });

    link.append(websiteIcon, hostnameContainer);
    delbutton.appendChild(delIcon);
    listItem.appendChild(link);
    listItem.appendChild(delbutton);

    return listItem;
};

const mountWebsitesListItem = (hostname, id, node, delFunc) => {
    const listItem = createWebsitesListItem(hostname, id, delFunc);
    node.appendChild(listItem);
};

export default mountWebsitesListItem;
