import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { SignUp } from "../services/UserService";
import { toast } from "react-toastify";

const Register=()=>{
    
// useState for storing the data
const [data,setData]=useState({
    username:"",
    email:"",
    password:"",
    about:""
})

const [error, setError]=useState({
    errors:{},
    isError:false
})

// ----useEffect for checking the data---
// useEffect(()=>{
//     console.log(data);
// },[data])

// dynamic value set
const handleChange=(e,field)=>{
    setData({...data,[field]:e.target.value})
}

const resetData=()=>{
    setData({
        username:"",
        email:"",
        password:"",
        about:""
    });
};



const submitForm=(e)=>{
    e.preventDefault();

    if(error.isError){
        toast.error("Please fill the form correctly"); 
        setError({...error,isError:false});
        return;
    }

    console.log(data);
    // data validate

    // call server api for sending data - AXIOS
    SignUp(data).then((resp)=>{
        console.log(resp);
        console.log("Success log");
        toast.success("Registration Successfull");
        setData({
            username:"",
            email:"",
            password:"",
            about:""
        });
    }).catch((error)=>{
        console.log(error);
        console.log("Error log");

        // error handling
        setError({
            errors:error,
            isError:true 
        })

    });
}

    return(
        <Base>
            <Container>
                <Row className="mt-5">
                    {/* print for cheking */}
                    {/* {JSON.stringify(data)} */}

                    <Col md={{size:6,offset:3}} >
                    <Card color="dark" inverse>
                    <CardHeader>
                        <h3>Create new Account</h3>
                    </CardHeader>
                    <CardBody>
                        {/* Form creation */}
                        <Form onSubmit={submitForm}>
                            {/* Name */}
                            <FormGroup>
                                <Label for="username" className="form-label">Name</Label>
                                <Input type="text" className="form-control" id="username" 
                                        placeholder="Enter your name"
                                        onChange={(e)=>handleChange(e,'username')}
                                        value={data.username}
                                        required
                                        invalid={error.errors?.response?.data?.username?true:false}
                                        />

                                        <FormFeedback>
                                            { error.errors?.response?.data?.username }
                                        </FormFeedback>
                            </FormGroup>
                            {/* Email */}
                            <FormGroup>
                                <Label for="email" className="form-label">Email</Label>
                                <Input type="email" className="form-control" id="email" 
                                    placeholder="Enter your email"
                                    onChange={(e)=>handleChange(e,'email')}
                                    value={data.email}
                                    invalid={error.errors?.response?.data?.message?true:false} 
                                    required
                                    />

                                    <FormFeedback>
                                        { error.errors?.response?.data?.message}
                                    </FormFeedback>
                            </FormGroup>
                            {/* Password */}
                            <FormGroup>
                                <Label for="password" className="form-label">Password</Label>
                                <Input type="password" className="form-control" id="password" 
                                    placeholder="Enter your password"
                                    onChange={(e)=>handleChange(e,'password')}
                                    value={data.password}
                                    invalid={error.errors?.response?.data?.password?true:false}
                                    required
                                    />

                                    <FormFeedback>
                                        { error.errors?.response?.data?.password }
                                    </FormFeedback>
                            </FormGroup>
                            {/* About */}
                            <FormGroup>
                                <Label for="about" className="form-label">About</Label>
                                <Input type="textarea" className="form-control" id="about" 
                                    placeholder="Describe yourself" 
                                    onChange={(e)=>handleChange(e,'about')}
                                    value={data.about}
                                    required
                                    />
                            </FormGroup>
                            {/* Button */}
                            <Container className="text-center">
                                <Button color="light" outline>Register</Button>
                                <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};

export default Register;