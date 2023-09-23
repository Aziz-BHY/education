FROM node:18-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 80
COPY ./substitute_environment_variables.sh ./substitute_environment_variables.sh
RUN chmod +x ./substitute_environment_variables.sh
ENTRYPOINT ["./substitute_environment_variables.sh"]