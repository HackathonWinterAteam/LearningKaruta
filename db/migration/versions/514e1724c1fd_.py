"""empty message

Revision ID: 514e1724c1fd
Revises: 2425fb2e1891
Create Date: 2023-02-26 22:13:39.414516

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '514e1724c1fd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('sessions',
    sa.Column('session_id', sa.CHAR(length=36), nullable=False),
    sa.Column('refresh_token', sa.String(length=65535), nullable=True),
    sa.PrimaryKeyConstraint('session_id'),
    comment='セッション管理テーブル'
    )


def downgrade() -> None:
    pass
