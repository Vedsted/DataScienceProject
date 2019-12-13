FROM csbc92/spark-base

ADD execute-example.sh /app/execute-example.sh
RUN chmod +x /app/execute-example.sh
ADD app.py /app/app.py

CMD [ "/app/execute-example.sh"]