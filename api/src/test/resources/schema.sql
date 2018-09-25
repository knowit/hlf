--
-- PostgreSQL database dump
--

DROP TABLE IF EXISTS bruker;

CREATE TABLE bruker (
    id integer NOT NULL AUTO_INCREMENT,
    auth0user_id character varying(255),
    etternavn character varying(255),
    fornavn character varying(255),
    image_url character varying(255),
    primary key (id)
);

DROP TABLE IF EXISTS sted;

CREATE TABLE sted (
    id integer NOT NULL AUTO_INCREMENT,
    place_id character varying(255) NOT NULL,
    primary key (id)
);

CREATE TYPE vurderings_type as ENUM ('Informasjon', 'Teleslynge', 'Lydutjevning', 'Lydforhold');

DROP TABLE IF EXISTS vurdering;

CREATE TABLE vurdering(
    id integer NOT NULL AUTO_INCREMENT,
    dato date NOT NULL,
    kommentar character varying(255),
    registrator integer,
    sted integer,
    vurderings_type vurderings_type,
    rangering smallint,
    primary key (id),
    foreign key (sted) references sted(id),
    foreign key(registrator) references bruker(id)
);

DROP TABLE IF EXISTS access_token;

CREATE TABLE access_token(
  id integer NOT NULL AUTO_INCREMENT,
  token text,
  expires_at date NOT NULL,
  bruker integer,
  token_type character varying(15),
  primary key(id),
  foreign key (bruker) references bruker(id)
);

DROP TABLE IF EXISTS management_api_tokens;

CREATE TABLE management_tokens(
  id integer NOT NULL AUTO_INCREMENT,
  access_token text,
  scope text,
  expires_at bigint,
  token_type character varying(15),
  primary key(id),
);

--
-- PostgreSQL database dump complete
--