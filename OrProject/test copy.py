from sql_app import schemas
from pydantic import BaseModel, PositiveInt
from sql_app import crud
from sql_app.start import init,get_db_tests
from datetime import datetime
import json

init()

db = get_db_tests()

pineappleImage = 'https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcRtI5JE5ZTZopReolaQYf3SHj1PFi9c3y_T3RPxEonQBYtciBdI2R7t-WfIhM43QH5O'

strawBerryImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKoCVxWFm1l5y8ZTg3ERG0FGUW2-LVgHO0OH0ZgR4ynA&s'

vegs = [{
    'name': 'strawBerry',
    'price': 35,
    'isPricePerKilo': True,
    'imageURL': strawBerryImage
},
{
    'name': 'pineapple',
    'price': 10,
    'isPricePerKilo': False,
    'imageURL': pineappleImage
}]

userData = {
           'userName': 'Admin',
           'email': 'Admin@gmail.com',
           'firstName': 'jon',
           'lastName': 'doe',
           'password': '123456',
    }


# for v in vegs:
#     crud.create_product(db,schemas.ProductCreate(**v))

# crud.create_user(db=db, user=schemas.UserCreate(**userData))

# order = crud.get_orders_by_orderId(db=db,orderId=1)
# print(order.orderID)
# print(order.products)
# print(order.products.__len__())
# # print(order.products[0].quantity)
# # print(order.products[0].product.name)

# print(order.products[1].quantity)
# print(order.products[1].productID)
# print(order.products[1].product.name)

# json_string = json.dumps(order.orderID)
# print(json_string)
crud.Make_Admin(db,1)
