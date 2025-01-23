// Accordion
document.querySelectorAll(".accordion-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".accordion-button").forEach((btn) => {
        if (btn !== button) {
          btn.classList.remove("active");
          const otherPanel = btn.nextElementSibling;
          if (otherPanel) {
            otherPanel.classList.add("hidden");
            otherPanel.classList.remove("block");
          }
        }
      });
  
      button.classList.toggle("active");
      const panel = button.nextElementSibling;
      if (panel) {
        panel.classList.toggle("hidden");
        panel.classList.toggle("block");
      }
    });
  });
  