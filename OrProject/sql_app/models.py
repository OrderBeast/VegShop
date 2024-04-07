from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy import types as types
from sqlalchemy.orm import relationship, Mapped
from .database import Base

class Product(Base):
    __tablename__ = "Products"

    productID = Column(types.Integer, primary_key=True) #defines it as a key 
    name = Column(types.String,unique=True) # defines as a unique to prevent 
    price=Column(types.FLOAT)               # 2 products with the same name
    isPricePerKilo = Column(types.Boolean)
    imageURL=Column(types.String)


class ProductOrder(Base):
    __tablename__ = "ProductOrders"
    orderID = Column(ForeignKey("Orders.orderID"), primary_key=True)#defines it as a key 
    productID = Column(ForeignKey("Products.productID"), primary_key=True)#defines it as a key 
    quantity = Column(Integer)
    product : Mapped[Product] = relationship()# defines a relationship


class Order(Base): 
    __tablename__ = "Orders"

    orderID = Column(types.Integer, primary_key=True) #defines it as a key 
    address = Column(types.String)
    creationDate = Column(types.DateTime)
    userID = Column(ForeignKey("users.userID"))
    products : Mapped[list[ProductOrder]]  = relationship()# defines a relationship


class User(Base):
    __tablename__ = "users"

    userID = Column(types.Integer, primary_key=True)
    userName=Column(types.String,unique=True)
    email = Column(types.String,unique=True)
    firstName=Column(types.String)
    lastName=Column(types.String)
    password = Column(String)
    isAdmin=Column(Boolean, default=False)
    orders:Mapped[list[Order]] = relationship() # defines a relationship



