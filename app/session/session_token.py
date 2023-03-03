from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from models import users as users_model


# セッションIDからリフレッシュトークンを取得、返却
def getRefreshBySession(session_id: str, db: AsyncSession=Depends(get_db)):
    refresh_token = db.query(users_model.Sessions.refresh_token).filter(users_model.Sessions.session_id == session_id).scalar()
    return refresh_token