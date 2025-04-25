const url = "http://localhost:5000/api/facturas";

export const obtainInvoices = async () => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener facturas:", error);
  }
};

export const deleteInvoiceById = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE"
    });
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar factura:", error);
  }
};

export const getInvoiceById = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener factura:", error);
  }
};
