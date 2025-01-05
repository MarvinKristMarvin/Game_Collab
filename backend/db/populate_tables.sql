
BEGIN;

INSERT INTO "role" ("name") VALUES 
('Admin'),
('User');

INSERT INTO "job" ("name") VALUES 
('Code'),
('Sprites'),
('Models'),
('Animations'),
('Sounds'),
('Musics'),
('Story'),
('Marketing');

INSERT INTO "language" ("name") VALUES
('English.gb'),
('French.fr'),
('German.de'),
('Japanese.jp'),
('Russian.ru'),
('Spanish.es'),
('Portuguese.pt'),
('Turkish.tr'),
('Italian.it'),
('Persian.ir'),
('Dutch.nl'),
('Polish.pl'),
('Chinese.cn'),
('Vietnamese.vn'),
('Indonesian.id'),
('Czech.cz'),
('Korean.kr'),
('Ukrainian.ua'),
('Arabic.sa'),
('Greek.gr'),
('Hebrew.il'),
('Swedish.se'),
('Romanian.ro'),
('Hungarian.hu'),
('Thai.th'),
('Danish.dk'),
('Slovak.sk'),
('Finnish.fi'),
('Norwegian.no');

INSERT INTO "remuneration" ("type") VALUES 
('Fun'),
('Shares'),
('Commissions'),
('Salary');

COMMIT;