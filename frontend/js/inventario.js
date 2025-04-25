import { obtainCategories } from "./../apiConnection/consumeApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  await getCategories();
});

async function getCategories() {
  const categoriesObtained = await obtainCategories();
  const container = document.querySelector(".Category-table");
  categoriesObtained.forEach((categoria) => {
    const { CategoriaID, CategoriaNombre, Descripcion, Imagen } = categoria;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${CategoriaID}</td>
      <td>${CategoriaNombre}</td>
      <td>${Descripcion}</td>
      <td><img src="${Imagen}" WIDTH="150px"></td>
      <td><button class="btn color3">Detalles</button></td>
      <td><button class="btn color5">Editar</button></td>
      <td><button class="btn color2">Borrar</button></td>
    `;
    container.appendChild(row);
  });
}
