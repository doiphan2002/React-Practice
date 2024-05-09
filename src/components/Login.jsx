import { useContext, useEffect, useState } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const Login = () => {
    const navigate = useNavigate();
    const{ loginContext } = useContext(UserContext);

     const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);
    
    // useEffect(() => {
    //     let token =  localStorage.getItem("token")
    //     if(token) {
    //         navigate("/users");
    //     }
    // },[])



    const handleLogin =  async () => {
        if(!email || !password) {
            toast.success("Email/Password is required!")
            return;
        }
        setLoadingAPI(true);
        let res =  await loginApi(email, password);
        if(res && res.token) {
            loginContext(email, res.token);
            navigate("/users");
        } else {
            // error
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }
        setLoadingAPI(false);
    }


    return (
    <div className="login-container col-12 col-sm-4">
        <div className="title">Login</div>
        <div className="text">Email or username ( eve.holt@reqres.in )</div>
        <input 
        type="text" 
        placeholder="Email or username..."
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        />
        <div className="input-2">
        <input 
        type={isShowPassword === true ? "text" : "password"}
        placeholder="Password..."
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        />
        <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
        onClick={() => setIsShowPassword(!isShowPassword)}
        ></i>
        </div>
        <button 
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
        >
            {loadingAPI && <i className="fa-solid fa-sync fa-spin"></i>}
            &nbsp;Login
            </button>
        <div className="back">
            <i className="fa-solid fa-angles-left"></i> Go back</div>

    </div>
    )
}
export default Login;