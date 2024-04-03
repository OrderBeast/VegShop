import RegisterForm, { IRegisterData } from "../components/registerForm";
import { useNavigate } from "react-router-dom";


function callCreateUser (data: IRegisterData)  {
    if(Object.values(data).some(x=>!x)) {
        console.log("didn't create user")
        return;
    }

    fetch("http://127.0.0.1:8000/createUser/",{
        method:"POST",
        headers: {
            'content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(ob=>console.log(ob))
}

export function Register() {
    const navigate = useNavigate();
    const navigateToLogin = () => navigate("/");

    return <RegisterForm afterSubmit={(data)=> {
        callCreateUser(data)
        navigateToLogin()
    }}/>;
} 

