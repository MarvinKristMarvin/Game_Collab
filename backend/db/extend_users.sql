BEGIN;

-- Additional users
INSERT INTO "user" ("id", "password", "mail", "name", "age", "available", "description", "portfolio_url", "profile_mail", "created_at", "role") VALUES
(4, 'hashed_password4', 'diana@example.com', 'Diana', 32, TRUE, 'Graphic designer and UI specialist.', 'http://diana.design', 'contact@diana.dev', CURRENT_DATE, 2), -- User
(5, 'hashed_password5', 'edward@example.com', 'Edward', 35, FALSE, 'DevOps engineer.', NULL, 'contact@edward.dev', CURRENT_DATE, 1), -- Admin
(6, 'hashed_password6', 'fiona@example.com', 'Fiona', 29, TRUE, 'Mobile application developer.', 'http://fiona.apps', 'contact@fiona.dev', CURRENT_DATE, 2), -- User
(7, 'hashed_password7', 'george@example.com', 'George', 40, FALSE, 'Cybersecurity expert.', 'http://george.security', 'contact@george.dev', CURRENT_DATE, 2); -- User

-- Update user-job relationships
INSERT INTO "user_job" ("id", "user_id", "job_id") VALUES 
(5, 4, 1), -- diana artist
(6, 4, 3), -- diana dev
(7, 5, 3), -- edward dev
(8, 6, 2), -- fiona sounds
(9, 6, 3), -- fiona dev
(10, 7, 3); -- george dev

-- Update user-language relationships
INSERT INTO "user_language" ("id", "user_id", "language_id") VALUES 
(7, 4, 2), -- diana french
(8, 4, 5), -- diana russian
(9, 5, 1), -- edward english
(10, 6, 1), -- fiona english
(11, 6, 4), -- fiona japanese
(12, 7, 3); -- george german

-- Update user-remuneration relationships
INSERT INTO "user_remuneration" ("id", "user_id", "remuneration_id") VALUES 
(5, 4, 2), -- diana freelance
(6, 4, 4), -- diana salary
(7, 5, 4), -- edward salary
(8, 6, 3), -- fiona shares
(9, 7, 4); -- george salary

-- Additional users
INSERT INTO "user" ("id", "password", "mail", "name", "age", "available", "description", "portfolio_url", "profile_mail", "created_at", "role") VALUES
(8, 'hashed_password8', 'hannah@example.com', 'Hannah', 27, TRUE, 'UX researcher and designer.', 'http://hannah.ux', 'contact@hannah.dev', CURRENT_DATE, 2),
(9, 'hashed_password9', 'ian@example.com', 'Ian', 45, FALSE, 'Database architect.', NULL, 'contact@ian.dev', CURRENT_DATE, 1),
(10, 'hashed_password10', 'julia@example.com', 'Julia', 34, TRUE, 'Machine learning engineer.', 'http://julia.ml', 'contact@julia.dev', CURRENT_DATE, 2),
(11, 'hashed_password11', 'karen@example.com', 'Karen', 30, TRUE, 'Product manager.', NULL, 'contact@karen.dev', CURRENT_DATE, 2),
(12, 'hashed_password12', 'liam@example.com', 'Liam', 38, TRUE, 'Cloud computing specialist.', 'http://liam.cloud', 'contact@liam.dev', CURRENT_DATE, 1),
(13, 'hashed_password13', 'maria@example.com', 'Maria', 29, FALSE, 'Front-end developer.', 'http://maria.ui', 'contact@maria.dev', CURRENT_DATE, 2),
(14, 'hashed_password14', 'nathan@example.com', 'Nathan', 31, TRUE, 'Blockchain developer.', 'http://nathan.chain', 'contact@nathan.dev', CURRENT_DATE, 2),
(15, 'hashed_password15', 'olivia@example.com', 'Olivia', 26, TRUE, 'Technical writer.', NULL, 'contact@olivia.dev', CURRENT_DATE, 2),
(16, 'hashed_password16', 'paul@example.com', 'Paul', 42, FALSE, 'Project manager.', 'http://paul.pm', 'contact@paul.dev', CURRENT_DATE, 1),
(17, 'hashed_password17', 'quinn@example.com', 'Quinn', 28, TRUE, 'Data analyst.', 'http://quinn.data', 'contact@quinn.dev', CURRENT_DATE, 2);

-- Update user-job relationships
INSERT INTO "user_job" ("id", "user_id", "job_id") VALUES 
(11, 8, 1), -- hannah artist
(12, 9, 3), -- ian dev
(13, 10, 3), -- julia dev
(14, 11, 2), -- karen sounds
(15, 12, 3), -- liam dev
(16, 13, 1), -- maria artist
(17, 14, 3), -- nathan dev
(18, 15, 2), -- olivia sounds
(19, 16, 3), -- paul dev
(20, 17, 3); -- quinn dev

-- Update user-language relationships
INSERT INTO "user_language" ("id", "user_id", "language_id") VALUES 
(13, 8, 2), -- hannah french
(14, 9, 1), -- ian english
(15, 10, 4), -- julia japanese
(16, 11, 3), -- karen german
(17, 12, 1), -- liam english
(18, 13, 2), -- maria french
(19, 14, 5), -- nathan russian
(20, 15, 3), -- olivia german
(21, 16, 1), -- paul english
(22, 17, 4); -- quinn japanese

-- Update user-remuneration relationships
INSERT INTO "user_remuneration" ("id", "user_id", "remuneration_id") VALUES 
(10, 8, 2), -- hannah freelance
(11, 9, 4), -- ian salary
(12, 10, 3), -- julia shares
(13, 11, 2), -- karen freelance
(14, 12, 4), -- liam salary
(15, 13, 2), -- maria freelance
(16, 14, 3), -- nathan shares
(17, 15, 2), -- olivia freelance
(18, 16, 4), -- paul salary
(19, 17, 3); -- quinn shares

COMMIT;