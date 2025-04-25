import { obtainEmployees } from "./../apiConnection/consumeEmpleadosApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  await getEmployees();
});

async function getEmployees() {
  const empleados = await obtainEmployees();
  const container = document.querySelector(".employees-table");

  empleados.forEach(empleado => {
    const { EmpleadoID, Apellido, Nombre, Titulo, Ciudad, Pais, Telefono } = empleado;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${EmpleadoID}</td>
      <td>${Apellido}, ${Nombre}</td>
      <td>${Titulo}</td>
      <td>${Ciudad}</td>
      <td>${Pais}</td>
      <td>${Telefono}</td>
      <td><button class="btn color3">Detalles</button></td>
      <td><button class="btn color5">Editar</button></td>
      <td><button class="btn color2">Borrar</button></td>
    `;
    container.appendChild(row);
  });
}
