create database banco_solar;
create table usuarios( id serial PRIMARY KEY, nombre varchar (50), balance float check(balance >= 0));
create table transferencias(id serial PRIMARY KEY, emisor int, receptor int,
monto float, fecha timestamp, FOREIGN key (emisor) references usuarios(id), FOREIGN key (receptor) REFERENCES usuarios(id));