FROM node:16
WORKDIR /admin_gd_client
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]