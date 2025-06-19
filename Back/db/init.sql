create table participants (
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    cpf varchar(11) not null unique,
    shirt_size varchar(3) not null,
    shoe_size integer not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp,
    deleted_at timestamp with time zone
);