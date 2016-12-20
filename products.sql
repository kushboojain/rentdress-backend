CREATE DATABASE products;

\c products;

CREATE TABLE products (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  size VARCHAR,
  color VARCHAR,
  category VARCHAR,
  type VARCHAR
);

INSERT into products(name, size, color, category, type) VALUES ('Lehengah', 'M', 'Pink', 'Women', 'Brocade');