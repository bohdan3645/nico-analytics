import Spinner from "../helpers/loadingSpinner.js";

const fetchWithLoadingIndication = async (node, fetchFunc, args) => {
    const spinner = new Spinner();
    spinner.mount(node);

    await fetchFunc.apply(this, args);

    spinner.unmount();
};

export default fetchWithLoadingIndication;
