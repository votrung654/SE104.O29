CREATE TABLE sm_student
(
	id VARCHAR(10) PRIMARY KEY,
	name VARCHAR(50),
	gender int,
	dob DATETIME,
	address VARCHAR(100),
	email VARCHAR(20)
);

CREATE TABLE sm_teacher
(
	id int not null auto_increment PRIMARY KEY,
	name VARCHAR(50),
	gender int,
	dob DATETIME,
	address VARCHAR(100),
	email VARCHAR(20),
	phone varchar(15)
);

CREATE TABLE sm_teacher_list
(
	id int not null auto_increment PRIMARY KEY,
	class int,
	teacher varchar(10),
	subject int
);

CREATE TABLE sm_class
(
	id int not null auto_increment PRIMARY KEY,
	name VARCHAR(50),
	grade int,
	_year int
);

CREATE TABLE sm_class_list
(
	id int not null auto_increment PRIMARY KEY,
	class int,
	student varchar(10)
);

CREATE TABLE sm_grade
(
	id int not null auto_increment PRIMARY KEY,
	name VARCHAR(50),
	number int
);

CREATE TABLE sm_year
(
	id int not null auto_increment PRIMARY KEY,
	_start datetime,
	_end datetime,
	number int
);

CREATE TABLE sm_semester
(
	id int not null auto_increment PRIMARY KEY,
	name VARCHAR(50),
	number int
);

CREATE TABLE sm_subject
(
	id int not null auto_increment PRIMARY KEY,
	name varchar(50)
);

CREATE TABLE sm_transcript
(
	id int not null auto_increment PRIMARY KEY,
	student_code varchar(10),
	semester int,
	_subject int,
	exam_1 int,
	exam_2 int
);


CREATE TABLE setting
(
	id int not null auto_increment PRIMARY KEY,
	setting_code varchar(40),
	name varchar(50),
	value int
);

alter table sm_class
add constraint fk_grade_class foreign key (grade) references sm_grade(id);

alter table sm_class
add constraint fk_year_class foreign key (_year) references sm_year(id);

alter table sm_class_list
add constraint fk_class_clist foreign key (class) references sm_class(id);

alter table sm_class_list
add constraint fk_student_clist foreign key (student) references sm_student(id);




alter table sm_transcript
add constraint fk_semester_scr foreign key (semester) references sm_semester(id);

alter table sm_transcript
add constraint fk_scode_scr foreign key (student_code) references sm_student(id);

alter table sm_transcript
add constraint fk_subject_scr foreign key (_subject) references sm_subject(id);

alter table sm_teacher_list
add constraint fk_teacher_tlist foreign key (teacher) references sm_teacher(id);

alter table sm_teacher_list
add constraint fk_class_tlist foreign key (class) references sm_class(id);

alter table sm_teacher_list
add constraint fk_subject_tlist foreign key (subject) references sm_subject(id);