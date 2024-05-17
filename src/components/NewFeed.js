import React, { useState } from "react";
import { useEffect } from "react";
import { loadAllPost } from "../services/PostServices";
import { CardGroup, Col, Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import Post from "./Post";

const NewFeed = () => {

  const [postContent, setPostContent] = useState({
    content: [],
    totalElements:'',
    totalPages:'',
    pageSize:'',
    pageNo:'',
    lastPage:false
  });

  useEffect(() => {
    // get AllPost from server
    changePage(0)
  }, []);

  const changePage=(pageNo=0,pageSize=100)=>{

    if(pageNo>postContent.pageNo && postContent.lastPage){
      return
    }
    if(pageNo>postContent.pageNo && postContent.pageNo==0){
      return
    }

    loadAllPost(pageNo,pageSize).then((data)=>{
      setPostContent(data);
      // console.log(data);
    }).catch((error)=>{
      console.log(error);
    })
  }
 


  return (
    <div className="container-fluid">

      <Row>
      <Col md={
          {
            size:20,
            offset:2
          }
        }>
          
        {/* ----------Cards for----------- */}
        {/* <p>Post Count ({postContent?.totalElements})</p> */}
        <CardGroup>
        {
          postContent?.content.map((post) => (
            <Col md="3" className="mx-1" key={post.id}>
              <Post post={post} showButton={false}/>
            </Col>
          ))
        }
        </CardGroup>
 
        {/* ---------Pagination---------  */}
       {/* <Container className="mt-2">
          <Pagination size="sm">
            <PaginationItem onClick={()=>changePage(postContent.pageNo-1)} disabled={postContent.pageNo==0}>
              <PaginationLink previous>

              </PaginationLink>
            </PaginationItem >

            {
                [...Array(postContent.totalPages)].map((item,index)=>(
                  <PaginationItem onClick={()=>changePage(index)} active={index == postContent.pageNo} key={index} >
                    <PaginationLink >
                        {index+1}
                    </PaginationLink>
                  </PaginationItem>
                ))
              }

            <PaginationItem onClick={()=>changePage(1+postContent.pageNo)} disabled={postContent.lastPage}>
              <PaginationLink next>
                
              </PaginationLink>
            </PaginationItem>

          </Pagination>

        </Container>     */}

        </Col>
      </Row>

       
      
    </div>
  );
};

export default NewFeed;