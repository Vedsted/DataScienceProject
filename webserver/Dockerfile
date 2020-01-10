FROM node:latest

EXPOSE 3000/tcp

RUN cd / && \
    git clone https://github.com/vedsted/DataScienceProject.git && \
    cp -r /DataScienceProject/webserver /webserver && \
    rm -rf DataScienceProject && \
    cd webserver && \
    npm install

#WORKDIR /webserver
ADD ./start.sh /start.sh
RUN chmod +x /start.sh

#ENTRYPOINT [ "/usr/local/bin/npm run prod --prefix /webserver" ]
#ENTRYPOINT [ "/usr/local/bin/npm", "run prod --prefix /webserver" ]
ENTRYPOINT [ "/bin/bash" ]
CMD [ "/start.sh" ]
#CMD [ "/usr/local/bin/npm run -h" ]
#CMD [ "" ]