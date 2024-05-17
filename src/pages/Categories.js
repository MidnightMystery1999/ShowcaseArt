import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Base from '../components/Base';
import { CardGroup, Col, Container, Row } from 'reactstrap';
import CategorySideMenu from '../components/CategorySideMenu';
import { loadPostByCategory } from '../services/PostServices';
import { toast } from 'react-toastify';
import Post from '../components/Post';

function Categories() {

    const [posts, setPosts] = useState([])

    const { categoryId } = useParams()
    useEffect(() => {
        console.log(categoryId);
        loadPostByCategory(categoryId).then(data => {
            setPosts([...data])
        })
            .catch(error => {
                console.log(error)
                toast.error("error in loading posts")
            })
    }, [categoryId])

    return (
    
    <Base>
        <Container>
            <Row>
                <Col md={2} >
                    <CategorySideMenu />
                </Col>
                <Col md={10} >
                    <h1>Post Count {posts.length}</h1>
                    <div className='post-container'>
                    {
                        posts && posts.map((post, index) => {
                            return (
                                <Post key={index} post={post}/>
                            )
                        })
                    }

                    {posts.length<=0 ? <h1>No Post Found</h1> : null}
                    </div>
                     
                </Col>
            </Row>
        </Container>
        
    
    </Base>
    );
}

export default Categories;
