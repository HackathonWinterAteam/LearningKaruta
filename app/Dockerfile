FROM python:3.10-buster
ENV PATH=/app/.venv/bin:$PATH

WORKDIR /app/fastapi

RUN pip install poetry

COPY ./app/poetry.lock ./
COPY ./app/pyproject.toml ./

RUN poetry install --no-root

WORKDIR /app/fastapi/src

CMD ["poetry", "run", "uvicorn", "app:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
