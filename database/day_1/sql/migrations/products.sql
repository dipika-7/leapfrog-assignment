CREATE TABLE IF NOT EXISTS products(
	product_id INT PRIMARY KEY,
	product_name VARCHAR(100),
	supplier_id INT,
	category_id INT,
	unit VARCHAR(50),
	price NUMERIC(10,2),
	FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
	FOREIGN KEY (category_id) REFERENCES categories(category_id)
)