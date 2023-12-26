CREATE TABLE IF NOT EXISTS order_details(
	order_detail_id INT PRIMARY KEY,
	order_id INT,
	product_id INT,
	quantity INT,
	FOREIGN KEY (order_id) REFERENCES orders(order_id),
	FOREIGN KEY (product_id) REFERENCES products(product_id)
)