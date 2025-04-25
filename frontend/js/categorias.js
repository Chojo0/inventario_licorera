import { obtainCategories, deleteCategoryById, getCategoryById } from "../apiConnection/consumeApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  await getCategories();
});

async function getCategories() {
  const categoriesObtained = await obtainCategories();
  const container = document.querySelector(".Category-table");
  container.innerHTML = ""; // Limpiamos por si ya había datos

  categoriesObtained.forEach((categoria) => {
    const { CategoriaID, CategoriaNombre, Descripcion, Imagen } = categoria;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${CategoriaID}</td>
      <td>${CategoriaNombre}</td>
      <td>${Descripcion}</td>
      <td><img src="${Imagen}" WIDTH="150px"></td>
      <td><button class="btn color3 detail-btn" data-id="${CategoriaID}">Detalles</button></td>
      <td><button class="btn color2 delete-btn" data-id="${CategoriaID}">Borrar</button></td>
    `;
    container.appendChild(row);
  });

  // Asignar eventos a los nuevos botones
  addDeleteEventListeners();
  addDetailEventListeners();
}

function addDeleteEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      const confirmDelete = confirm("¿Estás seguro que deseas eliminar esta categoría?");
      if (confirmDelete) {
        await deleteCategoryById(id);
        await getCategories(); // Refrescar la tabla
      }
    });
  });
}

function addDetailEventListeners() {
  const detailButtons = document.querySelectorAll(".detail-btn");
  detailButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      const data = await getCategoryById(id);

      if (data && data.length > 0) {
        const categoria = data[0];
        const detailHtml = `
          <div class="modal fade" id="categoryDetailModal" tabindex="-1" aria-labelledby="categoryDetailLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header color1">
                  <h5 class="modal-title headerr" id="categoryDetailLabel">Detalles de Categoría</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p><strong>ID:</strong> ${categoria.CategoriaID}</p>
                  <p><strong>Nombre:</strong> ${categoria.CategoriaNombre}</p>
                  <p><strong>Descripción:</strong> ${categoria.Descripcion}</p>
                  <img src="${categoria.Imagen}" width="100%" />
                </div>
              </div>
            </div>
          </div>
        `;

        document.body.insertAdjacentHTML("beforeend", detailHtml);
        const modal = new bootstrap.Modal(document.getElementById('categoryDetailModal'));
        modal.show();

        // Limpiar el modal del DOM al cerrarlo
        document.getElementById('categoryDetailModal').addEventListener('hidden.bs.modal', () => {
          document.getElementById('categoryDetailModal').remove();
        });
      }
    });
  });
}

