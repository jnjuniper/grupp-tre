// Accordion
document.querySelectorAll(".accordion-button").forEach((button) => {
    button.addEventListener("click", () => {
      // Close all other accordions
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
  
      // Toggle current accordion
      button.classList.toggle("active");
      const panel = button.nextElementSibling;
      if (panel) {
        panel.classList.toggle("hidden");
        panel.classList.toggle("block");
      }
    });
  });
  