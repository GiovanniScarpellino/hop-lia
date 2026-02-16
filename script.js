const yearEl = document.getElementById("year");
const form = document.getElementById("lead-form");
const feedback = document.getElementById("form-feedback");
const revealEls = document.querySelectorAll(".reveal");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealEls.forEach((el) => observer.observe(el));

if (form && feedback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const hasEmpty = [...data.values()].some((value) => String(value).trim() === "");

    feedback.className = "";

    if (hasEmpty) {
      feedback.textContent = "Merci de renseigner tous les champs.";
      feedback.classList.add("error");
      return;
    }

    feedback.textContent =
      "Demande bien reçue. Nous revenons vers vous rapidement pour cadrer un premier échange.";
    feedback.classList.add("success");

    form.reset();
  });
}
