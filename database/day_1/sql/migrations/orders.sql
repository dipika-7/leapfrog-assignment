CREATE TABLE IF NOT EXISTS orders(
	order_id INT PRIMARY KEY,
	customer_id INT, 
	employee_id INT,
	orderDate TIMESTAMP,
	shipper_id INT,
	FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
	FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
	FOREIGN KEY (shipper_id) REFERENCES shippers(shipper_id)
)