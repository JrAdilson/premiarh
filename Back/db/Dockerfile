FROM postgres:latest

COPY init.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=12345
ENV POSTGRES_DB=premiarh

EXPOSE 5432