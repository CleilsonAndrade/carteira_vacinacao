-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema card_vaccination_db
-- -----------------------------------------------------
-- Desgin by CleilsonAndrade

-- -----------------------------------------------------
-- Schema card_vaccination_db
--
-- Desgin by CleilsonAndrade
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `card_vaccination_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `card_vaccination_db` ;

-- -----------------------------------------------------
-- Table `card_vaccination_db`.`cnes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_vaccination_db`.`cnes` (
  `id_cnes` INT NOT NULL AUTO_INCREMENT,
  `numero_cnes` INT NOT NULL,
  `nome_cnes` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_cnes`, `numero_cnes`),
  UNIQUE INDEX `numero_cnes_UNIQUE` (`numero_cnes` ASC) VISIBLE,
  UNIQUE INDEX `id_cnes_UNIQUE` (`id_cnes` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = 'Table of CNES (Centro Nacional de Estudos Espaciais)';


-- -----------------------------------------------------
-- Table `card_vaccination_db`.`enfermeiro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_vaccination_db`.`enfermeiro` (
  `id_enfermeiro` INT NOT NULL AUTO_INCREMENT,
  `coren_enfermeiro` INT NOT NULL,
  `nome_enfermeiro` VARCHAR(50) NOT NULL,
  `senha_enfermeiro` VARCHAR(45) NOT NULL,
  `numero_cnes` INT NOT NULL,
  PRIMARY KEY (`id_enfermeiro`, `coren_enfermeiro`, `numero_cnes`),
  UNIQUE INDEX `id_medico_UNIQUE` (`id_enfermeiro` ASC) VISIBLE,
  UNIQUE INDEX `coren_enfermeiro_UNIQUE` (`coren_enfermeiro` ASC) VISIBLE,
  INDEX `fk_enfermeiro_cnes1_idx` (`numero_cnes` ASC) VISIBLE,
  CONSTRAINT `fk_enfermeiro_cnes1`
    FOREIGN KEY (`numero_cnes`)
    REFERENCES `card_vaccination_db`.`cnes` (`numero_cnes`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3
COMMENT = 'Table of Enfermeiro';


-- -----------------------------------------------------
-- Table `card_vaccination_db`.`vacina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_vaccination_db`.`vacina` (
  `id_vacina` INT NOT NULL AUTO_INCREMENT,
  `lote_vacina` VARCHAR(20) NOT NULL,
  `nome_vacina` VARCHAR(45) NOT NULL,
  `descricao_vacina` VARCHAR(400) NOT NULL,
  `faixa_etaria` ENUM('crianca', 'adolescente', 'idoso', 'adulto', 'todos') NOT NULL,
  PRIMARY KEY (`id_vacina`, `lote_vacina`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3
COMMENT = 'Table of Vacina';


-- -----------------------------------------------------
-- Table `card_vaccination_db`.`paciente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_vaccination_db`.`paciente` (
  `id_paciente` INT NOT NULL AUTO_INCREMENT,
  `numero_paciente` INT NOT NULL,
  `nome_paciente` VARCHAR(45) NOT NULL,
  `nascimento` DATE NOT NULL,
  `faixa_etaria` ENUM('crianca', 'adolescente', 'adulto', 'idoso') NOT NULL,
  `sexo` ENUM('M', 'F') NOT NULL,
  `login_paciente` VARCHAR(50) CHARACTER SET 'utf8mb3' NOT NULL,
  `senha_paciente` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_paciente`, `numero_paciente`),
  UNIQUE INDEX `id_usuario_UNIQUE` (`numero_paciente` ASC) VISIBLE,
  UNIQUE INDEX `nome_usuario_UNIQUE` (`login_paciente` ASC) VISIBLE,
  UNIQUE INDEX `id_paciente_UNIQUE` (`id_paciente` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3
COMMENT = 'Table of Paciente';


-- -----------------------------------------------------
-- Table `card_vaccination_db`.`carteira`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_vaccination_db`.`carteira` (
  `numero_paciente` INT NOT NULL,
  `coren_enfermeiro` INT NOT NULL,
  `numero_cnes` INT NOT NULL,
  `id_vacina` INT NOT NULL,
  `data_aplicacao` DATE NOT NULL,
  PRIMARY KEY (`numero_paciente`, `coren_enfermeiro`, `numero_cnes`, `id_vacina`),
  INDEX `fk_paciente_has_medico_paciente1_idx` (`numero_paciente` ASC) VISIBLE,
  INDEX `fk_carteira_medico1_idx` (`coren_enfermeiro` ASC) VISIBLE,
  INDEX `fk_carteira_cnes1_idx` (`numero_cnes` ASC) VISIBLE,
  INDEX `fk_carteira_vacina1_idx` (`id_vacina` ASC) VISIBLE,
  CONSTRAINT `fk_carteira_cnes1`
    FOREIGN KEY (`numero_cnes`)
    REFERENCES `card_vaccination_db`.`cnes` (`numero_cnes`),
  CONSTRAINT `fk_carteira_medico1`
    FOREIGN KEY (`coren_enfermeiro`)
    REFERENCES `card_vaccination_db`.`enfermeiro` (`coren_enfermeiro`),
  CONSTRAINT `fk_carteira_vacina1`
    FOREIGN KEY (`id_vacina`)
    REFERENCES `card_vaccination_db`.`vacina` (`id_vacina`),
  CONSTRAINT `fk_paciente_has_medico_paciente1`
    FOREIGN KEY (`numero_paciente`)
    REFERENCES `card_vaccination_db`.`paciente` (`numero_paciente`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3
COMMENT = 'Table of Carteira';

USE `card_vaccination_db` ;

-- -----------------------------------------------------
-- procedure sp_cadastrarCarteira
-- -----------------------------------------------------

DELIMITER $$
USE `card_vaccination_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cadastrarCarteira`(
  IN paciente_numero INT,
  IN coren_enfermeiro INT,
  IN numero_cnes INT,
  IN id_vacina INT,
  IN data_aplicacao DATE)
BEGIN

INSERT INTO carteira (numero_paciente, coren_enfermeiro, id_vacina, numero_cnes, data_aplicacao) 
VALUES ( paciente_numero, coren_enfermeiro, id_vacina, numero_cnes, data_aplicacao);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_cadastrarEnfermeiro
-- -----------------------------------------------------

DELIMITER $$
USE `card_vaccination_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cadastrarEnfermeiro`(
IN numero_cnes INT,
IN nome_cnes VARCHAR(50),
IN coren_enfermeiro INT,
IN nome_enfermeiro VARCHAR(50),
IN senha_enfermeiro VARCHAR(45) )
BEGIN

INSERT INTO cnes(numero_cnes, nome_cnes) 
VALUES(numero_cnes, nome_cnes);

INSERT INTO enfermeiro(coren_enfermeiro, nome_enfermeiro, senha_enfermeiro, numero_cnes)
VALUES (coren_enfermeiro, nome_enfermeiro, MD5(senha_enfermeiro), numero_cnes);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_cadastrarPaciente
-- -----------------------------------------------------

DELIMITER $$
USE `card_vaccination_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cadastrarPaciente`(
IN paciente_numero INT,
IN paciente_nome VARCHAR(50),
IN paciente_nascimento DATE,
IN sexo_paciente ENUM('M','F'),
IN login VARCHAR(50),
IN senha VARCHAR(50) )
BEGIN
SET @idade = TIMESTAMPDIFF(YEAR, paciente_nascimento, CURDATE());
IF (@idade >= 0 AND @idade <= 11)
THEN
SET @faixa_etaria = 'crianca';
ELSEIF(@idade >= 12 AND @idade <= 17)
THEN
SET @faixa_etaria = 'adolescente';
ELSEIF(@idade >= 18 AND @idade <= 50)
THEN
SET @faixa_etaria = 'adulto';
ELSEIF (@idade > 50)
THEN
SET @faixa_etaria = 'idoso';
END IF;

INSERT INTO paciente(numero_paciente, nome_paciente, nascimento, faixa_etaria, sexo, login_paciente, senha_paciente) 
VALUES (paciente_numero, paciente_nome, paciente_nascimento, @faixa_etaria, sexo_paciente, login, MD5(senha));

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_consultarCarteira
-- -----------------------------------------------------

DELIMITER $$
USE `card_vaccination_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_consultarCarteira`(
	IN acao_paciente enum('selectPacienteDados', 'selectCarteiraDados'),
	IN num_paciente INT,
	IN nascimento DATE,
	IN login VARCHAR(50),
	IN senha VARCHAR(50)
)
BEGIN IF(acao_paciente = 'selectPacienteDados') THEN
SELECT numero_paciente,
	nome_paciente,
	TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) as idade,
	sexo
FROM paciente
WHERE numero_paciente = num_paciente and 
(paciente.login_paciente = login and paciente.senha_paciente = md5(senha));

ELSEIF(acao_paciente = 'selectCarteiraDados') THEN begin
DECLARE contador INT DEFAULT 0;
SELECT (COUNT(carteira.data_aplicacao) > 0)
FROM carteira, paciente
where carteira.numero_paciente = num_paciente
and (paciente.login_paciente = login and paciente.senha_paciente = md5(senha))
INTO @contador;

if(@contador > 0) then
if(
	(TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) >= 0)
	and (TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) <= 11)
) then
select 
	vacina.id_vacina,
    vacina.nome_vacina,
	vacina.lote_vacina,
	DATE_FORMAT(carteira.data_aplicacao, '%d/%m/%Y') as data_aplicacao,
	carteira.coren_enfermeiro,
	cnes.nome_cnes,
	vacina.descricao_vacina
from vacina
	inner join carteira on vacina.id_vacina = carteira.id_vacina
	inner join cnes on carteira.numero_cnes = cnes.numero_cnes
	and carteira.numero_paciente = num_paciente
union
select
	vacina.id_vacina,
    vacina.nome_vacina,
	vacina.lote_vacina,
	null,
	null,
	null,
	vacina.descricao_vacina
from vacina,
	carteira
	inner join paciente on carteira.numero_paciente = paciente.numero_paciente
	inner join cnes on carteira.numero_cnes = cnes.numero_cnes
WHERE (
		vacina.faixa_etaria = 'crianca'
		and paciente.nascimento = nascimento
	)
	and NOT EXISTS (
		select carteira.id_vacina
		from carteira
		where carteira.id_vacina = vacina.id_vacina
			and carteira.numero_paciente = num_paciente
	);
elseif(TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) <= 17) then
select
	vacina.id_vacina,
	vacina.nome_vacina,
	vacina.lote_vacina,
	DATE_FORMAT(carteira.data_aplicacao, '%d/%m/%Y') as data_aplicacao,
	carteira.coren_enfermeiro,
	cnes.nome_cnes,
	vacina.descricao_vacina
from vacina
	inner join carteira on vacina.id_vacina = carteira.id_vacina
	inner join cnes on carteira.numero_cnes = cnes.numero_cnes
	and carteira.numero_paciente = num_paciente
union
select 
	vacina.id_vacina,
	vacina.nome_vacina,
	vacina.lote_vacina,
	null,
	null,
	null,
	vacina.descricao_vacina
from vacina,
	carteira
	inner join paciente on carteira.numero_paciente = paciente.numero_paciente
	inner join cnes on carteira.numero_cnes = cnes.numero_cnes
WHERE (
		vacina.faixa_etaria = 'crianca'
		or vacina.faixa_etaria = 'adolescente'
	)
	and NOT EXISTS (
		select carteira.id_vacina
		from carteira
		where carteira.id_vacina = vacina.id_vacina
			and carteira.numero_paciente = num_paciente
	);
elseif(TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) <= 50) then
select 
	vacina.id_vacina,
	vacina.nome_vacina,
	vacina.lote_vacina,
	DATE_FORMAT(carteira.data_aplicacao, '%d/%m/%Y') as data_aplicacao,
	carteira.coren_enfermeiro,
	cnes.nome_cnes,
	vacina.descricao_vacina
from vacina
	inner join carteira on vacina.id_vacina = carteira.id_vacina
	inner join cnes on carteira.numero_cnes = cnes.numero_cnes
	and carteira.numero_paciente = num_paciente
union
select 
	vacina.id_vacina,
    vacina.nome_vacina,
	vacina.lote_vacina,
	null,
	null,
	null,
	vacina.descricao_vacina
from vacina,
	carteira
	inner join paciente on carteira.numero_paciente = paciente.numero_paciente
	inner join cnes on carteira.numero_cnes = cnes.numero_cnes
WHERE NOT vacina.faixa_etaria = 'idoso'
	and NOT EXISTS (
		select carteira.id_vacina
		from carteira
		where carteira.id_vacina = vacina.id_vacina
			and carteira.numero_paciente = num_paciente
	);
elseif(TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) > 50) then
select 
	vacina.id_vacina,
	vacina.nome_vacina,
	vacina.lote_vacina,
	DATE_FORMAT(carteira.data_aplicacao, '%d/%m/%Y') as data_aplicacao,
	carteira.coren_enfermeiro,
	cnes.nome_cnes,
	vacina.descricao_vacina
from vacina
	inner join carteira on vacina.id_vacina = carteira.id_vacina
	inner join cnes on carteira.numero_cnes = cnes.numero_cnes
	and carteira.numero_paciente = num_paciente
union
select 
	vacina.id_vacina,
	vacina.nome_vacina,
	vacina.lote_vacina,
	null,
	null,
	null,
	vacina.descricao_vacina
from vacina,
	carteira
	inner join paciente on carteira.numero_paciente = paciente.numero_paciente
	inner join cnes on carteira.numero_cnes = cnes.numero_cnes
WHERE NOT EXISTS (
		select carteira.id_vacina
		from carteira
		where carteira.id_vacina = vacina.id_vacina
			and carteira.numero_paciente = num_paciente
	);
end if;

else if(
	(TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) >= 0)
	and (TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) <= 11)
) then
select 
	vacina.id_vacina,
	vacina.nome_vacina,
	vacina.lote_vacina,
	null as data_aplicacao,
	null as coren_enfermeiro,
	null as nome_cnes,
	vacina.descricao_vacina
