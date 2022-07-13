class Spinner {
    constructor() {
        this.id = null;
    }

    mount(node) {
        const container = document.createElement("div");
        container.classList.add("spinner__container");
        const id = Date.now() + Math.random();
        container.setAttribute("data-id", id);
        this.id = id;

        const spinner = document.createElement("div");
        spinner.classList.add("spinner");

        container.appendChild(spinner);
        node.appendChild(container);
    }

    unmount() {
        const spinner = document.querySelector(`[data-id="${this.id}"]`);
        if (spinner) {
            spinner.remove();
        }
    }
}

const fetchWithLoadingIndication = (node, fetchFunc) => {
    const spinner = new Spinner();
    spinner.mount(node);
    fetchFunc().then(() => {
        spinner.unmount();
    });
};

export default fetchWithLoadingIndication;
