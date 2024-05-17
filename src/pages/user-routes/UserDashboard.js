import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import AddPost from '../../components/AddPost';
import { Container } from 'reactstrap';
import NewFeed from '../../components/NewFeed';
import { getCurrentUser } from '../../Auth';
import { loadPostByUser } from '../../services/PostServices';
import { toast } from 'react-toastify';
import { Col } from 'reactstrap';
import Post from '../../components/Post';
import { deletePostById } from '../../services/PostServices';


const UserDashboard=()=> {

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([])
  const [refresh, setRefresh] = useState(false);

  useEffect(()=>{
    console.log(getCurrentUser())
    setUser(getCurrentUser())

    // loadPostByUser(getCurrentUser().id).then(data=>{
    //   console.log(data)
    //   console.log("loadPostByUser")
    //   setPosts([...data])
    // }).catch(error=>{
    //   console.log(error)
    //   toast.error("Error in loading posts")
    // })
    loadPostData();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

  },[refresh])

  //--------------- load post function
  function loadPostData(){
    loadPostByUser(getCurrentUser().id).then(data=>{
      console.log(data)
      console.log("loadPostByUser")
      setPosts([...data])
    }).catch(error=>{
      console.log(error)
      toast.error("Error in loading posts")
    })
  }

  //----------------- delete post function
  const deletePost=(post)=>{
    deletePostById(post.postId).then(res=>{
      console.log(res)
      toast.success("Post deleted successfully")
      loadPostData();
    }).catch(error=>{
      console.log(error)
      toast.error("Error in deleting post")
    })
  }
 

  return (
    <Base> 
    <br/>
      <Container>
        <AddPost setRefresh={setRefresh} />
        <h1 className='my-3'>Post Count : ({posts.length})</h1>

        
      <div className="posts-container">
        {
          posts.map((post, index) => (
            <Post post={post} deletePost={deletePost} key={index} showButton={true} />
        ))}
      </div>
        
      </Container>
    
    </Base>
  )
}


export default UserDashboard;