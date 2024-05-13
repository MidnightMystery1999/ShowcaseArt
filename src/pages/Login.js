import { useState } from "react";
import Base from "../components/Base";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Row, Label, Input } from "reactstrap";
import { toast } from "react-toastify";
import { LogIn } from "../services/UserService";
import { doLogin } from "../Auth";
import { useNavigate } from "react-router";

const Login=()=>{

const navigate=useNavigate();

const[loginDetail, setLoginDetail]=useState({
    username:"",
    password:""
})

const handleChange=(e,field)=>{
   let actualValue = e.target.value
   setLoginDetail({...loginDetail,[field]:actualValue})
}
const resetData=()=>{
    setLoginDetail({
        username:"",
        password:"",
    });
};

const handleFormLogin=(e)=>{
    e.preventDefault();
    console.log(loginDetail);
    // validation
    if(loginDetail.username.trim()===""){
        toast.error("Username is required");
        return;
    } else if(loginDetail.password.trim()===""){
        toast.error("Password is required");
        return;
    }

    // data to be sent to the server to generate token
    LogIn(loginDetail).then((data)=>{
        console.log(data);
        // save the token in the local storage
        doLogin(data,()=>{
            // redirect to the home page
            console.log("Login details saved in local storage");

            // redirect to the home page - user
            navigate("/user/dashboard");
        }); 
        toast.success("Login Successfull");
        
    }).catch((error)=>{
        console.log(error);
        if(error.response.status==400){
            toast.error(error.response.data.message);
        } else{
            toast.error("Login failed! Please try again later.");
        }
    })

}


    return(
        <Base>
            <Container>
                <Row className="mt-5">
                    <Col md={{size:6,offset:3}} >
                    <Card color="dark" inverse>
                    <CardHeader>
                        <h3>Login into your Account</h3>
                    </CardHeader>
                    <CardBody>
                        {/* Form creation */}
                        <Form onSubmit={handleFormLogin}>

                            {/* Email */}
                            <FormGroup>
                                <Label for="email" className="form-label">Email</Label>
                                <Input type="email" className="form-control" id="email" 
                                placeholder="Enter your email"
                                value={loginDetail.username}
                                onChange={(e)=>handleChange(e,'username')}
                                />
                            </FormGroup>
                            {/* Password */}
                            <FormGroup>
                                <Label for="password" className="form-label">Password</Label>
                                <Input type="password" className="form-control" id="password" 
                                placeholder="Enter your password"
                                value={loginDetail.password}
                                onChange={(e)=>handleChange(e,'password')}
                                />
                            </FormGroup>
                            
                            {/* Button */}
                            <Container className="text-center">
                                <Button color="light" outline>Login</Button>
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

export default Login;