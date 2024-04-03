import AddItemForm, { IProductData } from "../components/AddItemForm";


function callAddProduct (data:IProductData){
    fetch("http://127.0.0.1:8000/createProduct/",{
            method:"POST",
            headers: {
                'content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(ob=>console.log(ob))
    }
export function AddProduct(){
    return <><h1>Add Item</h1><AddItemForm onSubmit={callAddProduct} /></>
}






