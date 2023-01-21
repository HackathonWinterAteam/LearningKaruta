FROM python:3.10-buster
ENV PATH=/app/.venv/bin:$PATH

WORKDIR /app

RUN pip install poetry

COPY ./app/poetry.lock /app
COPY ./app/pyproject.toml /app

RUN poetry install --no-root

COPY ./app/src /app

CMD ["poetry", "run", "uvicorn", "app:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
