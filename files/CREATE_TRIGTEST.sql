USE TEST;
DROP TABLE IF EXISTS TRIGTEST;
CREATE TABLE TRIGTEST (
	id INT NOT NULL AUTO_INCREMENT,
	message varchar(30),
	client_name varchar(300),
	PRIMARY KEY (id));