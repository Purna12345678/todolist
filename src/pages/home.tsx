import Logo from "../components/logo";
import Form from "../components/form";
import Footer from "../components/footer";
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