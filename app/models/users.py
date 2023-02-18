# SQLAlchemy関連のインポート文を記述
# 設計したテーブルをここに落とし込む

# テスト用テーブル
from database import Base
from sqlalchemy import Column, String, Text, Integer
# from sqlalchemy_utils import UUIDType
# from uuid import uuid4
from .mixins import TimestampMixin


class Users(Base, TimestampMixin):
    __tablename__ = 'users'
    __table_args__ = {
        'comment': 'ユーザーマスタ'
    }

    user_id = Column('user_id', Integer, primary_key=True, nullable=False, autoincrement=True)
    user_name = Column('user_name', String(255), nullable=False)
    email = Column('email', String(255), nullable=False)
    password = Column('password', String(255), nullable=False)
    user_intro = Column('user_intro', Text, nullable=True)
    reflesh_token = Column('reflesh_token', String(65535), nullable=True)
