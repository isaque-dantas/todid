FROM node:22.3.0-alpine3.20

WORKDIR /src

RUN npm install
RUN npm install -g @angular/cli

COPY . /usr/src/app

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
