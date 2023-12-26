CREATE TABLE IF NOT EXISTS employees (
    employee_id INT PRIMARY KEY,
    last_name VARCHAR(100),
    first_name VARCHAR(100),
    birth_date TIMESTAMP,
    photo VARCHAR(255),
    notes VARCHAR(255)
);
