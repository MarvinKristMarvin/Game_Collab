BEGIN;

CREATE TABLE "role" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,  
    "name" TEXT NOT NULL                                    
);

CREATE TABLE "user" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,  
    "password" TEXT NOT NULL,                               
    "mail" TEXT UNIQUE NOT NULL,                           
    "name" VARCHAR(50),                             
    "age" SMALLINT,                                  
    "available" BOOLEAN,                           
    "description" TEXT,                           
    "portfolio_url" TEXT,                                   
    "profile_mail" TEXT,                          
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,                     
    "updated_at" TIMESTAMP,                                     
    "role" INT NOT NULL DEFAULT 2, -- User                                   
    CONSTRAINT fk_role FOREIGN KEY ("role") REFERENCES "role"("id")
);

CREATE TABLE "job" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,  
    "name" VARCHAR(50) NOT NULL                                    
);

CREATE TABLE "language" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,  
    "name" VARCHAR(50) NOT NULL                                    
);


CREATE TABLE "remuneration" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,  
    "type" VARCHAR(50) NOT NULL                                    
);

CREATE TABLE "user_job" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "user_id" INT NOT NULL,
    "job_id" INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE,
    CONSTRAINT fk_job FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE CASCADE,
    CONSTRAINT user_job_unique UNIQUE (user_id, job_id) -- Prevent duplicate entries
);

CREATE TABLE "user_language" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "user_id" INT NOT NULL,
    "language_id" INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE,
    CONSTRAINT fk_language FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE CASCADE,
    CONSTRAINT user_language_unique UNIQUE (user_id, language_id)
);

CREATE TABLE "user_remuneration" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "user_id" INT NOT NULL,
    "remuneration_id" INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE,
    CONSTRAINT fk_remuneration FOREIGN KEY ("remuneration_id") REFERENCES "remuneration"("id") ON DELETE CASCADE,
    CONSTRAINT user_remuneration_unique UNIQUE (user_id, remuneration_id)
);

-- Reset id sequences
SELECT setval(pg_get_serial_sequence('"role"', 'id'), COALESCE((SELECT MAX(id) FROM "role"), 0) + 1, false);
SELECT setval(pg_get_serial_sequence('"user"', 'id'), COALESCE((SELECT MAX(id) FROM "user"), 0) + 1, false);
SELECT setval(pg_get_serial_sequence('"job"', 'id'), COALESCE((SELECT MAX(id) FROM "job"), 0) + 1, false);
SELECT setval(pg_get_serial_sequence('"language"', 'id'), COALESCE((SELECT MAX(id) FROM "language"), 0) + 1, false);
SELECT setval(pg_get_serial_sequence('"remuneration"', 'id'), COALESCE((SELECT MAX(id) FROM "remuneration"), 0) + 1, false);
SELECT setval(pg_get_serial_sequence('"user_job"', 'id'), COALESCE((SELECT MAX(id) FROM "user_job"), 0) + 1, false);
SELECT setval(pg_get_serial_sequence('"user_language"', 'id'), COALESCE((SELECT MAX(id) FROM "user_language"), 0) + 1, false);
SELECT setval(pg_get_serial_sequence('"user_remuneration"', 'id'), COALESCE((SELECT MAX(id) FROM "user_remuneration"), 0) + 1, false);

COMMIT;