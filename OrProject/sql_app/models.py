from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy import types as types
from sqlalchemy.orm import relationship, Mapped
from .database import Base

class Product(Base):
    __tablename__ = "Products"

    productID = Column(types.Integer, primary_key=True)
    name = Column(types.String,unique=True)
    price=Column(types.FLOAT)
    isPricePerKilo = Column(types.Boolean)
    imageURL=Column(types.String)


class ProductOrder(Base):
    __tablename__ = "ProductOrders"
    orderID = Column(ForeignKey("Orders.orderID"), primary_key=True)
    productID = Column(ForeignKey("Products.productID"), primary_key=True)
    quantity = Column(Integer)
    product : Mapped[Product] = relationship()


class Order(Base):
    __tablename__ = "Orders"

    orderID = Column(types.Integer, primary_key=True)
    address = Column(types.String)
    creationDate = Column(types.DateTime)
    userID = Column(ForeignKey("users.userID"))
    orderStatus=Column(types.String,default="pending")
    products : Mapped[list[ProductOrder]]  = relationship()

class User(Base):
    __tablename__ = "users"

    userID = Column(types.Integer, primary_key=True)
    userName=Column(types.String,unique=True)
    email = Column(types.String,unique=True)
    firstName=Column(types.String)
    lastName=Column(types.String)
    password = Column(String)
    isAdmin=Column(Boolean, default=False)
    orders:Mapped[list[Order]] = relationship()


