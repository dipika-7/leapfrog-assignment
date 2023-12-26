CREATE TABLE IF NOT EXISTS suppliers(
	supplier_id INT PRIMARY KEY,
	supplier_name VARCHAR(100),
	contact_name VARCHAR(100),
	address VARCHAR(100),
	city VARCHAR(100),
	postal_code VARCHAR(30),
	country VARCHAR(50),
	phone VARCHAR(20)
)