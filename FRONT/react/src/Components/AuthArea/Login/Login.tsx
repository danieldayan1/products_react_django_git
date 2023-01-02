import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import "./Login.css";

function Login(): JSX.Element {
    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {

        try {
            await authService.login(credentials);
            alert("Welcome" + credentials.username);
            navigate("/home");
        }
        catch (err: any) {
            alert(err.message);
        }

    }

    return (
        <div className="Register Box">

            <form onSubmit={handleSubmit(send)}>

                <div className="form-floating">
                    <input type="text" className="form-control" {...register("username")} />
                    <label>Username</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" {...register("password")} />
                    <label>Password</label>
                </div>

                <button className="btn btn-primary">Register</button>

            </form>

        </div>
    );
}

export default Login;
