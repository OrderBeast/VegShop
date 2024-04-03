import { useShoppingCart } from "../context/ShoppingCartContext"
import { Button, Stack } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useGetAllProduct } from "../pages/Store"


type cartItemProps={
    id:number
    quantity:number
    
}


export function CartItemComponent({id,quantity}:cartItemProps){
    const {removeFromCart} =useShoppingCart()
    const items = useGetAllProduct()
    const item = items.find(i=> i.productID ===id)
    if (item==null) return null
    

    return (
       <Stack direction="horizontal" gap={2} className="d-flex 
        align-items-center">
        <img src={item.imageURL} style={{width:"125px",
            height:"75px", objectFit:"cover"}}
        />
        <div className="me-auto">
            <div>
                {item.name} {quantity>1 && <span className="text-muted" style={{fontSize:".65 rem"}}>
                x{quantity}</span>}
            </div>
            <div className="text-muted" style={{fontSize:".75rem"}}>{formatCurrency(item.price)}
            </div>
        </div>
        <div>{formatCurrency(item.price*quantity)}</div>
        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.productID)}>
            &times;</Button>
       </Stack>
    )
} 