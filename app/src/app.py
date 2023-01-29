from typing import Union
from fastapi import FastAPI
from routers import games, users

app = FastAPI()

app.include_router(games.router)
app.include_router(users.router)