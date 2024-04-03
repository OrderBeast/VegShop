import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginForm, { ILogInData } from "../components/LogInForm";
import { useShoppingCart } from "../context/ShoppingCartContext";

function callLogInUser(data: ILogInData, setUser: any) {
  fetch("http://127.0.0.1:8000/userLogIn/", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((ob) => setUser(ob));
}

export function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useShoppingCart();

  const navigateToRegister = () => navigate("/register");
  const onLogin = (data: ILogInData) => callLogInUser(data, setUser);
  const logOut = () => setUser(null);

  return (
    <>
      <>
        {user ? (
          <div>
            "hello" {user?.userName}{" "}
            <Button className="w-40" onClick={logOut}>
              LOG OUT
            </Button>
          </div>
        ) : (
          <div>
            <h1>LogIn</h1>
            <LoginForm afterSubmit={onLogin} />
            <Button className="w-40" onClick={navigateToRegister}> Register</Button>
          </div>
        )}
      </>
    </>
  );
}
