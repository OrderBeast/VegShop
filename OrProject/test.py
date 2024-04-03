from sql_app import schemas
from pydantic import BaseModel, PositiveInt
from sql_app import crud
from sql_app.start import init,get_db_tests
from datetime import datetime
import json

init()

db = get_db_tests()
userData = {
           'userName': 'killer2',
           'email': 'temp',
           'firstName': 'jon',
           'lastName': 'doe',
           'password': '123456',
    }





#Or=crud.create_user(db,schemas.UserCreate(**userData))
# names=crud.get_all_products_names(db)
# print(names)
# order=crud.create_new_empty_order(db,schemas.OrderCreate(**orderTemp))
# crud.add_product_to_order(db,schemas.AddProduct(orderID=3,productID=1))
# print(vars(order))
# crud.delete_order(db,schemas.deleteOrder(orderid=order.orderID))

# banana = crud.get_product_by_name(db,"banana")
# apple = crud.get_product_by_name(db,"apple")

# if(apple != None):
#     crud.delete_product(db,schemas.deleteProduct(productid=apple.productID))

# if(banana != None):
#     crud.delete_product(db,schemas.deleteProduct(productid=banana.productID))

# banana=crud.create_product(db,schemas.ProductCreate(name='banana',
#                                                         price='9',
#                                                         isPricePerKilo='true',
#                                                         imageURL='asd3'))


# crud.update_product(db, schemas.updateProduct(productID=banana.productID,name="apple"))
# print(banana.name)





# users = crud.get_all_users(db)
# for u in users:
#     print(vars(u))




# newOrder = crud.create_new_empty_order(db,schemas.OrderCreate(**orderTemp))
# crud.add_product_to_order(db,schemas.AddProduct(productID=1,orderID=newOrder.orderID))
# orders = crud.get_orders_by_UserID(db,3)

# for o in orders:
#     print(vars(o))

# allOrders = crud.get_all_orders(db)
# for o1 in allOrders:
#     print(vars(o1))



# strawBerry=crud.create_product(db,schemas.ProductCreate(name='strawBerry',
#                                                         price='35',
#                                                         isPricePerKilo='true',
#                                                         imageURL='data:image/jpeg;base64,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'))
# pineapple=crud.create_product(db,schemas.ProductCreate(name='pineapple',
#                                                         price='10',
#                                                         isPricePerKilo='false',
#                                                         imageURL='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/%E0%B4%95%E0%B5%88%E0%B4%A4%E0%B4%AF%E0%B5%81%E0%B4%82_%E0%B4%9A%E0%B4%95%E0%B5%8D%E0%B4%95%E0%B4%AF%E0%B5%81%E0%B4%82.jpg/250px-%E0%B4%95%E0%B5%88%E0%B4%A4%E0%B4%AF%E0%B5%81%E0%B4%82_%E0%B4%9A%E0%B4%95%E0%B5%8D%E0%B4%95%E0%B4%AF%E0%B5%81%E0%B4%82.jpg'))
# banana=crud.create_product(db,schemas.ProductCreate(name='banana',
#                                                         price='9',
#                                                         isPricePerKilo='true',

order = crud.get_orders_by_orderId(db=db,orderId=6)

json_string = json.dumps(order.products[0].quantity)
print(json_string)