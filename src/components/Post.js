import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardGroup, CardText, Col } from "reactstrap";
import { getCurrentUser, isLoggedIn } from "../Auth";
import { deletePostById } from "../services/PostServices";

const Post = ({post={id:-1, title:"This is the default post title", content:"This is default post content"},deletePost, showButton}) => {
    
    const [user,setUser] = useState(null);
    const [login,setLogin] = useState(null);

    useEffect(()=>{
        setUser(getCurrentUser())
        setLogin(isLoggedIn())
    },[])

    
    return (
        <CardGroup>
            <Col >
                <Card className="shadow-sm mt-3">
                    <CardBody >
                        <h1>{post.title}</h1>
                        <CardText>
                            <p>{post.content.substring(0,30)}...</p>
                        </CardText>
                        <div className="card-body">
                            <img src={'/images/' + (post ? post.imageName : '')} style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div>
                        <Link to={'/post/'+post.postId}>
                             <Button color="warning">Read More</Button>
                        </Link>

                        {
                            showButton && login && user && user.id === post.user.id && (
                                <Button onClick={(event) => deletePost(post)} type="submit" color="danger" className="ms-2">Delete</Button>
                            )
                        }


                        
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </CardGroup>
    )
}

export default Post;