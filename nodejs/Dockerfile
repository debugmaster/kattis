FROM node:10

COPY input /data/input
COPY output /data/output
COPY nodejs /data/nodejs

WORKDIR /data/nodejs

RUN npm install && npm run build && npm run test
