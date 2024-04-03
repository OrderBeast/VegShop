import { Navigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Admin } from "../pages/AdminControl";

export default function ProtectedRoutes() {
    const {user}  = useShoppingCart();
  return user?.isAdmin ? <Admin /> : <Navigate to="/" />;
}