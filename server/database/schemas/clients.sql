CREATE TABLE clients (
    id SERIAL NOT NULL PRIMARY KEY,
    ip VARCHAR(255) NOT NULL UNIQUE
);