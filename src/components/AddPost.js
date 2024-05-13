import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import { getAllCategories } from "../services/CategoryService";
import { useEffect, useRef, useState } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { createPost } from "../services/PostServices";
import { getCurrentUser } from "../Auth";
import { toast } from "react-toastify";

const AddPost = () => {


    const [categories,setCategories] = useState([]);

    const[user, setUser] = useState(undefined);


    const [post, setPost] = useState({
        title: "",
        content: "",
        categoryId:""
    })


    useEffect(()=>{

        setUser(getCurrentUser())
        getAllCategories().then((data)=>{
            console.log(data)
            setCategories(data)
        }).catch((error)=>{
            console.log(error)
        })
    },[]
    )


    // field change handler
    const fieldChangeHandler = (e,field) => {
        setPost({...post, [field]: e.target.value})
    }

    // submit function for creating post
    const submitPost = (e) => {
        e.preventDefault();
        console.log(post)
        if(post.title.trim() === "" || post.content.trim()  === "" || post.categoryId.trim()  === ""){
            alert("All fields are required")
            return;
        }

//  submitPost function
        post['userId'] = user.id
        createPost(post).then(data=>{
            toast.success("Post created successfully");
            setPost({
                title: "",
                content: "",
                categoryId:""
            })
        }).catch((error)=>{
            toast.error("Something went wrong");
        })
        
    }

    return (
        <div className = "wrapper">
            <Card className="shadow-sm" id="card">
                <CardBody>
                    {/* {JSON.stringify(post)} */}
                    <h3>What's going in your mind ? </h3>
                    <Form onSubmit={submitPost}>
                        <div className="my-3">
                            <Label for="title">Title</Label>
                            <Input type="text" id="title" 
                            placeholder="Enter here"
                            name="title"
                            onChange={(e)=>fieldChangeHandler(e,'title')} 
                            />
                        </div>
                        <div className="my-3">
                            <Label for="content">Content</Label>
                            <Input type="textarea" id="content" 
                            placeholder="Enter here" 
                            style={{height: '100px'}}
                            onChange={(e)=>fieldChangeHandler(e,'content')}
                            />

                            {/* <JoditEditor ref={editor} 
                            value={content}
                            config={config}
                            onChange={newContent=>setContent(newContent)}/> */}

                        </div>
                        <div className="my-3">
                        <Label
                        for="category"
                        sm={2}
                        >
                        Category
                        </Label>
                        <Input
                            id="category"
                            name="categoryId"
                            type="select"
                            onChange={(e)=>fieldChangeHandler(e,'categoryId')}
                        >
                            <option disabled selected> -- Select Category --</option>
                            {
                                categories.map((category)=>(
                                        <option value={category.categoryId} key={category.categoryId}> 
                                            {category.categoryTitle}
                                        </option>
                                ))
                            }

                        </Input>
                        </div>
                        <Container className="text-center">
                            <Button type="submit" color="primary">Create Post</Button>
                            <Button color="danger" className="ms-2">Reset</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default AddPost;