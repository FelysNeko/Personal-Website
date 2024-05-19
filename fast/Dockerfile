FROM python:3.12-slim

COPY . /fast/

WORKDIR /fast/

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN [ "pip3", "install", "--no-cache-dir", "-r", "requirements.txt" ]

EXPOSE 8000

CMD [ "fastapi", "run", "--port", "8000"]