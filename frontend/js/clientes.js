import { obtainClients, deleteClientById, getClientById } from "./../apiConnection/consumeClientesApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  const clients = await obtainClients();
  setupPagination(clients, ".clients-table", 10);
});

function setupPagination(data, tableSelector, rowsPerPage) {
  const container = document.querySelector(tableSelector);
  const paginationContainer = document.createElement("div");
  paginationContainer.className = "pagination mt-3 d-flex justify-content-center gap-2";

  let currentPage = 1;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const renderPage = (page) => {
    container.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    data.slice(start, end).forEach(cliente => {
      const { ClienteID, Compania, Contacto, Ciudad, Pais, Telefono } = cliente;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${ClienteID}</td>
        <td>${Compania}</td>
        <td>${Contacto}</td>
        <td>${Ciudad}</td>
        <td>${Pais}</td>
        <td>${Telefono}</td>
        <td><button class="btn color3 detail-client-btn" data-id="${ClienteID}">Detalles</button></td>
        <td><button class="btn color2 delete-client-btn" data-id="${ClienteID}">Borrar</button></td>
      `;

      container.appendChild(row);
    });

    addClientDetailListeners();
    addClientDeleteListeners();
  };

  const updatePagination = () => {
    paginationContainer.innerHTML = "";

    const maxVisibleButtons = 3;
    let startPage = Math.max(currentPage - Math.floor(maxVisibleButtons / 2), 1);
    let endPage = startPage + maxVisibleButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisibleButtons + 1, 1);
    }

    if (currentPage > 1) {
      const firstBtn = document.createElement("button");
      firstBtn.textContent = "«1";
      firstBtn.className = "btn btn-sm btn-outline-light mx-1";
      firstBtn.addEventListener("click", () => {
        currentPage = 1;
        renderPage(currentPage);
        updatePagination();
      });
      paginationContainer.appendChild(firstBtn);
    }

    if (currentPage > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "«";
      prevBtn.className = "btn btn-sm btn-outline-light mx-1";
      prevBtn.addEventListener("click", () => {
        currentPage--;
        renderPage(currentPage);
        updatePagination();
      });
      paginationContainer.appendChild(prevBtn);
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i === currentPage) {
        const input = document.createElement("input");
        input.type = "number";
        input.value = i;
        input.min = 1;
        input.max = totalPages;
        input.className = "form-control d-inline-block text-center";
        input.style.width = "60px";

        input.addEventListener("change", () => {
          let val = parseInt(input.value);
          if (!isNaN(val) && val >= 1 && val <= totalPages) {
            currentPage = val;
            renderPage(currentPage);
            updatePagination();
          }
        });

        paginationContainer.appendChild(input);
      } else {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = "btn btn-sm btn-outline-light mx-1";
        btn.addEventListener("click", () => {
          currentPage = i;
          renderPage(currentPage);
          updatePagination();
        });
        paginationContainer.appendChild(btn);
      }
    }

    if (currentPage < totalPages) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "»";
      nextBtn.className = "btn btn-sm btn-outline-light mx-1";
      nextBtn.addEventListener("click", () => {
        currentPage++;
        renderPage(currentPage);
        updatePagination();
      });
      paginationContainer.appendChild(nextBtn);
    }

    if (currentPage < totalPages) {
      const lastBtn = document.createElement("button");
      lastBtn.textContent = `${totalPages}»`;
      lastBtn.className = "btn btn-sm btn-outline-light mx-1";
      lastBtn.addEventListener("click", () => {
        currentPage = totalPages;
        renderPage(currentPage);
        updatePagination();
      });
      paginationContainer.appendChild(lastBtn);
    }
  };

  container.closest("table").insertAdjacentElement("afterend", paginationContainer);
  renderPage(currentPage);
  updatePagination();
}

function addClientDetailListeners() {
  const buttons = document.querySelectorAll(".detail-client-btn");
  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      const data = await getClientById(id);
      if (data && data.length > 0) {
        const client = data[0];
        const detailHtml = `
          <div class="modal fade" id="clientDetailModal" tabindex="-1" aria-labelledby="clientDetailLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header color1">
                  <h5 class="modal-title headerr" id="clientDetailLabel">Detalles del Cliente</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p><strong>ID:</strong> ${client.ClienteID}</p>
                  <p><strong>Compañía:</strong> ${client.Compania}</p>
                  <p><strong>Contacto:</strong> ${client.Contacto}</p>
                  <p><strong>Ciudad:</strong> ${client.Ciudad}</p>
                  <p><strong>País:</strong> ${client.Pais}</p>
                  <p><strong>Teléfono:</strong> ${client.Telefono}</p>
                </div>
              </div>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML("beforeend", detailHtml);
        const modal = new bootstrap.Modal(document.getElementById('clientDetailModal'));
        modal.show();

        document.getElementById('clientDetailModal').addEventListener('hidden.bs.modal', () => {
          document.getElementById('clientDetailModal').remove();
        });
      }
    });
  });
}

function addClientDeleteListeners() {
  const buttons = document.querySelectorAll(".delete-client-btn");
  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      const confirmed = confirm("¿Estás seguro de que deseas eliminar este cliente?");
      if (confirmed) {
        await deleteClientById(id);
        location.reload(); 
      }
    });
  });
}
