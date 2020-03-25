# # Stage 0 - Dev
# FROM node:latest
# WORKDIR /app
# COPY . .

# ENV PORT=80
# ENV REACT_APP_BACKEND_URI=https://chronicles-of-arheterica.herokuapp.com/

# RUN yarn

# CMD ["yarn", "start"]


## Stage 1
# FROM node:latest as react-build
# WORKDIR /app
# COPY . .

# ENV PORT=80
# ENV REACT_APP_BACKEND_URI=https://chronicles-of-arheterica.herokuapp.com/

# RUN yarn
# RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine

# COPY --from=react-build /app/build /usr/share/nginx/html
COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 3000

CMD ["nginx", "-g", "daemon off;"]
