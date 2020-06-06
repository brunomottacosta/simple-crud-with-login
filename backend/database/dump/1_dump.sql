create database if not exists backend;

use backend;

-- create tables

create table users
(
    id       bigint       not null auto_increment primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    role     varchar(10)  not null,
    enabled  boolean default false
);

create table clients
(
    id             bigint       not null auto_increment primary key,
    name           varchar(100) not null,
    document       varchar(11)  not null,
    cep            varchar(8)   not null,
    street         varchar(255) not null,
    complement     varchar(255),
    neighborhood   varchar(255) not null,
    city           varchar(255) not null,
    uf             varchar(2)   not null,
    createdBy      varchar(255),
    createdAt      timestamp,
    lastModifiedBy varchar(255),
    lastModifiedAt timestamp
);

create table phones
(
    id bigint       not null auto_increment primary key,
    number varchar(11) not null,
    type  varchar(50) not null,
    clientId bigint not null,
    constraint fkPhonesClient foreign key (clientId) references clients(id)
);

create table emails
(
    id bigint       not null auto_increment primary key,
    email varchar(50) not null,
    clientId bigint not null,
    constraint fkEmailsClient foreign key (clientId) references clients(id)
);
