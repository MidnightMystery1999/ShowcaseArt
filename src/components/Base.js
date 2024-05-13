import CustomNavbar from "./CustomNavbar";

const Base=({title="Welcome to Our website",children})=>{
    return(
        <div className="container-fluid">
            <h1>This is a header</h1>
            <CustomNavbar/>
            {children}

        </div>
    );
};

export default Base;