  create database dani_site;

create table usuarios (
  id serial primary key,
  nome varchar (100) not null,
  email varchar (100) not null UNIQUE,
  senha varchar (100) not null,
  tipo_cadastro varchar (20) not null
 );

create table processos (
  id serial primary key,
  cliente_id integer not null references cliente_dados(id),
  contratante text not null,
  autor text not null,
  reu text not null,
  numero text not null,
  tipo_acao text not null,
  vara text not null,
  juiz text not null,
  comarca text not null,
  data_entrada text not null,
  atualizado text not null,
  status VARCHAR not null,
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
  senha VARCHAR(255) NOT NULL,
  tipo_cadastro VARCHAR(15) NOT NULL,
  infos TEXT
);

create table financeiro (
  id serial primary key,
  processos_id integer not null references processos(id),
  entrada VARCHAR (255),
  data_entrada VARCHAR (255),
  quantidade_parcelas VARCHAR (255),
  valor_parcelas VARCHAR (255),
  datas_parcelas VARCHAR (255), 
  porcentagem_final VARCHAR (255),
  data_porcentagem_final VARCHAR (255),
  condenacao VARCHAR (255),
  resultado_porcentagem VARCHAR (255),
  total VARCHAR (255)
);

/* Conta quantos processos existem na tabela processos para cada cliente da tabela clientes_dados */
SELECT
    cliente_dados.id AS cliente_id,
    cliente_dados.nome AS cliente_nome,
    COUNT(processos.id) AS quantidade_de_processos
FROM
    cliente_dados
LEFT JOIN
    processos ON cliente_dados.id = processos.cliente_id
GROUP BY
    cliente_dados.id, cliente_dados.nome;

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

/* Definir o status da tabela processo baseado na coluna datas_parcelas da tabela financeiro */

UPDATE processos
SET status = 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM financeiro 
            WHERE datas_parcelas LIKE '%:Vencida%' 
                AND financeiro.processos_id = processos.id
        ) THEN 'Atrasado'
        WHEN NOT EXISTS (
            SELECT 1 FROM financeiro 
            WHERE datas_parcelas LIKE '%:Vencida%' 
                AND financeiro.processos_id = processos.id
        ) AND NOT EXISTS (
            SELECT 1 FROM financeiro 
            WHERE datas_parcelas LIKE '%:Pendente%' 
                AND financeiro.processos_id = processos.id
        ) THEN 'Quitado'
        ELSE 'Em dia'
    END;
