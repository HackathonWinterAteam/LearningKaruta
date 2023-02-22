from sqlalchemy import Column, Integer, Text, String, Enum, ForeignKey, Boolean, CHAR #他使用するものすべて
from database import Base
from models.users import Users
from sqlalchemy.dialects.mysql import TIMESTAMP as Timestamp
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.orm import relationship

#テーブル作成

class boxes(Base):
    __tablename__ = 'boxes'
    __table_args__ = {
        'comment': 'お題マスタ'
    }

    box_id = Column('box_id', Integer, primary_key=True, autoincrement=True)
    box_name = Column('box_name', String(255), nullable=False)
    box_category = Column('box_category', String(255), nullable=False)


class question_texts(Base):
    __tablename__ = 'question_texts'
    __table_args__ = {
        'comment': '読み札テーブル'
    }

    question_id = Column('question_id', Integer, primary_key=True, autoincrement=True)
    question_text = Column('question_text', Text, nullable=False)


class answer_texts(Base):
    __tablename__ = 'answer_texts'
    __table_args__ = {
        'comment': '取り札テーブル'
    }

    answer_id = Column('answer_id', Integer, primary_key=True, autoincrement=True)
    answer_text = Column('answer_text', Text, nullable=False)

class answer_images(Base):
    __tablename__ = 'answer_images'
    __table_args__ = {
        'comment': '取り札画像パス格納テーブル'
    }

    answer_image_id = Column('answer_image_id', Integer, primary_key=True, autoincrement=True)
    answer_id = Column('answer_id', Integer, ForeignKey(answer_texts.answer_id))
    answer_file_pass = Column('answer_file_pass', Text, nullable=True)

# 札レベルで使用するENUM型の定義
'''
class CardLevel(str, Enum):
    easy = "かんたん"
    nomal = "ふつう"
    hard = "むずかしい"
'''

class question_answer_cards(Base):
    __tablename__ = 'question_answer_cards'
    __table_args__ = {
        'comment': '読み札と取り札を紐づける札テーブル'
    }

    card_id = Column('card_id',Integer, primary_key=True)
    question_id = Column('question_id', Integer, ForeignKey(question_texts.question_id))
    answer_id = Column('answer_id', Integer, ForeignKey(answer_texts.answer_id))
    card_level = Column('card_level', Enum("かんたん", "ふつう", "むずかしい"), nullable=True)


class boxes_cards(Base):
    __tablename__ = 'box_card'
    __table_args__ = {
        'comment': 'お題と札を紐づけるテーブル'
    }

    box_id = Column('box_id',Integer, ForeignKey(boxes.box_id), primary_key=True)
    card_id = Column('card_id',Integer, ForeignKey(question_answer_cards.card_id), primary_key=True)


class play_records(Base):
    __tablename__ = 'play_records'
    __table_args__ = {
        'comment': 'プレイ記録親テーブル'
    }

    played_id = Column('played_id',Integer, primary_key=True, index=True)
    user_id = Column('user_id', String(36), ForeignKey(Users.user_id), nullable=False,) #インポートしてきたユーザークラスのユーザーIDを入れる
    number_of_question = Column('number_of_question', Integer, nullable=False)
    number_of_corrected = Column('number_of_corrected', Integer, nullable=False)
    played_at = Column('played_at', Timestamp, server_default=current_timestamp(), nullable=False) #TIMESTAMPを定義
    play_type = Column('play_type', String(255), nullable=False)



class record_details(Base):
    __tablename__ = 'record_details'
    __table_args__ = {
        'comment': 'プレイ記録詳細'
    }

    card_id = Column('card_id', Integer, ForeignKey(question_answer_cards.card_id), primary_key=True)
    played_id = Column('played_id', Integer, ForeignKey(play_records.played_id, ondelete="CASCADE"), primary_key=True)
    judgement = Column('judgement', Boolean, nullable=False)
    user_id = Column('user_id', String(36), ForeignKey(Users.user_id))


class play_type_boxes(Base):
    __tablename__ = 'play_type_boxes'
    __table_args__ = {
        'comment': 'お題別プレイを選んだ時のお題紐づけ'
    }
    played_id = Column('played_id', Integer, ForeignKey(play_records.played_id), primary_key=True)
    box_id = Column('box_id', Integer, ForeignKey(boxes.box_id), nullable=False)