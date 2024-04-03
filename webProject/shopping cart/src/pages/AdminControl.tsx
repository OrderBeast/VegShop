import { AllOrders } from "../components/AllOrders";
import { AddProduct } from "./AddProduct";
import DeleteProduct from "./DeleteProduct";

export function Admin(){
    return <>
    <DeleteProduct/>
    <AddProduct/>
    <AllOrders/>
    </>
}