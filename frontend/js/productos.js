import {
  obtainProducts,
  getProductById,
  deleteProductById,
} from "./../apiConnection/consumeProductosApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  await getProducts();
  await fillCategoryOptions();
});

async function getProducts() {
  const products = await obtainProducts();
  const container = document.querySelector(".products-table");
  container.innerHTML = "";

  products.forEach((producto) => {
    const {
      ProductoID,
      ProductoNombre,
      CantidadPorUnidad,
      PrecioUnitario,
      UnidadesStock,
      CategoriaNombre,
    } = producto;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${ProductoID}</td>
      <td>${ProductoNombre}</td>
      <td>${CantidadPorUnidad}</td>
      <td>$${PrecioUnitario.toLocaleString()}</td>
      <td>${UnidadesStock}</td>
      <td>${CategoriaNombre}</td>
      <td><button class="btn color3 detail-product-btn" data-id="${ProductoID}">Detalles</button></td>
      <td><button class="btn color2 delete-product-btn" data-id="${ProductoID}">Borrar</button></td>
    `;
    container.appendChild(row);
  });

  addProductDetailListeners();
  addProductDeleteListeners();
}

function addProductDetailListeners() {
  const buttons = document.querySelectorAll(".detail-product-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;

      // Elimina modal anterior si existe
      const existingModal = document.getElementById("productDetailModal");
      if (existingModal) existingModal.remove();

      const data = await getProductById(id);
      if (data && data.length > 0) {
        const p = data[0];
        const detailHtml = `
          <div class="modal fade" id="productDetailModal" tabindex="-1" aria-labelledby="productDetailLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header color1">
                  <h5 class="modal-title headerr" id="productDetailLabel">Detalles del Producto</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p><strong>ID:</strong> ${p.ProductoID}</p>
                  <p><strong>Nombre:</strong> ${p.ProductoNombre}</p>
                  <p><strong>Cantidad por unidad:</strong> ${
                    p.CantidadPorUnidad
                  }</p>
                  <p><strong>Precio unitario:</strong> $${p.PrecioUnitario.toLocaleString()}</p>
                  <p><strong>Unidades en stock:</strong> ${p.UnidadesStock}</p>
                  <p><strong>Categoría:</strong> ${
                    p.CategoriaNombre || "Sin categoría"
                  }</p>
                </div>
              </div>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML("beforeend", detailHtml);
        const modal = new bootstrap.Modal(
          document.getElementById("productDetailModal")
        );
        modal.show();

        document
          .getElementById("productDetailModal")
          .addEventListener("hidden.bs.modal", () => {
            document.getElementById("productDetailModal").remove();
            const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) backdrop.remove(); // Soluciona pantalla negra
          });
      }
    });
  });
}

function addProductDeleteListeners() {
  const buttons = document.querySelectorAll(".delete-product-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      const confirmed = confirm("¿Deseas eliminar este producto?");
      if (confirmed) {
        await deleteProductById(id);
        document.querySelector(".products-table").innerHTML = "";
        await getProducts();
      }
    });
  });
}
