--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.9
-- Dumped by pg_dump version 9.6.9

--SET statement_timeout = 0;
--SET lock_timeout = 0;
--SET idle_in_transaction_session_timeout = 0;
--SET client_encoding = 'UTF8';
--SET standard_conforming_strings = on;
--SELECT pg_catalog.set_config('search_path', '', false);
--SET check_function_bodies = false;
--SET client_min_messages = warning;
--SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

--CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

--COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--SET default_tablespace = '';

--SET default_with_oids = false;

--
-- Name: adresser; Type: TABLE; Schema: public; Owner: hlf
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


--ALTER TABLE public.adresser OWNER TO hlf;

--
-- Name: adresser_id_seq; Type: SEQUENCE; Schema: public; Owner: hlf
--

/*CREATE SEQUENCE public.adresser_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;*/


--ALTER TABLE public.adresser_id_seq OWNER TO hlf;

--
-- Name: adresser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hlf
--

--ALTER SEQUENCE public.adresser_id_seq OWNED BY public.adresser.id;


--
-- Name: brukere; Type: TABLE; Schema: public; Owner: hlf
--
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


--ALTER TABLE public.brukere OWNER TO hlf;

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

--
-- Name: brukere_id_seq; Type: SEQUENCE; Schema: public; Owner: hlf
--

/*
CREATE SEQUENCE public.brukere_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
*/


--ALTER TABLE public.brukere_id_seq OWNER TO hlf;

--
-- Name: brukere_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hlf
--

--ALTER SEQUENCE public.brukere_id_seq OWNED BY public.brukere.id;

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

--
-- Name: lydforhold_vurdering; Type: TABLE; Schema: public; Owner: hlf
--
--DROP TABLE IF EXISTS lydforhold_vurdering;

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

--ALTER TABLE public.lydforhold_vurdering OWNER TO hlf;

--
-- Name: sted_tag; Type: TABLE; Schema: public; Owner: hlf
--
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


--ALTER TABLE public.sted_tag OWNER TO hlf;

--
-- Name: steder; Type: TABLE; Schema: public; Owner: hlf
--



--ALTER TABLE public.steder OWNER TO hlf;

--
-- Name: steder_id_seq; Type: SEQUENCE; Schema: public; Owner: hlf
--
/*

CREATE SEQUENCE public.steder_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
*/


--ALTER TABLE public.steder_id_seq OWNER TO hlf;

--
-- Name: steder_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hlf
--

--ALTER SEQUENCE public.steder_id_seq OWNED BY public.steder.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: hlf
--


--ALTER TABLE public.tags OWNER TO hlf;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: hlf
--

/*
CREATE SEQUENCE public.tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
*/


--ALTER TABLE public.tags_id_seq OWNER TO hlf;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hlf
--

--ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: teleslynge_vurdering; Type: TABLE; Schema: public; Owner: hlf
--


--ALTER TABLE public.teleslynge_vurdering OWNER TO hlf;

--
-- Name: vurderinger; Type: TABLE; Schema: public; Owner: hlf
--


--ALTER TABLE public.vurderinger OWNER TO hlf;

--
-- Name: vurderinger_id_seq; Type: SEQUENCE; Schema: public; Owner: hlf
--

/*CREATE SEQUENCE public.vurderinger_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;*/


--ALTER TABLE public.vurderinger_id_seq OWNER TO hlf;

--
-- Name: vurderinger_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hlf
--

--ALTER SEQUENCE public.vurderinger_id_seq OWNED BY public.vurderinger.id;


--
-- Name: adresser id; Type: DEFAULT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.adresser ALTER COLUMN id SET DEFAULT nextval('public.adresser_id_seq'::regclass);


--
-- Name: brukere id; Type: DEFAULT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.brukere ALTER COLUMN id SET DEFAULT nextval('public.brukere_id_seq'::regclass);


--
-- Name: steder id; Type: DEFAULT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.steder ALTER COLUMN id SET DEFAULT nextval('public.steder_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: vurderinger id; Type: DEFAULT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.vurderinger ALTER COLUMN id SET DEFAULT nextval('public.vurderinger_id_seq'::regclass);


--
-- Name: adresser adresser_pkey; Type: CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.adresser
  --  ADD CONSTRAINT adresser_pkey PRIMARY KEY (id);


--
-- Name: brukere brukere_pkey; Type: CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.brukere
  --  ADD CONSTRAINT brukere_pkey PRIMARY KEY (id);


--
-- Name: lydforhold_vurdering lydforhold_vurdering_pkey; Type: CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.lydforhold_vurdering
  --  ADD CONSTRAINT lydforhold_vurdering_pkey PRIMARY KEY (id);


--
-- Name: sted_tag sted_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.sted_tag
  --  ADD CONSTRAINT sted_tag_pkey PRIMARY KEY (sted_id, tag_id);


--
-- Name: steder steder_pkey; Type: CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.steder
  --  ADD CONSTRAINT steder_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.tags
  --  ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: teleslynge_vurdering teleslynge_vurdering_pkey; Type: CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.teleslynge_vurdering
  --  ADD CONSTRAINT teleslynge_vurdering_pkey PRIMARY KEY (id);


--
-- Name: vurderinger vurderinger_pkey; Type: CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.vurderinger
  --  ADD CONSTRAINT vurderinger_pkey PRIMARY KEY (id);


--
-- Name: steder fk2lw87cj1hi3f543lgsib42rv5; Type: FK CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.steder
  --  ADD CONSTRAINT fk2lw87cj1hi3f543lgsib42rv5 FOREIGN KEY (adresse) REFERENCES public.adresser(id);


--
-- Name: lydforhold_vurdering fk63i5li1ao32blj7xe25ew0mfk; Type: FK CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.lydforhold_vurdering
  --  ADD CONSTRAINT fk63i5li1ao32blj7xe25ew0mfk FOREIGN KEY (id) REFERENCES public.vurderinger(id);


--
-- Name: sted_tag fk6h8ocknafdpud0ledbf5wnbto; Type: FK CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.sted_tag
  --  ADD CONSTRAINT fk6h8ocknafdpud0ledbf5wnbto FOREIGN KEY (tag_id) REFERENCES public.tags(id);


--
-- Name: sted_tag fkbfhkbuu3w06mruslg05on6lep; Type: FK CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.sted_tag
  --  ADD CONSTRAINT fkbfhkbuu3w06mruslg05on6lep FOREIGN KEY (sted_id) REFERENCES public.steder(id);


--
-- Name: vurderinger fkh1idll2frdql9swiyqyekuxvg; Type: FK CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.vurderinger
  --  ADD CONSTRAINT fkh1idll2frdql9swiyqyekuxvg FOREIGN KEY (registrator) REFERENCES public.brukere(id);


--
-- Name: vurderinger fkp1bddh8qto9lqyf7elbola465; Type: FK CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.vurderinger
  --  ADD CONSTRAINT fkp1bddh8qto9lqyf7elbola465 FOREIGN KEY (sted) REFERENCES public.steder(id);


--
-- Name: teleslynge_vurdering fkshpar5r9kt4jfkdhvyltbupku; Type: FK CONSTRAINT; Schema: public; Owner: hlf
--

--ALTER TABLE ONLY public.teleslynge_vurdering
  --  ADD CONSTRAINT fkshpar5r9kt4jfkdhvyltbupku FOREIGN KEY (id) REFERENCES public.vurderinger(id);


--
-- PostgreSQL database dump complete
--