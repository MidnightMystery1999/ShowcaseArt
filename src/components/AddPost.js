import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import { getAllCategories } from "../services/CategoryService";
import { useEffect, useRef, useState } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { createPost, uploadPostImage } from "../services/PostServices";
import { getCurrentUser } from "../Auth";
import { toast } from "react-toastify";

const AddPost = ({ setRefresh }) => {


    const [categories,setCategories] = useState([]);

    const[user, setUser] = useState(undefined);
    
    

    const [post, setPost] = useState({
        title: "",
        content: "",
        categoryId:""
    })
// ---------------image---------------
    const [image, setImage] = useState(null);

    const resetData=()=>{
        setPost({
            title: "",
            content: "",
            categoryId:""
        });
    };


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
        // console.log(post)
        if(post.title.trim() === "" || post.content.trim()  === "" || post.categoryId.trim()  === ""){
            alert("All fields are required")
            return;
        }

//  submitPost function
        post['userId'] = user.id
        createPost(post).then(data=>{

            uploadPostImage(image, data.postId)
                .then(data=>{
                    
                }).catch((error)=>{
                    toast.error("Image upload failed");
                    console.log(error)
                })



            toast.success("Post created successfully");
            setRefresh(prev => !prev); // This will trigger a re-render in the parent component
            setPost({
                title: "",
                content: "",
                categoryId:""
            })
        }).catch((error)=>{
            toast.error("Something went wrong");
        })
        
    }


    // image handler
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    };

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
                            <Label for="image">Upload Your ArtWork</Label>
                            <Input
                                id="image"
                                name="file"
                                type="file"
                                onChange={handleFileChange}
                            />
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
                            defaultValue="default"
                            onChange={(e)=>fieldChangeHandler(e,'categoryId')}
                        >
                            <option value="default" disabled selected> -- Select Category --</option>
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
                            <Button onClick={resetData} color="danger" className="ms-2" type="reset">Reset</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default AddPost;