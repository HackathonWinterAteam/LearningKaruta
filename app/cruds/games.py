from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from models import games as games_model
from schemas import games as games_schema

def read_boxes(db: Session):
    BoxList = db.query(games_model.boxes).all()
    return BoxList


