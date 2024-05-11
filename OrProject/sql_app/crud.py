from sqlalchemy.orm import Session
from . import models, schemas
from sqlalchemy import update
from sqlalchemy import delete
import traceback

def create_product(db:Session,product:schemas.ProductCreate): #made in app
    try:
        db_product = models.Product(name = product.name, price =product.price  
                                ,isPricePerKilo = product.isPricePerKilo ,imageURL =product.imageURL)
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product
    except:
        db.rollback()
        return get_product_by_name(db,product.name)

def update_product(db:Session,updateProduct:schemas.updateProduct): #made in app

   try:
    withoutNones = updateProduct.model_dump(exclude_none=True)
    withoutNones.pop('productID')
    id = updateProduct.productID
    stmnt = update(models.Product).where(models.Product.productID == id).values(**withoutNones)
    print(stmnt)
    db.execute(stmnt)
    db.commit()
   except:
    db.rollback()
    print("FAILED TO UPDATE")
    
def update_User(db:Session,updateProduct:schemas.updateUser):#made in app

   try:
    withoutNones = updateProduct.model_dump(exclude_none=True)
    withoutNones.pop('userID')
    id = updateProduct.userID
    stmnt = update(models.User).where(models.User.userID == id).values(**withoutNones)
    print(stmnt)
    db.execute(stmnt)
    db.commit()
   except:
    db.rollback()
    print("FAILED TO UPDATE")

def Make_Admin(db:Session,userId:int):#made in app

   try:
    stmnt = update(models.User).where(models.User.userID == userId).values(isAdmin=True)
    print(stmnt)
    db.execute(stmnt)
    db.commit()
   except:
    db.rollback()
    traceback.print_exc()
    print("FAILED TO UPDATE")
    
def get_all_products(db:Session): #made in app
    return db.query(models.Product).all()

def get_product_by_ID(db: Session, product_id: int): #made in app
    return db.query(models.Product).filter(models.Product.productID == product_id).first()

def get_all_products_names(db:Session): 
    return db.scalars(db.query(models.Product.name)).all()

def get_product_by_name(db: Session, name: str): #made in app
    return db.query(models.Product).filter(models.Product.name == name).first()


def delete_product(db:Session,deleteProduct: schemas.deleteProductByName): 
    stmt = (
        delete(models.Product).
        where (models.Product.name == deleteProduct.productName)
          )
    db.execute(stmt)
    db.commit()
    
def is_product_in_any_order(db:Session, deleteProduct: schemas.deleteProductByName):
    Orders=get_all_orders(db)
    for order in Orders:
        for productOrder in order.products:
         if(productOrder.product.name == deleteProduct.productName):
             return True
    return False

def delete_order(db:Session,deleteOrder:schemas.deleteOrder):
     stmt=(
         delete(models.Order).
         where(models.Order.orderID==deleteOrder.orderid)
     )
     db.execute(stmt)
     db.commit()
    

def create_new_empty_order(db: Session, order: schemas.OrderCreate) -> models.Order: #made in app
    db_order = models.Order(address = order.address,
                            creationDate = order.creationDate,
                            userID = order.userID)
    
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def add_product_to_order(db: Session, addProduct:schemas.AddProduct):
    db_product = models.ProductOrder(productID = addProduct.productID,  orderID = addProduct.orderID,quantity = addProduct.quantity)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)

# def remove_product_to_order(db: Session, removeProductFromOrder:schemas.RemoveProductFromOrder):
#     oid = removeProductFromOrder.orderID
#     pid = removeProductFromOrder.productID
#     statement = models.ProductOrder.delete().where(models.ProductOrder.c.orderID == oid,models.ProductOrder.c.productID == pid)
#     print(statement)
#     db.execute(statement)
#     db.commit()

def get_all_orders(db:Session):#made in app
    return db.query(models.Order).all()

def updateStatus(db:Session,updateStatus:schemas.UpdateStatus):
    order = db.query(models.Order).filter(models.Order.orderID == updateStatus.orderID).first()
    print( updateStatus.status)
    order.orderStatus = updateStatus.status
    db.commit()


def get_orders_by_UserID(db: Session, userID: int):#made in app
    return db.query(models.Order).filter(models.Order.userID == userID).all()



def get_orders_by_orderId(db: Session, orderId: int):#made in app
    return db.query(models.Order).filter(models.Order.orderID == orderId).first()



def create_user(db:Session,user:schemas.UserCreate): #made in app
    db_user = models.User(userName = user.userName,
                           email = user.email,
                           firstName = user.firstName,lastName = user.lastName,
                           password = user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_all_users(db:Session): #made in app
    return db.query(models.User).all()

def get_user_by_id(db:Session,userId: int): #made in app
    return db.query(models.User).filter(models.User.userID == userId).first()

def get_user_by_password_and_username(db:Session,password:str,username:str):
   return db.query(models.User).filter((models.User.userName == username)and (models.User.password == password)).first()

