import uuid
from database import Base
from sqlalchemy import Column, String, Text
from .mixins import TimestampMixin



class Users(Base, TimestampMixin):
    __tablename__ = 'users'
    __table_args__ = {
        'comment': 'ユーザーマスタ'
    }

    user_id = Column('user_id', String(36), primary_key=True, default=str(uuid.uuid4()), nullable=False, unique=True)
    user_name = Column('user_name', String(255), nullable=False)
    email = Column('email', String(255), nullable=False)
    password = Column('password', String(255), nullable=False)
    user_intro = Column('user_intro', Text, nullable=True)
    refresh_token = Column('refresh_token', String(65535), nullable=True)

class Sessions(Base):
    __tablename__ = 'sessions'
    __table_args__ = {
        'comment': 'セッション管理'
    }

    session_id = Column('session_id', String(36), primary_key=True, default=str(uuid.uuid4()), unique=True)
    refresh_token = Column('refresh_token', String(65535), nullable=True)