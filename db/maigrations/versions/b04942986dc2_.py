"""empty message

Revision ID: b04942986dc2
Revises: 
Create Date: 2023-02-08 00:35:21.701394

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'b04942986dc2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('answer_texts',
    sa.Column('answer_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('answer_text', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('answer_id'),
    comment='取り札テーブル'
    )
    op.create_table('boxes',
    sa.Column('box_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('box_name', sa.String(length=255), nullable=False),
    sa.Column('box_category', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('box_id'),
    comment='お題マスタ'
    )
    op.create_table('question_texts',
    sa.Column('question_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('question_text', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('question_id'),
    comment='読み札テーブル'
    )
    op.create_table('users',
    sa.Column('user_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_name', sa.String(length=255), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('user_intro', sa.Text(), nullable=True),
    sa.Column('created_at', mysql.TIMESTAMP(), server_default=sa.text('current_timestamp'), nullable=False),
    sa.Column('updated_at', mysql.TIMESTAMP(), server_default=sa.text('current_timestamp on update current_timestamp'), nullable=False),
    sa.PrimaryKeyConstraint('user_id'),
    comment='ユーザーマスタ'
    )
    op.create_table('answer_images',
    sa.Column('answer_image_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('answer_id', sa.Integer(), nullable=True),
    sa.Column('answer_file_pass', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['answer_id'], ['answer_texts.answer_id'], ),
    sa.PrimaryKeyConstraint('answer_image_id'),
    comment='取り札画像パス格納テーブル'
    )
    op.create_table('play_records',
    sa.Column('played_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('number_of_question', sa.Integer(), nullable=False),
    sa.Column('number_of_corrected', sa.Integer(), nullable=False),
    sa.Column('played_at', mysql.TIMESTAMP(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
    sa.Column('play_type', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ),
    sa.PrimaryKeyConstraint('played_id'),
    comment='プレイ記録親テーブル'
    )
    op.create_index(op.f('ix_play_records_played_id'), 'play_records', ['played_id'], unique=False)
    op.create_table('question_answer_cards',
    sa.Column('card_id', sa.Integer(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=True),
    sa.Column('answer_id', sa.Integer(), nullable=True),
    sa.Column('card_level', sa.Enum('かんたん', 'ふつう', 'むずかしい'), nullable=True),
    sa.ForeignKeyConstraint(['answer_id'], ['answer_texts.answer_id'], ),
    sa.ForeignKeyConstraint(['question_id'], ['question_texts.question_id'], ),
    sa.PrimaryKeyConstraint('card_id'),
    comment='読み札と取り札を紐づける札テーブル'
    )
    op.create_table('box_card',
    sa.Column('box_id', sa.Integer(), nullable=False),
    sa.Column('card_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['box_id'], ['boxes.box_id'], ),
    sa.ForeignKeyConstraint(['card_id'], ['question_answer_cards.card_id'], ),
    sa.PrimaryKeyConstraint('box_id', 'card_id'),
    comment='お題と札を紐づける中間テーブル'
    )
    op.create_table('play_type_boxes',
    sa.Column('played_id', sa.Integer(), nullable=False),
    sa.Column('box_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['box_id'], ['boxes.box_id'], ),
    sa.ForeignKeyConstraint(['played_id'], ['play_records.played_id'], ),
    sa.PrimaryKeyConstraint('played_id'),
    comment='お題別プレイを選んだ時のお題紐づけ'
    )
    op.create_table('record_details',
    sa.Column('card_id', sa.Integer(), nullable=False),
    sa.Column('played_id', sa.Integer(), nullable=False),
    sa.Column('judgement', sa.Boolean(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['card_id'], ['question_answer_cards.card_id'], ),
    sa.ForeignKeyConstraint(['played_id'], ['play_records.played_id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ),
    sa.PrimaryKeyConstraint('card_id', 'played_id'),
    comment='プレイ記録詳細'
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('record_details')
    op.drop_table('play_type_boxes')
    op.drop_table('box_card')
    op.drop_table('question_answer_cards')
    op.drop_index(op.f('ix_play_records_played_id'), table_name='play_records')
    op.drop_table('play_records')
    op.drop_table('answer_images')
    op.drop_table('users')
    op.drop_table('question_texts')
    op.drop_table('boxes')
    op.drop_table('answer_texts')
    # ### end Alembic commands ###