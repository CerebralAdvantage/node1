FROM node:14.17.5
WORKDIR /app
ENV PORT 3001
#COPY package.json /app/package.json
#RUN npm install
COPY server.js /app
CMD ["node", "server.js"]


