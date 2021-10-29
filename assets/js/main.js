const serializeForm = (form) => {
  const obj = {};
  const formData = new FormData(form);
  for (let key of formData.keys()) {
    obj[key] = formData.get(key);
  }
  return obj;
};

document.addEventListener("DOMContentLoaded", () => {
  const connectButton = document.querySelector(".connect-button");
  const modal = document.querySelector("#contact-modal");
  const body = document.querySelector("body");
  const modalCloseBtn = document.querySelector(".modal-close-btn");
  const contactForm = document.querySelector("#contact-form");
  const alertWindow = document.querySelector("#alert-window");

  connectButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("modal-open");
    body.classList.add("disable-scroll");
  });

  modalCloseBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("modal-open");
    body.classList.remove("disable-scroll");
  });

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://ls-formulaire-backend.herokuapp.com/form",
      serializeForm(contactForm)
    );

    console.log(response.data);
    if (response.data.status === "success") {
      alertWindow.classList.remove("alert-danger");
      alertWindow.classList.add("alert-success");
    } else {
      alertWindow.classList.remove("alert-success");
      alertWindow.classList.add("alert-danger");
    }
    alertWindow.querySelector("#alert-content").textContent =
      response.data.message;
    alertWindow.style.display = "inherit";
    modalCloseBtn.click();
    setTimeout(() => {
      alertWindow.style.display = "none";
    }, 4000);
  });
});
