# SQLAlchemy関連のインポート文を記述
# 設計したテーブルをここに落とし込む

from sqlalchemy import Column, Integer, String, Text, Enum, ForeignKey #他使用するものすべて

from database import engine, Base

#テーブル作成
class card_boxes(Base):
    __tablename__ = 'card_boxes'
    __table_args__ = {
        'comment': 'お題マスタ'
    }

    box_id = Column('box_id', , primary_key=True, index=True)
    box_name = Column('box_name', Text, nullable=False)
    box_category = Column('box_category', Text, nullable=False)


class question_texts(Base):
    __tablename__ = 'question_texts'
    __table_args__ = {
        'comment': '読み札テーブル'
    }

    question_id = Column('question_id', primary_key=True, index=True)
    question_text = Column('question_text', Text, nullable=False)


class answer_texts(Base):
    __tablename__ = 'answer_texts'
    __table_args__ = {
        'comment': '取り札テーブル'
    }

    answer_id = Column('answer_id', primary_key=True, index=True)
    answer_text = Column('answer_text', Text, nullable=False)


class question_answer_cards(Base):
    __tablename__ = 'question_answer_cards'
    __table_args__ = {
        'comment': '読み札と取り札を紐づける札テーブル'
    }

    card_id = Column('card_id', primary_key=True, index=True)
    question_id = Column('question_id', ForeignKey=question_texts.question_id)
    answer_id = Column('answer_id', ForeignKey=answer_texts.answer_id)
    card_level = Column('card_level', Enum, nullable=True)
