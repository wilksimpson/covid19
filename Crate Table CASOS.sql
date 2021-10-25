CREATE TABLE casos_full (
    casos_id SERIAL,
    city varchar(100),
    city_ibge_code varchar(10),
    date_registro varchar(10), --data de coleta dos dados no formato
	epidemiological_week varchar(10),
	estimated_population varchar(20), -- do último dia disponível igual ou anterior à data
	last_available_date varchar(10), -- data da qual o dado se refere.
	taxa_mortalidade varchar(10), -- last_available_death_rate
	order_for_place varchar(20), -- número que identifica a ordem do registro para este local.
	place_type varchar(10), 
	estado varchar(10),
	new_confirmed varchar(20), -- número de novos casos confirmados desde o último dia
	new_deaths varchar(20), -- número de novos óbitos desde o último dia
	Primary Key (casos_id)
);



CREATE TABLE casos_full_temp (
    city varchar(100),
    city_ibge_code varchar(10),
    date_reg varchar(10),
	epidemiological_week varchar(10),
	estimated_population varchar(20),
	estimated_population_2019 varchar(20),
	is_last varchar(10),
	is_repeated varchar(10),
	last_available_confirmed varchar(10),
	last_available_confirmed_per_100k_inhabitants varchar(20),
	last_available_date varchar(10),
	last_available_death_rate varchar(20),
	last_available_deaths varchar(20),
	order_for_place varchar(20),
	place_type varchar(10),
	estado varchar(10),
	new_confirmed varchar(20),
	new_deaths varchar(20)
);


CREATE TABLE CidadeIBGE (
    UFMun varchar(100),
    IBGE varchar(10),
    IBGE7 varchar(10), 
	estado varchar(2),
	municipio varchar(150), 
	regiao varchar(50), -- data da qual o dado se refere.
	populacao varchar(20), -- last_available_death_rate
	porte varchar(20), -- número que identifica a ordem do registro para este local.
	Capital varchar(20)
);

-- apos importar dados de csv diretamente do brasil.io para tabela casos_full_temp, pode-se inserir na tabela formatada casos_full. (usado para primeira população da tabela, pois a api do governo não libera todos os dados via API)
INSERT INTO casos_full (city ,city_ibge_code, date_registro, epidemiological_week, estimated_population , last_available_date, taxa_mortalidade, order_for_place ,place_type , estado, new_confirmed ,new_deaths)
SELECT 					city ,city_ibge_code, date_reg , epidemiological_week, estimated_population, last_available_date, last_available_death_rate, order_for_place, place_type, estado, new_confirmed, new_deaths
FROM casos_full_temp
where is_repeated='False'