create database DB_LG3_RestauranteIFSP;
use DB_LG3_RestauranteIFSP;

create table usuario (id integer not null auto_increment, 
                      email varchar(255), 
                      first_name varchar(255), 
                      last_name varchar(255), 
                      login varchar(255), 
                      password varchar(255), 
                      perfil_permissao varchar(255), 
                      primary key (id));

insert into usuario (id, email, first_name, last_name, login, password, perfil_permissao) values (1, 'wellison.bertelli@hotmail.com', 'wellison', 'bertelli', 'welbert', 'wb123#', '1');
