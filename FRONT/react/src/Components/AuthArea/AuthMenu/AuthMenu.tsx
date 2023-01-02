import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../redux/AuthStore";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return () => {
            unsubscribe();
        }

    }, [])


    return (
        <div className="AuthMenu">
            {!user && <><span>Welcome | </span>
               <NavLink to="/login">Login  </NavLink>
                |
                <NavLink to="/Register">  Register</NavLink>

            </>}
            {
                user && <>
                    <span>Welcome {user.firstName} {user.lastName} | </span>
                    <NavLink to="/Logout">Logout</NavLink>
                </>
            }
        </div>
    );
}

export default AuthMenu;
