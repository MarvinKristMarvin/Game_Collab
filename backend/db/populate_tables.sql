
BEGIN;

INSERT INTO "role" ("name") VALUES 
('Admin'),
('User');

INSERT INTO "job" ("name") VALUES 
('Artist'),
('Sounds'),
('Dev');

INSERT INTO "language" ("name") VALUES 
('English.gb'),
('French.fr'),
('German.de'),
('Japanese.jp'),
('Russian.ru');

INSERT INTO "remuneration" ("type") VALUES 
('Nothing'),
('Freelance'),
('Shares'),
('Salary');

COMMIT;