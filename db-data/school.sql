create table student {
    register_id     number(9),
    f_name          varchar(10),
    l_name          varchar(10)
};

create table class {
    class_number    varchar(3),
    class_teacher   varchar(15),
    class_strength  number(2)
};


create table teacher{
    emp_id          number(5),
    f_name          varchar(10),
    l_name          varchar(10)
};

create table personal_info {
    gender          varchar(6),
    blood_group     varchar(2),
    date_of_birth   date,
    Address         text,
    E-mail          text,
    contact         text
};

create table guardian {
    father_name     varchar(15),
    mother_name     varchar(15),
    guardian_name   varchar(15),
    password        varchar(10)        
};

create table attendance{
    days_attended   number(3),
    days_missed     number(3),
    attendance      number(2)
};

create table marks{
    quarterly       number(3),
    halfyearly      number(3),
    annual          number(3),
    internal        number(3),
    curiousity      number(3),
    dedication      number(3),
    punctuality     number(3),
    behaviour       number(3),
    enthusiasm      number(3)
};


