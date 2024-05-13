import { axiosApi } from "./helper";

export const getAllCategories = () => {
  return axiosApi.get("/showcase_art/categories/")
    .then(response=>{return response.data});
}