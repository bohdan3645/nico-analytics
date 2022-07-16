const createEl = (args) => {
    const el = document.createElement(args.element);

    if (args.classes) {
        el.classList.add(...args.classes);
    }

    if (args.text) {
        el.innerText = args.text;
    }

    if (args.attributes) {
        args.attributes.forEach((atr) => {
            el.setAttribute(atr.name, atr.value);
        });
    }

    if (args.eListener) {
        el.addEventListener(args.eListener.trigger, args.eListener.callback);
    }

    return el;
};

export default createEl;
