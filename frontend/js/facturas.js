import { obtainInvoices } from "./../apiConnection/consumeFacturasApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  await getInvoices();
});

async function getInvoices() {
  const invoices = await obtainInvoices();
  const container = document.querySelector(".invoices-table");

  invoices.forEach(factura => {
    const { FacturaID, ClienteID, EmpleadoID, FechaFactura, Transporte, PaisEnvio } = factura;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${FacturaID}</td>
      <td>${ClienteID}</td>
      <td>${EmpleadoID}</td>
      <td>${FechaFactura}</td>
      <td>${Transporte}</td>
      <td>${PaisEnvio}</td>
      <td><button class="btn color3">Detalles</button></td>
    `;
    container.appendChild(row);
  });
}
