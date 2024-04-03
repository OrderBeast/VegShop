from sql_app import crud, models, schemas
from sql_app.database import SessionLocal, engine

def init():
    models.Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_db_tests():
    db = SessionLocal()
    return db