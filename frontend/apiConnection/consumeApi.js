const url = "http://localhost:5000/api/categorias";

export const obtainCategories = async () => {
  try {
    const response = await fetch(url);
    const categorias = await response.json();
    return categorias;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryById = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE"
    });
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
  }
};
