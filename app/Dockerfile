FROM python:3.10-buster

WORKDIR /app

COPY ./app/requirements.txt .
COPY ./app/src ./app
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt\
		&& ls

CMD ["uvicorn", "app:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]
