import { obtainClients } from "./../apiConnection/consumeClientesApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  await getClients();
});

async function getClients() {
  const clients = await obtainClients();
  const container = document.querySelector(".clients-table");

  clients.forEach(cliente => {
    const { ClienteID, Compania, Contacto, Ciudad, Telefono, Pais } = cliente;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${ClienteID}</td>
      <td>${Compania}</td>
      <td>${Contacto}</td>
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
