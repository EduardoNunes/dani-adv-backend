create database dani_site;

create table usuarios (
  id serial primary key,
  nome varchar (100) not null,
  email varchar (100) not null,
  senha varchar (100) not null,
  cadastro varchar (20) not null
 );

create table processos (
  id serial primary key,
  usuarios_id integer not null references usuarios(id),
  autor text not null,
  reu text not null,
  numero text not null,
  vara text not null,
  juiz text not null,
  comarca text not null,
  data_entrada text not null,
  atualizado text not null,
  infos text not null
  );

CREATE TABLE cliente_dados (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  nascimento VARCHAR(10),
  genero VARCHAR(30),
  nacionalidade VARCHAR(30),
  celular VARCHAR(25) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  redes_sociais VARCHAR(255),
  rg VARCHAR(20) NOT NULL UNIQUE,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  profissao VARCHAR(100),
  estado_civil VARCHAR(30),
  formacao_academica VARCHAR(255),
  cep VARCHAR(10) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  bairro VARCHAR(100) NOT NULL,
  uf CHAR(2) NOT NULL,
  logradouro VARCHAR(255) NOT NULL,
  complemento VARCHAR(255),
  status VARCHAR(15),
  infos TEXT
);

insert into usuarios (nome, email, senha, cadastro) 
values ('Eduardo Lago Nunes', 'eduardolagonunes@gmail.com', '123456', 'cliente');

/* Seleciona todos os processos de um determinado usuário */
SELECT processos.*
FROM processos
JOIN usuarios ON processos.usuarios_id = usuarios.id
WHERE usuarios.id = 5;

/* mostra todos os processos relacionados aos seus clientes */
select * from usuarios join processos on usuarios.id = usuarios_id;

/* adicionar um processo */
insert into processos 
(autor, reu, numero, vara, juiz, comarca, data_entrada, atualizado, infos, usuarios_id) 
values ('Fulano Lordello Oliveira', 
        'Oi telefonia móvel', 
        '000325352320208050002', 
        '15ª VS JE do consumidor', 
        'Rosalvo Augusto', 
        'Salvador Bahia', 
        '01/08/2020', 
        '25/12/2023', 
        'Processo finalizado, transitado em julgado, habilitado na recuperação judicial. Acompanhando.', 
        '7');
