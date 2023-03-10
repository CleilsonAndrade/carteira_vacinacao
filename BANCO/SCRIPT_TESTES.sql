select * from carteira;
select * from cnes;
select * from enfermeiro;
select * from paciente;
select * from vacina;

delete from cnes;
delete from vacina;
delete from carteira;

-- cnes
INSERT INTO cnes (numero_cnes, nome_cnes) 
VALUES ( 30, 'AMA Jardim Mirna');

-- enfermeiro
INSERT INTO enfermeiro (coren_enfermeiro, nome_enfermeiro, senha_enfermeiro, numero_cnes) 
VALUES ( 40, 'Maria', md5('Meteoro@10'), 30);

-- carteira
INSERT INTO carteira (numero_paciente, coren_enfermeiro, id_vacina, numero_cnes, data_aplicacao) 
VALUES ( 10, 20, 6, 30, '2022-02-12');

-- vacinas
insert into vacina (lote_vacina, nome_vacina, descricao_vacina, faixa_etaria) 
values ('LOTE001', 'Criança', 'Descr Criança', 'crianca');

insert into vacina (lote_vacina, nome_vacina, descricao_vacina, faixa_etaria) 
values ('LOTE002', 'Adolescente', 'Descr Adolescente', 'adolescente');

insert into vacina (lote_vacina, nome_vacina, descricao_vacina, faixa_etaria) 
values ('LOTE003', 'Adulto', 'Descr Adulto', 'adulto');

insert into vacina (lote_vacina, nome_vacina, descricao_vacina, faixa_etaria) 
values ('LOTE004', 'Idoso', 'Descr Idoso', 'idoso');

insert into vacina (lote_vacina, nome_vacina, descricao_vacina, faixa_etaria) 
values ('LOTE005', 'Todos', 'Descr Todos', 'todos');


SELECT COUNT(carteira.data_aplicacao > 0) as Quantidade_Total_Carteiras from carteira;


-- TESTE
select 
vacina.nome_vacina, vacina.lote_vacina, DATE_FORMAT(carteirinha.data_aplicacao,'%d/%m/%Y') as data_aplicacao, carteirinha.cofren_enfermeiro, cnes.nome_cnes, vacina.descricao_vacina
from vacina
inner join carteirinha on vacina.id_vacina = carteirinha.id_vacina
inner join cnes on carteirinha.numero_cnes = cnes.numero_cnes
and carteirinha.numero_paciente = 10
union
select 
vacina.nome_vacina, vacina.lote_vacina, null, null, null, vacina.descricao_vacina
from vacina, carteirinha
inner join paciente on carteirinha.numero_paciente = paciente.numero_paciente
inner join cnes on carteirinha.numero_cnes = cnes.numero_cnes
WHERE 
vacina.faixa_etaria = paciente.faixa_etaria 
and NOT EXISTS (select carteirinha.id_vacina from carteirinha 
where carteirinha.id_vacina = vacina.id_vacina
and 
carteirinha.numero_paciente = 10)
union
select vacina.nome_vacina, vacina.lote_vacina, null, null, null, vacina.descricao_vacina from vacina;