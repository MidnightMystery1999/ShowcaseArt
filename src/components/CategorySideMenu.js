import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getAllCategories } from "../services/CategoryService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CategorySideMenu() {

    const [category, setCategory] = useState([])
    useEffect(() => {
        getAllCategories().then((data) => {
            setCategory([...data]);
        }).catch((error) => {
            console.log(error);
            toast.error("Error in loading categories")
        })
    }, [])


  return (
    <div>
      <h1>Side Menu</h1>
      <ListGroup>
        <ListGroupItem tag={Link} to="/" action={true}>
            All
        </ListGroupItem>
        {category && category.map((cat,index) => {
          return(
            <ListGroupItem tag={Link} to={"/categories/"+cat.categoryId} key={index} action={true}>
                {cat.categoryTitle}
            </ListGroupItem>

          )
        })}
    
        
      </ListGroup>
    </div>
  );
}

export default CategorySideMenu;