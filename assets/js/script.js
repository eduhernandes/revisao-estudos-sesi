document.addEventListener("DOMContentLoaded", () => {
  const currentYear = document.querySelector("[data-current-year]");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  document.querySelectorAll("[data-tabs]").forEach((tabGroup) => {
    const tabs = [...tabGroup.querySelectorAll('[role="tab"]')];
    const panels = [...tabGroup.querySelectorAll('[role="tabpanel"]')];

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((currentTab) => {
          currentTab.setAttribute("aria-selected", String(currentTab === tab));
        });

        panels.forEach((panel) => {
          panel.hidden = panel.id !== tab.getAttribute("aria-controls");
        });
      });
    });
  });

  document.querySelectorAll("[data-quiz]").forEach((quiz) => {
    quiz.addEventListener("submit", (event) => {
      event.preventDefault();
      const result = quiz.querySelector(".quiz-result");
      const selected = quiz.querySelector('input[type="radio"]:checked');

      if (!selected) {
        result.textContent = "Selecione uma alternativa antes de verificar.";
        result.className = "quiz-result form-message form-message--error";
        return;
      }

      const isCorrect = selected.value === quiz.dataset.answer;
      result.textContent = isCorrect
        ? "Resposta correta!"
        : "Ainda não. Revise o conteúdo e tente novamente.";
      result.className = isCorrect
        ? "quiz-result form-message form-message--success"
        : "quiz-result form-message form-message--error";
    });
  });

  document.querySelectorAll(".checklist").forEach((checklist) => {
    const items = [...checklist.querySelectorAll('input[type="checkbox"]')];
    const progressBlock = checklist.parentElement.previousElementSibling;
    const progressBar = progressBlock?.querySelector('[role="progressbar"]');
    const progressValue = progressBlock?.querySelector(".progress__value");
    const progressLabel = progressBlock?.querySelector("[data-progress-label]");

    const updateProgress = () => {
      const completed = items.filter((item) => item.checked).length;
      const percentage = items.length ? (completed / items.length) * 100 : 0;

      progressValue?.style.setProperty("--progress", `${percentage}%`);
      progressBar?.setAttribute("aria-valuenow", String(completed));
      if (progressLabel) {
        progressLabel.textContent = `${completed} de ${items.length}`;
      }
    };

    items.forEach((item) => item.addEventListener("change", updateProgress));
    updateProgress();
  });
});
