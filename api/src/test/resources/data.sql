-- Test data for the application

INSERT INTO sted(place_id) values
    ('ChIJmeCJ639uQUYRc3OrOTekBZw'),
    ('ChIJby0egYBuQUYRKPyOa5h2Hkc'),
    ('ChIJezW6eddtQUYRHFnCrMk4cGc'),
    ('ChIJzRhSCX5uQUYRGXgSPXSbTM4'),
    ('ChIJj1eI-X1uQUYRVfZxd5zqWLc');

INSERT INTO bruker(fornavn, etternavn, auth0user_id, image_url) values
        ('Ola','Normann','userid1', 'image_url1'),
        ('Kari','Normann','userid2', 'image_url2'),
        ('Per','Hansen','userid3', 'image_url3'),
        ('Trude','Hansen','userid4', 'image_url4');

INSERT INTO vurdering(dato, kommentar, registrator, sted, vurderings_type, rangering) values
        (TO_DATE('17/12/2018', 'DD/MM/YYYY'),'Bra teleslynge', (select id from bruker where auth0user_id = 'userid1'),
            (select id from sted where place_id = 'ChIJmeCJ639uQUYRc3OrOTekBZw'), 'Informasjon', false),
        (TO_DATE('21/05/2018', 'DD/MM/YYYY'),'Dårlig lydforhold', (select id from bruker where auth0user_id = 'userid3'),
            (select id from sted where place_id = 'ChIJj1eI-X1uQUYRVfZxd5zqWLc'), 'Teleslynge', false);
