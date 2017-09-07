create table student (
    register_id     number(4), --primary key
    f_name          text,
    l_name          text,
    class_number    varchar(3) --foreign key
);

create table class (
    class_number    varchar(3), --primary key
    class_teacher   number(5),
    class_strength  number(2)
);


create table teacher(
    emp_id          number(5), --primary key
    f_name          varchar(10),
    l_name          varchar(10),
    subject         text,
    password        text
);

create table personal_info (
    register_id     number(4), --foreign key
    gender          char(1),
    blood_group     varchar(2),
    date_of_birth   date,
    Address         text,
    E-mail          text,
    contact         number(10)
);

create table guardian (
    register_id     number(4), --foreign key
    father_name     varchar(15),
    mother_name     varchar(15),
    guardian_name   varchar(15),
    password        text(10)        
);

create table attendence (
    class_date     date,    
    register_id    number(4),   --foreign key
    attendence     bool
);

create table marks(
    register_id     number(4), --foreign key
    quarterly       number(3),
    halfyearly      number(3),
    annual          number(3),
    internal        number(3),
    curiousity      number(3),
    dedication      number(3),
    punctuality     number(3),
    behaviour       number(3),
    enthusiasm      number(3)
);

create table taught_by (
    class_number    number(3), 
    emp_id          number(5),
    class_timing    time,
    class_code      varchar(6)
);
