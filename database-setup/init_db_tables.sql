
create table movies (
    mid integer primary key not null,
    name VARCHAR(255) not null,
    on_netflix boolean not null,
    on_prime boolean not null,
    on_disney boolean not null,
    on_hulu boolean not null,
    year integer not null,
    rating decimal(2,1) not null,
    overview varchar(1023),
    imdb_id varchar(10) not null,
    poster_path varchar(255)
);

create table genres (
    genre_id integer primary key not null,
    name varchar(255) not null
);

create table movie_genres (
    mid integer not null,
    genre_id integer not null,
    primary key(mid, genre_id),
    foreign key(mid) references movies(mid),
    foreign key(genre_id) references genres(genre_id)
);

create table users (
    uid serial primary key not null,
    name VARCHAR(255) not null,
    joined_at timestamp without time zone not null
);

create table user_liked_genres (
    uid serial not null,
    genre_id integer not null,
    primary key(uid, genre_id),
    foreign key(uid) references users(uid),
    foreign key(genre_id) references genres(genre_id)
);

create table user_liked_movies (
    mid integer not null,
    uid serial not null,
    is_liked boolean not null,
    primary key(mid, uid),
    foreign key(mid) references movies(mid),
    foreign key(uid) references users(uid)
);

create table groups (
    group_id serial primary key not null,
    pin varchar(4) not null
);

create table group_members (
    group_id serial not null,
    uid serial not null,
    primary key(group_id, uid),
    foreign key(group_id) references groups(group_id),
    foreign key(uid) references users(uid)
);
