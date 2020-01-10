FROM node:latest

RUN cd / && \
    git clone https://github.com/vedsted/DataScienceProject.git && \
    cp -r /DataScienceProject/webserver /webserver && \
    rm -rf DataScienceProject && \
    cd webserver && \
    npm install && \
    tsc

EXPOSE 3000/tcp

WORKDIR /webserver
ENTRYPOINT [ "node ./build/app.js" ]