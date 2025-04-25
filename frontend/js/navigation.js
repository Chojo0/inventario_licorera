document.addEventListener("DOMContentLoaded", () => {
    const sections = {
      "btn-categories": "view-categories",
      "btn-products": "view-products",
      "btn-clients": "view-clients",
      "btn-employees": "view-employees",
      "btn-invoices": "view-invoices"
    };
  
    Object.keys(sections).forEach(btnId => {
      const button = document.getElementById(btnId);
      button.addEventListener("click", (e) => {
        e.preventDefault();
        Object.values(sections).forEach(sectionId => {
          document.getElementById(sectionId).style.display = "none";
        });
        document.getElementById(sections[btnId]).style.display = "block";
      });
    });
  });
  