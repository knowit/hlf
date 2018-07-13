const ROOT_API_URL = "http://192.168.122.1:8080/";
export const places = id => {
  return `${ROOT_API_URL}steder/${id}/totalvurdering`;
};
