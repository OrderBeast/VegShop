from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProductBase(BaseModel):
    name: str
    price: int
    isPricePerKilo: bool
    imageURL: str

    

class Product(ProductBase):
    productID : int 
    
    class Config:
        from_attributes = True

class ProductCreate(ProductBase):
    pass 

class deleteProductByName(BaseModel):
    productName:str

class ProductOrder(BaseModel):
    productID : int
    orderID : int
    quantity : int
    product : Product
    
    class Config:
        from_attributes = True


class deleteOrder(BaseModel):
    orderid:int
    
class updateProduct(BaseModel):
    productID : int 
    name : Optional[str] = None
    price : Optional[float] = None
    isPricePerKilo : Optional[str] = None
    imageURL : Optional[str] = None

class updateUser(BaseModel):
    userID : int
    userName : Optional[str] = None
    email : Optional[str] = None
    firstName : Optional[str] = None
    lastName : Optional[str] = None
    password : Optional[int] = None


class OrderBase(BaseModel):
    address : str
    creationDate : datetime
    userID: int


class OrderCreate(OrderBase):
    productIds: list[int]


class Order(OrderBase): #checks that an order contains id and a list of prod. 
    orderID : int
    products: list[ProductOrder] = []
    
    class Config:
        from_attributes = True

class AddProduct(BaseModel): #checks that a when adding a product to an order there will 
    #be all neccecery fields
    orderID : int
    productID : int 
    quantity: int   

class RemoveProductFromOrder(BaseModel):
    orderID : int
    productID : int 

class UserBase(BaseModel):
    userName: str
    email : str
    firstName: str
    lastName: str
    password : str

    

class UserLogIn(BaseModel):
    userName: str
    password : str


class UserCreate(UserBase):
    pass

class User(UserBase):
    userID : int
    orders : list[Order]
    isAdmin : bool

    class Config:
        from_attributes = True







