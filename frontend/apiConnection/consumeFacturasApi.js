const url = "http://localhost:5000/api/facturas";

export const obtainInvoices = async () => {
  try {
    const response = await fetch(url);
    const facturas = await response.json();
    return facturas;
  } catch (error) {
    console.error("Error al obtener facturas", error);
  }
};
