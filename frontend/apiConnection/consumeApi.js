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