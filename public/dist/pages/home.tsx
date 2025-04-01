import Logo from "../../../src/components/logo";
import React from "react";
import Form from "../../../src/components/form";
import Footer from "../../../src/components/footer";
import './home.css'
let Home = () => {
    return(
        <div>
            <Logo/>
            <div>
                <Form/>
            </div>
            <Footer/>
        </div>
    )

}

export default Home;