from vacina,
	paciente
where (
		vacina.faixa_etaria = 'crianca'
		and paciente.nascimento = nascimento
	)
	and paciente.numero_paciente = num_paciente;
elseif(TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) <= 17) then
select 
	vacina.id_vacina,
	vacina.nome_vacina,
	vacina.lote_vacina,
	null as data_aplicacao,
	null as coren_enfermeiro,
	null as nome_cnes,
	vacina.descricao_vacina
from vacina,
	paciente
where (
		vacina.faixa_etaria = 'crianca'
		or vacina.faixa_etaria = 'adolescente'
	)
	and (
		paciente.nascimento = nascimento
		and paciente.numero_paciente = num_paciente
	);
elseif(TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) <= 50) then
select 
	vacina.id_vacina,
	vacina.nome_vacina,
	vacina.lote_vacina,
	null as data_aplicacao,
	null as coren_enfermeiro,
	null as nome_cnes,
	vacina.descricao_vacina
from vacina,
	paciente
where NOT vacina.faixa_etaria = 'idoso'
	and (
		paciente.nascimento = nascimento
		and paciente.numero_paciente = num_paciente
	);
elseif(TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) > 50) then
select 
	vacina.id_vacina,
	vacina.nome_vacina,
	vacina.lote_vacina,
	null as data_aplicacao,
	null as coren_enfermeiro,
	null as nome_cnes,
	vacina.descricao_vacina
from vacina,
	paciente
where paciente.nascimento = nascimento
	and paciente.numero_paciente = num_paciente;
END IF;
end if;
end;
end if;
end$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
