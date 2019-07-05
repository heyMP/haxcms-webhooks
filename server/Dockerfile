FROM node:10

WORKDIR /home/node/app
COPY --chown=node:node package.json package-lock*.json ./
RUN npm install --production

COPY --chown=node:node . .

USER node

CMD [ "node", "index.js" ]