# SQLAlchemy関連のインポート文を記述
# 設計したテーブルをここに落とし込む

from sqlalchemy import Column, Integer, String, #他使用するものすべて

from database import engine, Base

#テーブル作成
class card_boxes(Base)