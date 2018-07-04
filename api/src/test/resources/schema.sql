--
-- PostgreSQL database dump
--

DROP TABLE IF EXISTS adresser;

CREATE TABLE adresser (
    id integer NOT NULL AUTO_INCREMENT,
    by character varying(255) NOT NULL,
    gatenavn character varying(255),
    gatenummer character varying(255),
    postnummer character varying(255) NOT NULL,
    primary key (id)
);


DROP TABLE IF EXISTS brukere;

CREATE TABLE brukere (
    id integer NOT NULL AUTO_INCREMENT,
    epost character varying(255),
    etternavn character varying(255),
    fornavn character varying(255),
    brukernavn character varying(255),
    passord character varying(255),
    primary key (id)
);



DROP TABLE IF EXISTS steder;

CREATE TABLE steder (
    id integer NOT NULL AUTO_INCREMENT,
    navn character varying(255),
    nettside character varying(255),
    places_id character varying(255) NOT NULL,
    telefon character varying(255),
    adresse integer NOT NULL,
    primary key (id),
    foreign key (adresse) references adresser(id)
);


DROP TABLE IF EXISTS vurderinger;

CREATE TABLE vurderinger(
    id integer NOT NULL AUTO_INCREMENT,
    dato date NOT NULL,
    kommentar character varying(255),
    registrator integer,
    sted integer,
    primary key (id),
    foreign key (sted) references steder(id),
    foreign key(registrator) references brukere(id)
);


DROP TABLE IF EXISTS lydforhold_vurdering;

CREATE TABLE lydforhold_vurdering(
    rangering boolean NOT NULL,
    id integer NOT NULL,
    primary key (id),
    foreign key(id) references vurderinger(id)
);


DROP TABLE IF EXISTS teleslynge_vurdering;

CREATE TABLE teleslynge_vurdering (
    modell character varying(255),
    rangering boolean NOT NULL,
    type_slynge character varying(255),
    id integer NOT NULL,
    primary key (id),
    foreign key(id) references vurderinger(id)
);


DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
    id integer NOT NULL AUTO_INCREMENT,
    gruppe character varying(255) NOT NULL,
    navn character varying(255) NOT NULL,
    primary key (id)
);


DROP TABLE IF EXISTS sted_tag;

CREATE TABLE sted_tag (
    sted_id integer NOT NULL,
    tag_id integer NOT NULL,
    primary key (sted_id, tag_id),
    foreign key (sted_id) references steder(id),
    foreign key (tag_id) references tags(id)
);

--
-- PostgreSQL database dump complete
--