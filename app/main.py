from typing import Union
from fastapi import FastAPI
from routers import games, users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(games.router)
app.include_router(users.router)


# CORS設定
# デプロイ時はURLを書き足していく
origins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001'
    'http://www.cmd-karuta.xyz/*'
    'https://www.cmd-karuta.xyz/*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
