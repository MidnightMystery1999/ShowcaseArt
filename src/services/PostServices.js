import { privateAxios } from "./helper";
import { myAxios } from "./helper";
//create post function
export const createPost = (postData) => {
  //   console.log(postData);
  return privateAxios
    .post(
      `/showcase_art/userId/${postData.userId}/categoryId/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => response.data);
};

// get all post function
export const getAllPost = () => {
  return myAxios.get("/showcase_art/posts").then((response) => response.data);
};