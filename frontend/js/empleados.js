import { obtainEmployees, deleteEmployeeById, getEmployeeById } from "./../apiConnection/consumeEmpleadosApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  await getEmployees();
});

async function getEmployees() {
  const empleados = await obtainEmployees();
  const container = document.querySelector(".employees-table");
  container.innerHTML = "";

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
      <td><button class="btn color3 detail-employee-btn" data-id="${EmpleadoID}">Detalles</button></td>
      <td><button class="btn color2 delete-employee-btn" data-id="${EmpleadoID}">Borrar</button></td>
    `;
    container.appendChild(row);
  });

  addEmployeeDetailListeners();
  addEmployeeDeleteListeners();
}

function addEmployeeDetailListeners() {
  const buttons = document.querySelectorAll(".detail-employee-btn");
  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      const data = await getEmployeeById(id);
      if (data && data.length > 0) {
        const emp = data[0];
        const detailHtml = `
          <div class="modal fade" id="employeeDetailModal" tabindex="-1" aria-labelledby="employeeDetailLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header color1">
                  <h5 class="modal-title headerr" id="employeeDetailLabel">Detalles del Empleado</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p><strong>ID:</strong> ${emp.EmpleadoID}</p>
                  <p><strong>Nombre:</strong> ${emp.Nombre} ${emp.Apellido}</p>
                  <p><strong>Título:</strong> ${emp.Titulo}</p>
                  <p><strong>Ciudad:</strong> ${emp.Ciudad}</p>
                  <p><strong>País:</strong> ${emp.Pais}</p>
                  <p><strong>Teléfono:</strong> ${emp.Telefono}</p>
                </div>
              </div>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML("beforeend", detailHtml);
        const modal = new bootstrap.Modal(document.getElementById('employeeDetailModal'));
        modal.show();

        document.getElementById('employeeDetailModal').addEventListener('hidden.bs.modal', () => {
          document.getElementById('employeeDetailModal').remove();
        });
      }
    });
  });
}

function addEmployeeDeleteListeners() {
  const buttons = document.querySelectorAll(".delete-employee-btn");
  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      const confirmed = confirm("¿Deseas eliminar este empleado?");
      if (confirmed) {
        await deleteEmployeeById(id);
        await getEmployees();
      }
    });
  });
}

