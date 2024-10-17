document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".container");
  const form = document.querySelector("form");
  const fileInp = document.querySelector("input");
  const infoText = document.querySelector("p");
  const closeBtn = document.querySelector(".close");
  const copyBtn = document.querySelector(".copy");

  function fetchRequest(file, formData) {
    infoText.innerText = "Scanning QR code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        result = result[0].symbol[0].data;
        infoText.innerText = result
          ? `Upload QR Code`
          : "Could not upload QR Code";

        if (!result) return;

        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
      })
      .catch(() => {
        infoText.innerText = "Could not scan QR Code";
      });
  }

  fileInp.addEventListener("change", async e => {
    let file = e.target.files[0];
    if (!file) return;

    let formData = new FormData();
    formData.append("file", file);
    fetchRequest(file, formData);
  });

  copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
    alert("Copy QR Code");
  });

  form.addEventListener("click", () => fileInp.click());

  closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));
});
