import LoginFrom from "../Components/LoginForm";
import { useAuth } from "../Context/AuthContext";

const Home = () => {

    const { authenticated} = useAuth();

    return(
        <>
            <h3>Home</h3>
            {(!authenticated) ? (
            <LoginFrom authenticated={authenticated}/>
            ) : ( <p>You are Authenticated</p>)
            }

        </>
    )
}

export default Home;