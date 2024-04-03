 import { Card } from "react-bootstrap";
import { apiOrder } from "../pages/MyOrders";
import { User } from "../context/ShoppingCartContext";



export function Order({ apiOrder , users }: {apiOrder:apiOrder, users: User[] | null}) {

  const user = users?.find(user=>user.userID === apiOrder.userID)
  
  return (
    <Card className="h-100 d-flex flex-column">
      <Card.Body >
        <div className="mt-auto">
        <h3>Order ID: {apiOrder.orderID}</h3>
      
      <div className="text-bold" style={{fontSize:"1rem"}}>
          <div>user ID = {apiOrder.userID}</div>
           {user?.userName && <div>user Name = {user?.userName}</div>}
      </div>
      <div className="text-bold">List Of Products:</div>
      <ul>
        {apiOrder.products.map((apiProductOrder, index) => 
           (
          <li key={index}>
            {apiProductOrder.product.name} x{apiProductOrder.quantity}
          </li>
        ))}
      </ul>
        </div>

      </Card.Body>
      
    </Card>
  );
}
