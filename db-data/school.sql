create table student (
    register_id     integer, --primary key
    f_name          text,
    l_name          text,
    class_number    varchar(3) --foreign key
);

create table class (
    class_number    varchar(3), --primary key
    class_teacher   integer,
    class_strength  integer
);


create table teacher(
    emp_id          integer, --primary key
    f_name          varchar(10),
    l_name          varchar(10),
    subject         text,
    password        text
);

create table personal_info (
    register_id     integer, --foreign key
    gender          char(1),
    blood_group     varchar(2),
    date_of_birth   date,
    Address         text,
    E-mail          text,
    contact         integer
);

create table guardian (
    register_id     integer, --foreign key
    father_name     varchar(15),
    mother_name     varchar(15),
    guardian_name   varchar(15),
    password        text
);

create table attendence (
    class_date     date,    
    register_id    integer,   --foreign key
    attendence     bool
);

create table marks(
    register_id     integer, --foreign key
    emp_id	    integer, --foreign key
    quarterly       integer,
    halfyearly      integer,
    annual          integer,
    internal        integer,
    curiousity      integer,
    dedication      integer,
    punctuality     integer,
    behaviour       integer,
    enthusiasm      integer
);

create table taught_by (
    class_number    varchar(3), 
    emp_id          integer,
    class_timing    time,
    class_code      varchar(6)
);


-- primary keys
alter table student
	add constraint pk_student
	primary key(reigster_id);

alter table class
	add constraint pk_class
	primary key(class_number);

alter table teacher
	add constraint pk_teacher
	primary key(emp_id);

alter table personal_info
    add constraint pk_personal_info
    primary key(reigster_id);

alter table guardian
    add constraint pk_guardian
    primary key(reigster_id);

alter table attendence
    add constraint pk_attendence
    primary key(reigster_id);

alter table marks
    add constraint pk_marks
    primary key(reigster_id,emp_id);


alter table taught_by
    add constraint pk_taught_by
    primary key(class_number,emp_id);

-- foreign keys

alter table student
	add constraint fk_student_class
	foreign key(class_number)
	references class(class_number);

alter table marks 
	add constraint fk_marks_student
	foreign key(register_id) references student(register_id);

alter table taught_by 
	add constraint fk_taught_class
	foreign key(class_number) references class(class_number);

alter table taught_by
	add constraint fk_taught_teacher
	foreign key(em_id) references teacher(emp_id);

alter table marks 
	add constraint fk_marks_teacher 
	foreign key(emp_id) references teacher(emp_id);

alter table marks 
	add constraint pk_marks
	foreign key(register_id,emp_id);

alter table attendence 
	add constraint fk_attendence_student
	foreign key(register_id) references student(register_id);

alter table guardian 
    add constraint fk_guardain_student 
    foreign key(register_id) references student(register_id);
    
alter table personal_info
    add constraint fk_personal_student 
    foreign key(register_id) references student(register_id);
