import { obtainInvoices, deleteInvoiceById, getInvoiceById } from "./../apiConnection/consumeFacturasApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  const facturas = await obtainInvoices();
  setupPagination(facturas, ".invoices-table", 10);
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

    data.slice(start, end).forEach(factura => {
      const { FacturaID, ClienteID, EmpleadoID, FechaFactura, Transporte, PaisEnvio } = factura;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${FacturaID}</td>
        <td>${ClienteID}</td>
        <td>${EmpleadoID}</td>
        <td>${FechaFactura}</td>
        <td>${Transporte}</td>
        <td>${PaisEnvio}</td>
        <td><button class="btn color5 detail-invoice-btn" data-id="${FacturaID}">Detalles</button></td>
        <td><button class="btn color2 delete-invoice-btn" data-id="${FacturaID}">Borrar</button></td>
      `;
      container.appendChild(row);
    });

    addInvoiceDetailListeners();
    addInvoiceDeleteListeners();
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
      firstBtn.textContent = "1";
      firstBtn.className = "btn btn-sm btn-outline-light mx-1";
      firstBtn.addEventListener("click", () => {
        currentPage = 1;
        renderPage(currentPage);
        updatePagination();
      });
      paginationContainer.appendChild(firstBtn);

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

      const lastBtn = document.createElement("button");
      lastBtn.textContent = `${totalPages}`;
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

function addInvoiceDetailListeners() {
  const buttons = document.querySelectorAll(".detail-invoice-btn");
  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      const data = await getInvoiceById(id);
      if (data && data.length > 0) {
        const factura = data[0];
        const detailHtml = `
          <div class="modal fade" id="invoiceDetailModal" tabindex="-1" aria-labelledby="invoiceDetailLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header color1">
                  <h5 class="modal-title headerr" id="invoiceDetailLabel">Detalles de Factura</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p><strong>ID:</strong> ${factura.FacturaID}</p>
                  <p><strong>Cliente ID:</strong> ${factura.ClienteID}</p>
                  <p><strong>Empleado ID:</strong> ${factura.EmpleadoID}</p>
                  <p><strong>Fecha:</strong> ${factura.FechaFactura}</p>
                  <p><strong>Transporte:</strong> ${factura.Transporte}</p>
                  <p><strong>País de envío:</strong> ${factura.PaisEnvio}</p>
                </div>
              </div>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML("beforeend", detailHtml);
        const modal = new bootstrap.Modal(document.getElementById('invoiceDetailModal'));
        modal.show();

        document.getElementById('invoiceDetailModal').addEventListener('hidden.bs.modal', () => {
          document.getElementById('invoiceDetailModal').remove();
        });
      }
    });
  });
}

function addInvoiceDeleteListeners() {
  const buttons = document.querySelectorAll(".delete-invoice-btn");
  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      const confirmed = confirm("¿Estás seguro de que deseas eliminar esta factura?");
      if (confirmed) {
        await deleteInvoiceById(id);
        location.reload(); // O vuelve a obtener las facturas y repinta
      }
    });
  });
}
