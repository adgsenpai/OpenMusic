FROM python:3.10.1-buster

COPY . .

RUN pip install -r requirements.txt

EXPOSE 3000

ENTRYPOINT [ "python" ]

CMD [ "server.py" ]