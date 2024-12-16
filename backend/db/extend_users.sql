BEGIN;

-- Insert users, starting with hashed_password1 and ensuring each user has a job, language, and remuneration
INSERT INTO "user" ("password", "mail", "name", "age", "available", "description", "portfolio_url", "profile_mail", "created_at", "role") VALUES
('hashed_password1', 'diana@example.com', 'Diana', 32, TRUE, 'Graphic designer and UI specialist.', 'http://diana.design', 'contact@diana.dev', CURRENT_DATE, 2),  -- diana, graphic designer
('hashed_password2', 'edward@example.com', 'Edward', 35, TRUE, 'DevOps engineer.', NULL, 'contact@edward.dev', CURRENT_DATE, 1),  -- edward, devops engineer
('hashed_password3', 'fiona@example.com', 'Fiona', 29, TRUE, 'Mobile application developer.', 'http://fiona.apps', 'contact@fiona.dev', CURRENT_DATE, 2),  -- fiona, mobile dev
('hashed_password4', 'george@example.com', 'George', 40, TRUE, 'Cybersecurity expert.', 'http://george.security', 'contact@george.dev', CURRENT_DATE, 2),  -- george, cybersecurity expert
('hashed_password5', 'hannah@example.com', 'Hannah', 27, TRUE, 'UX researcher and designer.', 'http://hannah.ux', 'contact@hannah.dev', CURRENT_DATE, 2),  -- hannah, ux researcher
('hashed_password6', 'ian@example.com', 'Ian', 45, TRUE, 'Database architect.', NULL, 'contact@ian.dev', CURRENT_DATE, 1),  -- ian, database architect
('hashed_password7', 'julia@example.com', 'Julia', 34, TRUE, 'Machine learning engineer.', 'http://julia.ml', 'contact@julia.dev', CURRENT_DATE, 2),  -- julia, ml engineer
('hashed_password8', 'karen@example.com', 'Karen', 30, TRUE, 'Product manager.', NULL, 'contact@karen.dev', CURRENT_DATE, 2),  -- karen, product manager
('hashed_password9', 'liam@example.com', 'Liam', 38, TRUE, 'Cloud computing specialist.', 'http://liam.cloud', 'contact@liam.dev', CURRENT_DATE, 1),  -- liam, cloud computing
('hashed_password10', 'maria@example.com', 'Maria', 29, TRUE, 'Front-end developer.', 'http://maria.ui', 'contact@maria.dev', CURRENT_DATE, 2),  -- maria, front-end dev
('hashed_password11', 'nathan@example.com', 'Nathan', 31, TRUE, 'Blockchain developer.', 'http://nathan.chain', 'contact@nathan.dev', CURRENT_DATE, 2),  -- nathan, blockchain dev
('hashed_password12', 'olivia@example.com', 'Olivia', 26, TRUE, 'Technical writer.', NULL, 'contact@olivia.dev', CURRENT_DATE, 2),  -- olivia, technical writer
('hashed_password13', 'paul@example.com', 'Paul', 42, FALSE, 'Project manager.', 'http://paul.pm', 'contact@paul.dev', CURRENT_DATE, 1),  -- paul, project manager
('hashed_password14', 'quinn@example.com', 'Quinn', 28, FALSE, 'Data analyst.', 'http://quinn.data', 'contact@quinn.dev', CURRENT_DATE, 2),  -- quinn, data analyst
('hashed_password15', 'rachel@example.com', 'Rachel', 25, TRUE, 'SEO expert.', 'http://rachel.seo', 'contact@rachel.dev', CURRENT_DATE, 2),  -- rachel, seo expert
('hashed_password16', 'steven@example.com', 'Steven', 36, TRUE, 'Backend developer.', NULL, 'contact@steven.dev', CURRENT_DATE, 1),  -- steven, backend dev
('hashed_password17', 'theresa@example.com', 'Theresa', 41, TRUE, 'Network engineer.', 'http://theresa.network', 'contact@theresa.dev', CURRENT_DATE, 2),  -- theresa, network engineer
('hashed_password18', 'victor@example.com', 'Victor', 39, TRUE, 'Game developer.', NULL, 'contact@victor.dev', CURRENT_DATE, 2),  -- victor, game developer
('hashed_password19', 'wendy@example.com', 'Wendy', 33, TRUE, 'AR/VR specialist.', 'http://wendy.ar', 'contact@wendy.dev', CURRENT_DATE, 2),  -- wendy, ar/vr specialist
('hashed_password20', 'xavier@example.com', 'Xavier', 29, TRUE, 'Python developer.', NULL, 'contact@xavier.dev', CURRENT_DATE, 2),  -- xavier, python developer
('hashed_password21', 'yvonne@example.com', 'Yvonne', 27, TRUE, 'Big data analyst.', 'http://yvonne.data', 'contact@yvonne.dev', CURRENT_DATE, 2),  -- yvonne, big data analyst
('hashed_password22', 'zach@example.com', 'Zach', 34, TRUE, 'Cloud architect.', NULL, 'contact@zach.dev', CURRENT_DATE, 1),  -- zach, cloud architect
('hashed_password23', 'amelia@example.com', 'Amelia', 28, TRUE, 'Content strategist.', 'http://amelia.content', 'contact@amelia.dev', CURRENT_DATE, 2),  -- amelia, content strategist
('hashed_password24', 'brad@example.com', 'Brad', 35, TRUE, 'Cybersecurity consultant.', 'http://brad.security', 'contact@brad.dev', CURRENT_DATE, 1);  -- brad, cybersecurity consultant

