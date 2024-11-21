
BEGIN;

INSERT INTO "role" ("id","name") VALUES 
(1, 'Admin'),
(2, 'User');

INSERT INTO "utilisateur" ("id", "password", "mail", "name", "age", "available", "description", "portfolio_url", "profile_mail", "created_at", "role") VALUES
(1, 'hashed_password1', 'alice@example.com', 'Alice', 30, TRUE, 'Skilled full-stack developer.', 'http://alice.dev', 'contact@alice.dev', CURRENT_DATE, 1), -- Admin
(2, 'hashed_password2', 'bob@example.com', 'Bob', 25, FALSE, 'Front-end specialist.', 'http://bob.dev', 'contact@bob.dev', CURRENT_DATE, 2), -- User
(3, 'hashed_password3', 'charlie@example.com', 'Charlie', 28, TRUE, 'Backend and API developer.', NULL, 'contact@charlie.dev', CURRENT_DATE, 2); -- User

INSERT INTO "job" ("id", "name") VALUES 
(1, 'Artist'),
(2, 'Sounds'),
(3, 'Dev');

INSERT INTO "language" ("id", "name") VALUES 
(1, 'English'),
(2, 'French'),
(3, 'Russian');

INSERT INTO "remuneration" ("id", "type") VALUES 
(1, 'Nothing'),
(2, 'Freelance'),
(3, 'Shares'),
(4, 'Salary');

INSERT INTO "utilisateur_job" ("id", "utilisateur_id", "job_id") VALUES 
(1, 1, 1), -- alice artist
(2, 1, 3), -- alice dev
(3, 2, 1), -- bob artist
(4, 3, 2); -- charlie sounds

INSERT INTO "utilisateur_remuneration" ("id", "utilisateur_id", "remuneration_id") VALUES 
(1, 1, 1), -- alice nothing
(2, 2, 2), -- bob freelance
(3, 2, 4), -- bob salary
(4, 3, 3); -- charlie shares

INSERT INTO "utilisateur_language" ("id", "utilisateur_id", "language_id") VALUES 
(1, 1, 1), -- alice english
(2, 2, 2), -- bob french
(3, 2, 3), -- bob russian
(4, 3, 3); -- charlie russian

COMMIT;