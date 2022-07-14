CREATE TABLE visits (
    id SERIAL NOT NULL PRIMARY KEY,
    id_website BIGINT NOT NULL,
    id_client INT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT now(),
    date VARCHAR(255) NOT NULL,
    time VARCHAR(255) NOT NULL,
    time_zone_offset VARCHAR(255) NOT NULL DEFAULT 'no data',
    languages VARCHAR(255) NOT NULL DEFAULT 'no data',
    primary_language VARCHAR(255) NOT NULL DEFAULT 'no data',
    platform VARCHAR(255) NOT NULL DEFAULT 'no data',
    FOREIGN KEY (id_website) REFERENCES websites (id),
    FOREIGN KEY (id_client) REFERENCES clients (id)
);