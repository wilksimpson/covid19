-- Select para demonstrar 

select paciente_sexo as Sexo, paciente_end_uf as UF, paciente_end_nomemunicipio as Municipio, 
		substring(vacina_aplicacao,1,10) as data_aplicao, vacina_dose as dose , COUNT(vacina_dose) vacinas
FROM vaccination 
group by paciente_sexo,paciente_end_uf,paciente_end_nomemunicipio,substring(vacina_aplicacao,1,10),vacina_dose


-- Select para demonstrar casos de covid 
 select city , max(estimated_population) as populacao_estimada, last_available_date as data_vacina, estado,
 		new_confirmed as casos_confirmado, new_deaths numero_mortes 
 from casos_full 
 where place_type ='city' and estado='PA'
 group by city,last_available_date,estado,new_confirmed,new_deaths
 limit 1000
 
 -- select para create view para demonstrar população estimada por estado e municipio
 select max(estimated_population) as populacao_estimada, estado,city_ibge_code, city cidade, substring(date_registro,1,4) as ano
from casos_full
where estimated_population>'0'
group by estado,city_ibge_code,city,substring(date_registro,1,4)
limit 1000

