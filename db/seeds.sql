INSERT INTO `employees_tracker_db`.`department` (`id`, `name`) VALUES ('1', 'HR');
INSERT INTO `employees_tracker_db`.`department` (`id`, `name`) VALUES ('5', 'engineering');
INSERT INTO `employees_tracker_db`.`department` (`id`, `name`) VALUES ('7', 'Accounting and Finance');
INSERT INTO `employees_tracker_db`.`department` (`id`, `name`) VALUES ('10', 'Purchasing');
INSERT INTO `employees_tracker_db`.`department` (`id`, `name`) VALUES ('11', 'Marketing');

-- Insert values in to role table
INSERT INTO `employees_tracker_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('1', 'accountant', '30,000', '5');
INSERT INTO `employees_tracker_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('2', 'Manager', '35,000', '10');
INSERT INTO `employees_tracker_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('3', 'Manager', '37,000', '15');
INSERT INTO `employees_tracker_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('4', 'Engineer', '45,000', '5');
INSERT INTO `employees_tracker_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('5', 'Engineer', '40,000', '5');
INSERT INTO `employees_tracker_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('6', 'Executive', '22,000', '20');
INSERT INTO `employees_tracker_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('7', 'Executive', '23,000', '20');

--insert values in to employee
INSERT INTO `employees_tracker_db`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('11', 'Jon', 'William', '1', '12');
INSERT INTO `employees_tracker_db`.`employee` (`id`, `first_name`, `last_name`, `role_id`) VALUES ('12', 'Shila', 'Parker', '2');
INSERT INTO `employees_tracker_db`.`employee` (`id`, `first_name`, `last_name`, `role_id`) VALUES ('13', 'Sam', 'William', '2');
INSERT INTO `employees_tracker_db`.`employee` (`id`, `first_name`, `last_name`, `role_id`) VALUES ('14', 'Popy', 'Rower', '3');
INSERT INTO `employees_tracker_db`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('15', 'Zenita', 'Hylins', '5', '3');
INSERT INTO `employees_tracker_db`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('16', 'niro', 'witharana', '4', '3');
