import Base from '../components/Base';
import UserContext from '../context/UserContext';
import { Card, CardBody } from 'reactstrap';

const About = () => {
    return (
        <UserContext.Consumer>
            {
                (user) => {
                    
                        <Base>
                        <br></br>
                            <Card style={{ border: '2px solid #ccc', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <CardBody>
                                    <h1>About Us</h1>
                                    <p>Welcome to our platform! {user.email}</p>
                                    <p>We provide a platform for artists to share and explore beautiful paintings from around the world. Whether you're an aspiring painter looking to showcase your talent or an art enthusiast seeking inspiration, our website offers a diverse collection of captivating artworks.</p>
                                    <p>Here's what you can expect:</p>
                                    <ul>
                                        <li><strong>Painting Sharing:</strong> Upload and share your favorite paintings with the community.</li>
                                        <li><strong>User Comments:</strong> Engage with fellow users through comments and discussions on each painting.</li>
                                        <li><strong>Explore:</strong> Discover new and trending paintings across various styles, genres, and themes.</li>
                                        
                                    </ul>
                                    <p>Our mission is to foster a supportive and inspiring community where artists can thrive and art lovers can find joy and inspiration. Join us on this journey as we celebrate the beauty of painting and the power of artistic expression.</p>
                                </CardBody>
                            </Card>
                        </Base>
                  
                }
            }
        </UserContext.Consumer>
    );
};

export default About;