import {Col,Row} from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"   
import { useEffect,useState } from "react"

 type apiProduct = {
    name: string,
    price: number,
    isPricePerKilo: boolean,
    imageURL: string,
    productID: number
}

export function useGetAllProduct() {
    const [items, setItems] = useState<apiProduct[]>([]);

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/getAllProducts/")
        .then(response =>response.json())
        .then(json=>setItems(json))
    },[])
    return items
}

export function Store(){
    const items = useGetAllProduct();
    return (
        <>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {items.map(item=>(
                    <Col key={item.productID}>
                     <StoreItem {...({...item,id : item.productID, imgUrl: item.imageURL})}/>
                    </Col>  
                ))}
            </Row>
        </>
    )
}
