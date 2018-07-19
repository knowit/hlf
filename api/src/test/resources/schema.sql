--
-- PostgreSQL database dump
--

DROP TABLE IF EXISTS bruker;

CREATE TABLE bruker (
    id integer NOT NULL AUTO_INCREMENT,
    auth0user_id character varying(255),
    etternavn character varying(255),
    fornavn character varying(255),
    primary key (id)
);

DROP TABLE IF EXISTS sted;

CREATE TABLE sted (
    id integer NOT NULL AUTO_INCREMENT,
    place_id character varying(255) NOT NULL,
    primary key (id),
);


DROP TABLE IF EXISTS vurdering;

CREATE TABLE vurdering(
    id integer NOT NULL AUTO_INCREMENT,
    dato date NOT NULL,
    kommentar character varying(255),
    registrator integer,
    sted integer,
    primary key (id),
    foreign key (sted) references sted(id),
    foreign key(registrator) references bruker(id)
);


DROP TABLE IF EXISTS lydforholdvurdering;

CREATE TABLE lydforholdvurdering(
    rangering boolean NOT NULL,
    id integer NOT NULL,
    primary key (id),
    foreign key(id) references vurdering(id)
);


DROP TABLE IF EXISTS teleslyngevurdering;

CREATE TABLE teleslyngevurdering (
    rangering boolean NOT NULL,
    id integer NOT NULL,
    primary key (id),
    foreign key(id) references vurdering(id)
);


--
-- PostgreSQL database dump complete
--