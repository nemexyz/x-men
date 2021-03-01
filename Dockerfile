FROM node:lts
RUN mkdir -p /var/www/api
WORKDIR /var/www/api
COPY ./src ./src
COPY .env .
COPY package.json .
RUN ls
RUN yarn install --production
CMD yarn start