-- Update user-job relationships (ensuring each user has at least one job)
INSERT INTO "user_job" ("user_id", "job_id") VALUES 
(1, 1), (1, 3),  -- diana, artist & dev
(2, 3),  -- edward, dev
(3, 2), (3, 3), (3, 1),  -- fiona, sounds & dev & artist
(4, 3), (4, 2),  -- george, dev & sounds
(5, 1), (5, 2),  -- hannah, artist & sounds
(6, 3),  -- ian, dev
(7, 3),  -- julia, dev
(8, 2),  -- karen, sounds
(9, 3),  -- liam, dev
(10, 1),  -- maria, artist
(11, 3),  -- nathan, dev
(12, 2),  -- olivia, sounds
(13, 3),  -- paul, dev
(14, 3),  -- quinn, dev
(15, 1), (15, 3),  -- rachel, artist & dev
(16, 2),  -- steven, sounds
(17, 3), (17, 1),  -- theresa, dev & artist
(18, 2), (18, 1),  -- victor, sounds & artist
(19, 3),  -- wendy, dev
(20, 1), (20, 2),  -- xavier, artist & sounds
(21, 3),  -- yvonne, dev
(22, 2),  -- zach, sounds
(23, 3),  -- amelia, dev
(24, 1);  -- brad, artist

-- Update user-language relationships (ensuring each user has at least one language)
INSERT INTO "user_language" ("user_id", "language_id") VALUES 
(1, 2), (1, 5),  -- diana, english & russian
(2, 1),  -- edward, english
(3, 1), (3, 4), (3, 3),  -- fiona, english, japanese, russian
(4, 3), (4, 5),  -- george, german & russian
(5, 2), (5, 3),  -- hannah, french & german
(6, 1),  -- ian, english
(7, 4),  -- julia, japanese
(8, 3),  -- karen, german
(9, 1),  -- liam, english
(10, 2),  -- maria, french
(11, 5),  -- nathan, russian
(12, 3),  -- olivia, german
(13, 1),  -- paul, english
(14, 4),  -- quinn, japanese
(15, 1), (15, 3),  -- rachel, english & russian
(16, 4),  -- steven, japanese
(17, 1), (17, 2),  -- theresa, english & french
(18, 3), (18, 2),  -- victor, german & french
(19, 4),  -- wendy, japanese
(20, 2),  -- xavier, french
(21, 3),  -- yvonne, german
(22, 1),  -- zach, english
(23, 2),  -- amelia, french
(24, 3);  -- brad, german

-- Update user-remuneration relationships (ensuring each user has at least one remuneration)
INSERT INTO "user_remuneration" ("user_id", "remuneration_id") VALUES 
(1, 2), (1, 4),  -- diana, freelance & salary
(2, 4),  -- edward, salary
(3, 3), (3, 2),  -- fiona, shares & freelance
(4, 4), (4, 3),  -- george, salary & shares
(5, 2),  -- hannah, freelance
(6, 4),  -- ian, salary
(7, 3),  -- julia, shares
(8, 2),  -- karen, freelance
(9, 4),  -- liam, salary
(10, 2),  -- maria, freelance
(11, 3),  -- nathan, shares
(12, 2),  -- olivia, freelance
(13, 4),  -- paul, salary
(14, 3),  -- quinn, shares
(15, 2), (15, 4),  -- rachel, freelance & salary
(16, 3),  -- steven, shares
(17, 4), (17, 2),  -- theresa, salary & freelance
(18, 3), (18, 4),  -- victor, shares & salary
(19, 2),  -- wendy, freelance
(20, 4),  -- xavier, salary
(21, 3),  -- yvonne, shares
(22, 2),  -- zach, freelance
(23, 4),  -- amelia, salary
(24, 2);  -- brad, freelance

COMMIT;
