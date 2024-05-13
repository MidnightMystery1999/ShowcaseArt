import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './components/Base';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './pages/user-routes/UserDashboard';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return ( 
        <BrowserRouter>
        <ToastContainer position='bottom-center'/>
            <Routes>
                <Route path = "/" element = {<Home/>}/>
                <Route path = "/about" element = {<About/>}/>
                <Route path = "/login" element = {<Login/>}/>
                <Route path = "/register" element = {<Register/>}/>
                <Route path = "/services" element = {<Services/>}/>
                
                <Route path = "/user/" element = {<PrivateRoute/>}>
                    <Route path = "dashboard" element = {<UserDashboard/>}/>
                    <Route path = "profile" element = {<ProfileInfo/>}/>
                </Route>
            </Routes> 
        </BrowserRouter>
    );
}

export default App;