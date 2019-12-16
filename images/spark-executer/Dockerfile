FROM csbc92/spark-base

ADD submit-job.sh /app/submit-job.sh
RUN chmod +x /app/submit-job.sh

ENTRYPOINT [ "/app/submit-job.sh"]