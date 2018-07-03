-- Test data for the application

INSERT INTO adresser(gatenavn, gatenummer, by, postnummer) values
        ('Lakkegata', '53', 'Oslo', '0187'),
        ('Kirsten Flagstads Plass', '1', 'Oslo', '0150'),
        ('Slottsparken', '1', 'Oslo', '0010'),
        ('Henrik Ibsens gate', '36', 'Oslo', '0255'),
        ('Stortingsgata', '28', 'Oslo', '0161'),
        ('Klingenberggata', '4', 'Oslo', '0161');

INSERT INTO steder(places_id, navn, telefon, nettside, adresse) values
    ('ChIJmeCJ639uQUYRc3OrOTekBZw', 'Pascal Konditori-Brasseri', '+47 22 55 00 20',
       'http://pascal.no/', (select id from adresser where gatenavn = 'Henrik Ibsens gate' and
       gatenummer = '36' and by = 'Oslo')),
    ('ChIJby0egYBuQUYRKPyOa5h2Hkc', 'Knowit AS', '+47 02486', 'http://www.knowit.no/', (select id from
       adresser where gatenavn = 'Lakkegata' and gatenummer = '53' and by = 'Oslo')),
    ('ChIJezW6eddtQUYRHFnCrMk4cGc', 'Det Kongelige Slott', '+47 22 04 87 00',
       'http://www.kongehuset.no/seksjon.html?tid=27160&sek=26983', (select id from adresser where
       gatenavn = 'Slottsparken' and gatenummer = '1' and by = 'Oslo')),
    ('ChIJzRhSCX5uQUYRGXgSPXSbTM4', 'Saga cinema', '+47 994 32 000', 'http://www.nfkino.no/', (select id
       from adresser where gatenavn = 'Stortingsgata' and gatenummer = '28' and by = 'Oslo')),
    ('ChIJj1eI-X1uQUYRVfZxd5zqWLc', 'McDonalds', '+47 22 42 09 30', 'http://www.mcdonalds.no/', (select
       id from adresser where gatenavn = 'Klingenberggata' and gatenummer = '4' and by = 'Oslo'));

INSERT INTO tags(navn, gruppe) values
        ('movie_theater', 'GRUPPE1'), ('bakery', 'GRUPPE1'), ('store', 'GRUPPE1'),
        ('restaurant', 'GRUPPE1'), ('food', 'GRUPPE2');

INSERT INTO sted_tag(sted_id, tag_id) values
        (1,2), (1,3), (1,4), (1,5), (4,1), (5,4), (5,5);


INSERT INTO brukere(fornavn, etternavn, epost, brukernavn, passord) values
        ('Ola','Normann','ola@gmail.com', 'user1', 'passord'),
        ('Kari','Normann','kari@gmail.com', 'user2', 'passord'),
        ('Per','Hansen','per@gmail.com', 'user3', 'passord'),
        ('Trude','Hansen','trude@gmail.com', 'user4', 'passord');


INSERT INTO vurderinger(dato, kommentar, registrator, sted) values
        ('2018-07-21','Bra teleslynge', (select id from brukere where epost = 'ola@gmail.com'),
            (select id from steder where places_id = 'ChIJmeCJ639uQUYRc3OrOTekBZw')),
        ('2018-06-14','Dårlig lydforhold', (select id from brukere where epost = 'per@gmail.com'),
            (select id from steder where places_id = 'ChIJj1eI-X1uQUYRVfZxd5zqWLc'));

INSERT INTO teleslynge_vurdering(id, rangering, modell, type_slynge) values
        (1, true, NULL, 'mobil');

INSERT INTO lydforhold_vurdering(id, rangering) values
        (2,false);
