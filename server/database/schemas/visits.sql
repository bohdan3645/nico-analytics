CREATE TABLE visits (
    id SERIAL NOT NULL PRIMARY KEY,
    id_website INT NOT NULL,
    id_client INT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT now();,
    FOREIGN KEY (id_website) REFERENCES websites (id),
    FOREIGN KEY (id_client) REFERENCES clients (id)
);