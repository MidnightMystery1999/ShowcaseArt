import { useParams } from "react-router";
import Base from "../components/Base";
import CustomNavbar from "../components/CustomNavbar"
import { Button, Card, CardBody, CardImg, CardText, Col, Container, Input, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createComment, loadAllPost, loadPost } from "../services/PostServices";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn, getCurrentUser, doLogout } from '../Auth';

const PostPage = () => {

    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState({
        cmntText:''
    });

    useEffect(() => {
        // load post using postid
        loadPost(postId).then((data) => {
            console.log(data);
            // console.log(post.imageName);
            setPost(data);
        }).catch((error) => {
            console.log(error);
            toast.error("Post not found");
        })
    },[])
    const [user,setUser] = useState(undefined);

    useEffect(()=>{
        setUser(getCurrentUser());
      },[]);


   
    


    const createdAt=(date)=>{
        return new Date(date).toLocaleString();
    }


    const submitComment = (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please log in to submit a comment.");
            return;
        }
        createComment(comments, post.postId, user.id)
            .then((data) => {
                console.log(data);
                toast.success("Comment Added");
                setPost({
                    ...post,
                    comments: [...post.comments, data]
                })
                // window.location.reload();
                setComments({
                    cmntText:''
                })
                
            }).catch((error) => {
                console.log(error);
                // toast.error("Failed to comment");
            })
    } 



    return (
        
        <Base>
            
            <Container className="mt-3">
                <Link to="/">Home</Link> / {post && (<Link to="" >  {post.title} </Link>)}

            {/* Content */}
                <Row>
                    <Col md={{
                        size: 12
                    }}>

                        <Card className="mt-3">
                            <CardBody>
                                <CardText>
                                     Posted By <b> {post && post.user ? post.user.name : 'Unknown'} </b> on <b> {post ? createdAt(post.postDate) : 'Unknown'}</b>
                                </CardText>
                                <CardText>
                                    <h1>{post ? post.title : 'Loading...'}</h1>
                                </CardText>
                                <CardText>
                                    <span>{post ? post.content : 'Loading...'}</span>
                                </CardText>
                                <div className="text-center">
                                <img src={'/images/' + (post ? post.imageName : '')} width="80%" />
                                </div>
                                
                            </CardBody>
                        </Card>
                        
                    </Col>
                </Row>

                {/* Comments */}
                    <Row className="mt-2">
                        <Col md={{
                            size:9,
                            offset:1
                            }
                        }>
                        <h2 style={{ color: 'white' }}>Comment ({post?post.comments.length : 0}) ↓ </h2>
                        {
                            post && post.comments.map((comment, index) => (
                                <Card className="mt-2" key={index}>
                                    <CardBody>
                                        {/* <CardText>
                                            {post.user.name} commented on {createdAt(post.postDate)}
                                        </CardText> */}
                                        <CardText>
                                            Comment by: {comment.user ? comment.user.name : 'Loading...'}
                                        </CardText>
                                        <CardText  className="text-right">
                                            <h3>{comment.cmntText}</h3>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            ))
                        }

                        <Card className="mt-2">
                            <CardBody>
                                    <Input type="textarea" 
                                        placeholder="Write Comment"
                                    value={comments.cmntText}
                                        onChange={(event)=>setComments({cmntText:event.target.value})}/>
                                <Button onClick={submitComment} type="submit" color="success" className="mt-2">Comment</Button>
                            </CardBody>
                        </Card>

                        </Col>
                    </Row>

            </Container>

        </Base>
    )
}

export default PostPage;