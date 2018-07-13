const ROOT_API_URL = "http://localhost:8080/";
export const places = id => {
  return `${ROOT_API_URL}steder/${id}/totalvurdering`;
};
