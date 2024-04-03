
import { useEffect,useState } from "react"
import { Order } from "../components/Order"
import { useShoppingCart } from "../context/ShoppingCartContext"


export type apiProduct = {
    name: string,
    price: number,
    isPricePerKilo: boolean,
    imageURL: string,
    productID: number
}

export type apiProductOrder = {
  productID: number,
  orderID: number,
  quantity: number,
  product: apiProduct
}


export type apiOrder = {
    orderID : number
    products: apiProductOrder[]
    userID: number
}



export function useGetMyOrders() {
  const [orders, setOrders] = useState<apiOrder[]>([]);
  const { user } = useShoppingCart();
  const user_id = user?.userID;
  console.log(user_id)
  useEffect(() => {
    console.log(user_id)
    if (user_id == null) {
        return;
    }
    console.log(user_id)
    fetch(`http://127.0.0.1:8000/getOrdersByUserId/${user_id}`)
      .then((response) => response.json())
      .then((json) => setOrders(json)).catch();
  }, []);
  return orders;
}



export function MyOrders() {
  const orders = useGetMyOrders();

  return (
    <>
      <h1>My Orders</h1>
      {orders && orders.map && orders.map((apiorder) => (
        <Order apiOrder={apiorder} users={null} />
      ))}
    </>
  );
}
