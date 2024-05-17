import Base from "../components/Base";
import UserContext from "../context/UserContext";
import { Card, CardBody, Form } from 'reactstrap';

const ContactUs = () => {
    return (
        <UserContext.Consumer>
            {
                (user) => {
                    return (
                        <Base>
                             <Card style={{ border: '2px solid #ccc', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <CardBody>
                                    <h1>Contact Us</h1>
                                    <p>If you have any questions, feedback, or inquiries, we'd love to hear from you! Feel free to reach out to us using any of the following methods:</p>
                                    <div className="contact-info">
                                        <h2>Contact Information:</h2>
                                        <p><strong>Email:</strong> <a href="mailto:info@example.com">info@example.com</a></p>
                                        <p><strong>Phone:</strong> +1234567890</p>
                                        <p><strong>Address:</strong> 123 Art Street, Artville, AR 12345</p>
                                        <p><strong>Available Time:</strong> Monday - Friday, 9:00 AM - 5:00 PM (GMT)</p>
                                    </div>
                                    <div className="social-media">
                                        <h2>Connect with Us:</h2>
                                        <p>Stay updated with the latest news, announcements, and inspirations by following us on social media:</p>
                                        <ul>
                                            <li><a href="https://www.facebook.com/example">Facebook</a></li>
                                            <li><a href="https://twitter.com/example">Twitter</a></li>
                                            <li><a href="https://www.instagram.com/example">Instagram</a></li>
                                        </ul>
                                    </div>
                                    
                                </CardBody>
                            </Card>
                        </Base>
                    );
                }
            }
        </UserContext.Consumer>
    );
};

export default ContactUs;