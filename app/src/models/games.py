# SQLAlchemy関連のインポート文を記述
# 設計したテーブルをここに落とし込む
# FK制約追加する

from sqlalchemy import Column, Integer, String, Text, Enum, ForeignKey #他使用するものすべて
from database import engine, Base
from models.users import #ユーザーモデルのユーザークラスをインポート

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


class box_card(Base):
    __tablename__ = 'box_card'
    __table_args__ = {
        'comment': 'お題マスタと札テーブルの中間テーブル'
    }

    box_id = Column('box_id', ForeignKey=card_boxes.box_id)
    card_id = Column('card_id', ForeignKey=question_answer_cards.card_id)

class answer_images(Base):
    __tablename__ = 'answer_images'
    __table_args__ = {
        'comment': '取り札に画像をつけるためのテーブル'
    }

    answer_image_id = Column('answer_image_id', primary_key=True, index=True)
    answer_id = Column('answer_id', Text, nullable=True, ForeignKey=answer_texts.answer_id)

class play_records(Base):
    __tablename__ = 'play_records'
    __table_args__ = {
        'comment': 'プレイ記録親テーブル'
    }

    played_id = Column('played_id', primary_key=True, index=True)
    user_id = Column('user_id', nullable=False, ForeignKey=) #インポートしてきたユーザークラスのユーザーIDを入れる
    number_of_question = Column('number_of_question', Integer, nullable=False)
    number_of_corrected = Column('number_of_corrected', Integer, nullable=False)
    played_at = Column('played_at', nullable=False) #TIMESTAMPを定義
    play_type = Column('play_type', Text, nullable=False)