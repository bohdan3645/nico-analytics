class Spinner {
    constructor() {
        this.id = Date.now() + Math.random();
    }

    mount(node) {
        const container = document.createElement("div");
        container.classList.add("spinner__container");
        container.setAttribute("data-id", this.id);

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

export default Spinner;
