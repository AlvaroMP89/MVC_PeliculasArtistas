CREATE DATABASE IF NOT EXISTS vbd DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE vbd;

DROP TABLE IF EXISTS artistas_contenidos;
DROP TABLE IF EXISTS artistas;
DROP TABLE IF EXISTS contenidos;

CREATE TABLE IF NOT EXISTS contenidos
(
    ide_con INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tit_con VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS artistas
(
    ide_art INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    non_art VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS artistas_contenidos
(
    ide_arc INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ide_art INT NOT NULL,
    ide_con INT NOT NULL,
    FOREIGN KEY (ide_art) REFERENCES artistas(ide_art),
    FOREIGN KEY (ide_con) REFERENCES contenidos(ide_con)
);

