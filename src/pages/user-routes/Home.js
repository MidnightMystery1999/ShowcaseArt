import { useEffect } from "react";
import Base from "../../components/Base";
import NewFeed from "../../components/NewFeed";
import CategorySideMenu from "../../components/CategorySideMenu";
import { Col, Row } from "reactstrap";

const Home=()=>{


    return(
        <Base>
        <Row>
            <Col md={2}>
                <CategorySideMenu/>
            </Col>
            <Col md={10}>
                 <NewFeed />
            </Col>
        </Row>
            
        </Base>
    );
};

export default Home;
