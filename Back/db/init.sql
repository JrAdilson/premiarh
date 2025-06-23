create table employees (
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    cpf varchar(11) not null unique,
    shirt_size varchar(3) not null,
    shoe_size integer not null,
    created_at timestamp without time zone default (current_timestamp at time zone 'America/Sao_Paulo'),
    updated_at timestamp without time zone default (current_timestamp at time zone 'America/Sao_Paulo'),
    deleted_at timestamp without time zone
);