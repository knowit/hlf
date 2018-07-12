-- Test data for the application

INSERT INTO sted(place_id) values
    ('ChIJmeCJ639uQUYRc3OrOTekBZw'),
    ('ChIJby0egYBuQUYRKPyOa5h2Hkc'),
    ('ChIJezW6eddtQUYRHFnCrMk4cGc'),
    ('ChIJzRhSCX5uQUYRGXgSPXSbTM4'),
    ('ChIJj1eI-X1uQUYRVfZxd5zqWLc');

INSERT INTO bruker(fornavn, etternavn, epost, brukernavn, passord) values
        ('Ola','Normann','ola@gmail.com', 'user1', 'passord'),
        ('Kari','Normann','kari@gmail.com', 'user2', 'passord'),
        ('Per','Hansen','per@gmail.com', 'user3', 'passord'),
        ('Trude','Hansen','trude@gmail.com', 'user4', 'passord');

INSERT INTO vurdering(dato, kommentar, registrator, sted) values
        (TO_DATE('17/12/2018', 'DD/MM/YYYY'),'Bra teleslynge', (select id from bruker where epost = 'ola@gmail.com'),
            (select id from sted where place_id = 'ChIJmeCJ639uQUYRc3OrOTekBZw')),
        (TO_DATE('21/05/2018', 'DD/MM/YYYY'),'Dårlig lydforhold', (select id from bruker where epost = 'per@gmail.com'),
            (select id from sted where place_id = 'ChIJj1eI-X1uQUYRVfZxd5zqWLc'));

INSERT INTO teleslyngevurdering(id, rangering) values
        (1, true);

INSERT INTO lydforholdvurdering(id, rangering) values
        (2,false);
