
import { useEffect,useState } from "react"
import { Order } from "../components/Order"
import { apiOrder } from "../pages/MyOrders";
import { User } from "../context/ShoppingCartContext";


export function useGetAllOrders() {
    const [orders, setOrders] = useState<apiOrder[]>([]);
    
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/getAllOrders/")
        .then(response =>response.json())
        .then(json=>setOrders(json))
    },[])
    return orders
}

export function useGetAllUsers() {
    const [users, setUsers] = useState<User[]>([]);
    
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/getAllUsers/")
        .then(response =>response.json())
        .then(json=>setUsers(json))
    },[])
    return users
}


export function AllOrders() {
  const orders = useGetAllOrders();
  const users = useGetAllUsers();
  return (
    <>
      <h1>All Orders</h1>
      {orders && orders.map && orders.map((apiorder) => (
        <Order apiOrder={apiorder} users={users} />
      ))}
    </>
  );
}
