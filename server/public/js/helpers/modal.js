const modal = (modalContainer, openBtn, closeBtn) => {
    const openForm = () => {
        modalContainer.style.display = "flex";
    };

    const closeForm = () => {
        modalContainer.style.display = "none";
    };

    openBtn.addEventListener("click", openForm);
    closeBtn.addEventListener("click", closeForm);

    return closeForm;
};

export default modal;
