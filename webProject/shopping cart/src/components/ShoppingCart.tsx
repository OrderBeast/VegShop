import { Button, Offcanvas, Stack} from "react-bootstrap";
import { CartItem, useShoppingCart } from "../context/ShoppingCartContext";
import { CartItemComponent } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { useGetAllProduct } from "../pages/Store";

type ShoppingCartProps={
    isOpen: boolean
}


type CreateOrder = {
    address : string
    creationDate : Date
    userID: number
    productIds: number[]
}

function createOrderFromCart(userID: number, cartItems: CartItem[]) {
    const productsIdinOrder: CreateOrder = {
        address: "Test",
        creationDate: new Date(),
        userID: userID,
        productIds: []
    }

    for (const cartItem of cartItems) {
        for (let index = 0; index < cartItem.quantity; index++) {
            productsIdinOrder.productIds.push(cartItem.id)
        }
    }

    console.log(productsIdinOrder)
    return productsIdinOrder;
}

function postOrder(order: CreateOrder,afterPost : ()=> void) {
    fetch("http://127.0.0.1:8000/createNewOrder/", {
        method: "POST",
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    }).then(response => response.json()).then(_ => afterPost())
}

function createPostOrder(userID:number, cartItems: CartItem[],afterPost : ()=> void)
{
    const order=createOrderFromCart(userID,cartItems)

    if(order.productIds.length === 0) {

        return;
    }
    
    postOrder(order,afterPost)
}
export function ShoppingCart({isOpen}:ShoppingCartProps){
    const {closeCart,cartItems,user,clearCart} = useShoppingCart()
    const items = useGetAllProduct()
    return (
    <Offcanvas show={isOpen} onHide={closeCart}
    placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item=>(
                    <CartItemComponent key={item.id} {...item} />
                ))}
                <div className="ms-auto fw-bold fs-5">
                    Total {formatCurrency(cartItems.reduce((total,cartItem)=>
                    {const item=items.find(i=> i.productID === 
                        cartItem.id)
                        return total+(item?.price ?? 0)*cartItem.quantity

                    },0)
                ) }
                <>
                {user ? <Button className="" onClick={()=>createPostOrder(user.userID,cartItems,clearCart)} >Place order</Button>:<label>
                    log in order to place order</label>}
                </>
                </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
    )
}