const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");

if (noBtn && yesBtn) {
  function moveButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  }

  noBtn.addEventListener("mouseover", moveButton);
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveButton();
  });

  yesBtn.addEventListener("click", () => {
    window.location.href = "success.html";
  });
}

const grid = document.getElementById("calendar-grid");

if (grid) {
  const monthLabel = document.getElementById("month-label");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");
  const selectedDateText = document.getElementById("selected-date");
  const confirmBtn = document.getElementById("confirm-btn");

  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  const today = new Date();
  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  let current = new Date(minMonth);
  let selectedDate = null;

  function renderCalendar() {
    grid.innerHTML = "";
    const year = current.getFullYear();
    const month = current.getMonth();
    monthLabel.textContent = `${monthNames[month]} ${year}`;

    prevBtn.disabled = current.getTime() <= minMonth.getTime();
    nextBtn.disabled = current.getTime() >= maxMonth.getTime();

    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startOffset; i++) {
      grid.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("button");
      cell.textContent = day;
      cell.classList.add("day-cell");

      const thisDate = new Date(year, month, day);
      if (selectedDate && thisDate.toDateString() === selectedDate.toDateString()) {
        cell.classList.add("selected");
      }

      cell.addEventListener("click", () => {
        selectedDate = thisDate;
        selectedDateText.textContent = `Date choisie : ${thisDate.toLocaleDateString("fr-FR")}`;
        confirmBtn.disabled = false;
        renderCalendar();
      });

      grid.appendChild(cell);
    }
  }

  prevBtn.addEventListener("click", () => {
    if (current.getTime() > minMonth.getTime()) {
      current.setMonth(current.getMonth() - 1);
      renderCalendar();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (current.getTime() < maxMonth.getTime()) {
      current.setMonth(current.getMonth() + 1);
      renderCalendar();
    }
  });

  confirmBtn.addEventListener("click", () => {
    alert(`Rendez-vous confirmé ! On se voit le ${selectedDate.toLocaleDateString("fr-FR")} ;)`);
  });

  renderCalendar();
}