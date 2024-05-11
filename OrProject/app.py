from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from sql_app import crud, schemas
from sql_app.start import init,get_db
from fastapi.middleware.cors import CORSMiddleware
import traceback

app = FastAPI()
init()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/getAllProducts/", response_model=list[schemas.Product])#works
def getAllProducts(db: Session = Depends(get_db)):
    return crud.get_all_products(db)

@app.get("/getAllProductsNames/", response_model=list[str])#works
def getAllProductsnNames(db: Session = Depends(get_db)):
    return crud.get_all_products_names(db)

@app.get("/getProductById/{product_id}", response_model=schemas.Product) #works
def getProductByID(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product_by_ID(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_product

@app.get("/getProductByName/{product_name}", response_model=schemas.Product) #works
def getProductByName(product_name: str, db: Session = Depends(get_db)):
    db_product = crud.get_product_by_name(db, name=product_name)
    if db_product is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_product

@app.get("/getAllUsers/", response_model=list[schemas.User]) #works
def getAllUsers(db: Session = Depends(get_db)):
    return crud.get_all_users(db)

@app.get("/getUserById/{user_id}", response_model=schemas.User) #works
def getUserById(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, userId=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.get("/getOrdersByUserId/{user_id}", response_model=list[schemas.Order])  #works
def getOrdersByUserId(user_id: int, db: Session = Depends(get_db)):
    order = crud.get_orders_by_UserID(db, userID=user_id)
    return order



@app.get("/getAllOrders/", response_model=list[schemas.Order])  #works
def getAllOrders(db: Session = Depends(get_db)):
    return crud.get_all_orders(db)

@app.post("/createUser/", response_model=schemas.User)
def createUser(user: schemas.UserCreate, db: Session = Depends(get_db)):
    try:  
        user = crud.create_user(db=db, user=user)
        return user
    except:
        raise HTTPException(status_code=404, detail="Error")

@app.post("/createProduct/", response_model=schemas.Product)
def createProduct(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    try:  
        product = crud.create_product(db=db, product=product)
        return product
    except:
        raise HTTPException(status_code=404, detail="Error")


@app.post("/createNewOrder/", response_model=schemas.Order)
def createNewOrder(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    try:  
        orderInDb = crud.create_new_empty_order(db=db, order=order)

        product_occurrences = {}
        for product_id in order.productIds:
            if product_id in product_occurrences:
                 product_occurrences[product_id] += 1
            else:
                product_occurrences[product_id] = 1
        
        for product_id, occurrence in product_occurrences.items():
            addProduct= schemas.AddProduct(orderID = orderInDb.orderID,
                                           productID = product_id,quantity = occurrence)
            crud.add_product_to_order(db=db,addProduct=addProduct)

        order = crud.get_orders_by_orderId(db,orderInDb.orderID)
        return order
    

    except Exception as err:
        db.rollback()
        traceback.print_exc()
        print(err)
        raise HTTPException(status_code=404, detail="Error")
    
@app.get("/getOrderByOrderId/{order_id}", response_model=schemas.Order)  #works
def getOrdersByOrderId(order_id: int, db: Session = Depends(get_db)):
    order = crud.get_orders_by_orderId(db,order_id)
    return order    

@app.post("/updateProduct/")
def updateProduct(product: schemas.updateProduct, db: Session = Depends(get_db)):
    try:  
        crud.update_product(db=db,updateProduct=product)
        return {"message":"success"}
    except  Exception as err:
        print(err)
        raise HTTPException(status_code=404, detail="Error")

@app.post("/updateUser/")
def updateUser(user: schemas.updateUser, db: Session = Depends(get_db)):
    try:  
        crud.update_User(db=db, user=user)
        return {"message":"success"}
    except:
        raise HTTPException(status_code=404, detail="Error")
    
@app.post("/userLogIn/", response_model=schemas.User)
def userLogIn(userLogInData:schemas.UserLogIn,db: Session = Depends(get_db)):
    try:  
        return crud.get_user_by_password_and_username(db=db,username=userLogInData.userName,password=userLogInData.password)
    except Exception as err:
        print(err)
        return None

@app.post("/addProductToOrder/")
def addProductToOrder(addProduct: schemas.AddProduct, db: Session = Depends(get_db)):
    try:  
        crud.add_product_to_order(db=db, addProduct=addProduct)
        return {"message":"success"}
    except Exception as err:
        print(err)
        raise HTTPException(status_code=404, detail="Error")

# @app.post("/removeProductToOrder/")
# def removeProductToOrder(removeProductFromOrder: schemas.RemoveProductFromOrder, db: Session = Depends(get_db)):
#     try:  
#         crud.remove_product_to_order(db=db, removeProductFromOrder=removeProductFromOrder)
#         return {"message":"success"}
#     except Exception as err:
#         print(err)
#         raise HTTPException(status_code=404, detail="Error")

@app.post("/deleteOrder/")
def deleteOrder(deleteOrder:schemas.deleteOrder, db: Session = Depends(get_db)):
    try:  
        crud.delete_order(db=db, deleteOrder=deleteOrder)
        return {"message":"success"}
    except Exception as err:
        print(err)
        raise HTTPException(status_code=404, detail="Error")  
    
@app.post("/deleteProduct/")
def deleteProduct(deleteProduct:schemas.deleteProductByName, db: Session = Depends(get_db)):
    try:  
        if (crud.is_product_in_any_order(db=db,deleteProduct=deleteProduct)==False):
            crud.delete_product(db=db, deleteProduct=deleteProduct)
            return {"message":"success","isDeleted": True}
        else :
            return {"message":"Product is already in an order","isDeleted": False}
    except Exception as err:
        print(err)
        raise HTTPException(status_code=404, detail="Error")
    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)


