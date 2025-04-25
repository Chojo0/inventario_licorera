import { obtainProducts } from "./../apiConnection/consumeProductosApi.js";
import { obtainCategories } from "./../apiConnection/consumeApi.js";
import { createProduct } from "./../apiConnection/createProduct.js";

document.addEventListener("DOMContentLoaded", async () => {
  await getProducts();
  await fillCategoryOptions();
});

async function getProducts() {
  const products = await obtainProducts();
  const container = document.querySelector(".products-table");
  products.forEach((producto) => {
    const {
      ProductoID,
      ProductoNombre,
      CantidadPorUnidad,
      PrecioUnitario,
      UnidadesStock,
      CategoriaNombre
    } = producto;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${ProductoID}</td>
      <td>${ProductoNombre}</td>
      <td>${CantidadPorUnidad}</td>
      <td>$${PrecioUnitario.toLocaleString()}</td>
      <td>${UnidadesStock}</td>
      <td>${CategoriaNombre}</td>
      <td><button class="btn color3">Detalles</button></td>
      <td><button class="btn color5">Editar</button></td>
      <td><button class="btn color2">Borrar</button></td>
    `;
    container.appendChild(row);
  });
}

async function fillCategoryOptions() {
  const categorias = await obtainCategories();
  const select = document.getElementById("categoriaProducto");

  categorias.forEach(categoria => {
    const option = document.createElement("option");
    option.value = categoria.CategoriaID;
    option.textContent = categoria.CategoriaNombre;
    select.appendChild(option);
  });
}

  const productForm = document.getElementById("productForm");

  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const ProductoNombre = document.getElementById("productName").value;
    const CantidadPorUnidad = document.getElementById("cantidadUnidad").value;
    const PrecioUnitario = parseFloat(document.getElementById("precioUnitario").value);
    const UnidadesStock = parseInt(document.getElementById("stock").value);
    const CategoriaID = parseInt(document.getElementById("categoriaProducto").value);

    const producto = {
      ProductoNombre,
      CategoriaID,
      CantidadPorUnidad,
      PrecioUnitario,
      UnidadesStock,
      ProveedorID: null,
      UnidadesPedidas: 0,
      NivelReorden: 0,
      Discontinuado: 0,
    };

    await createProduct(producto);

    document.querySelector(".products-table").innerHTML = "";
    await getProducts();

    const modal = bootstrap.Modal.getInstance(document.getElementById("registerProduct"));
    modal.hide();

    productForm.reset();
  });