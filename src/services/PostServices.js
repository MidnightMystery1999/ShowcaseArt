import { privateAxios, axiosApi } from "./helper";
import { getCurrentUser } from "../Auth";

//create post function
export const createPost = (postData) => {
    // console.log(postData);
    
  return privateAxios
    .post(
      `/showcase_art/userId/${postData.userId}/categoryId/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => response.data);
};

// get all post function
export const loadAllPost = (pageNo,pageSize) => {
  return axiosApi.get(`/showcase_art/posts?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=postDate&sortOrder=asc`)
    .then(response => response.data);
};

// get post by single id
export const loadPost = (postId) => {
  return axiosApi.get(`/showcase_art/posts/${postId}`)
    .then(response => response.data);
};


// get post by category id
export const loadPostByCategory = (categoryId) => {
  return axiosApi.get(`/showcase_art/categoryId/${categoryId}/posts`)
    .then(response => response.data);
};

// get post by user id
export function loadPostByUser(userId){
  return privateAxios.get(`/showcase_art/userId/${userId}/posts`)
    .then(response => response.data);
}; 

// delete post by id
export function deletePostById(postId){
  return privateAxios.delete(`/showcase_art/posts/${postId}`)
    .then(response => response.data);
}



// create comment
export const createComment = (comments, postId) => {
  // Retrieve user data from getCurrentUser function
  const user = getCurrentUser();
  // Check if user is not null
  if (user) {
    return privateAxios.post(`/showcase_art/posts/${postId}/user/${user.id}/comments`, comments)
      .then(response => response.data);
  } else {
    throw new Error("User is not logged in");
  }
};

// upload image
export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);

  return privateAxios
    .post(`/showcase_art/posts/image/upload/${postId}`, formData)
    .then(response => response.data);
};


