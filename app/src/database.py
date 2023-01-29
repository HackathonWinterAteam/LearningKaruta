# DB接続設定（SQLAlchemyの設定）

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

path = ''
 
# Engine の作成 echoは要確認
engine = create_engine(
    DATABASE,
    encoding='utf-8',
    echo=True
)

# DBセッション生成
SessionLocal = scoped_session(
    sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine
    )
)


Base = declarative_base()
Base.query = SessionLocal.query_property()

# Dependency Injection用？
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()