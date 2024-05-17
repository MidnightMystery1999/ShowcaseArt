import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './components/Base';
import Home from './pages/user-routes/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ContactUs from './pages/ContactUs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './pages/user-routes/UserDashboard';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import PrivateRoute from './components/PrivateRoute';
import PostPage from './pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './pages/Categories';

function App() {
    return ( 
        <UserProvider>
            <BrowserRouter>
            <ToastContainer position='bottom-center'/>
                <Routes>
                    <Route path = "/" element = {<Home/>}/>
                    <Route path = "/about" element = {<About/>}/>
                    <Route path = "/login" element = {<Login/>}/>
                    <Route path = "/register" element = {<Register/>}/>
                    <Route path = "/contact" element = {<ContactUs/>}/>
                    <Route path='/post/:postId' element={<PostPage/>}/>
                    <Route path='categories/:categoryId' element={<Categories/>}/>
                    
                    <Route path = "/user/" element = {<PrivateRoute/>}>
                        <Route path = "dashboard" element = {<UserDashboard/>}/>
                        <Route path = "profile" element = {<ProfileInfo/>}/>
                    </Route>
                </Routes> 
        </BrowserRouter>
        </UserProvider>
    );
}

export default App;