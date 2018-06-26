create table adresser (id  serial not null, by varchar(255), gatenavn varchar(255), gatenummer varchar(255), postnummer varchar(255), primary key (id))
create table brukere (id  serial not null, epost varchar(255), etternavn varchar(255), fornavn varchar(255), primary key (id))
create table steder (id  serial not null, etasje varchar(255), kort_navn varchar(255), navn varchar(255), places_id varchar(255), adresse int4, primary key (id))
create table tags (id  serial not null, navn varchar(255), tags int4, primary key (id))
create table vurderinger (id  serial not null, dato timestamp not null, kommentar varchar(255), registrator int4, sted int4, primary key (id))
alter table steder add constraint FK2lw87cj1hi3f543lgsib42rv5 foreign key (adresse) references adresser
alter table tags add constraint FK6waf8fcqqoq4asf8dk37a7044 foreign key (tags) references steder
alter table vurderinger add constraint FKh1idll2frdql9swiyqyekuxvg foreign key (registrator) references brukere
alter table vurderinger add constraint FKp1bddh8qto9lqyf7elbola465 foreign key (sted) references steder
