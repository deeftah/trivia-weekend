CREATE TABLE "user"
(
    "id" serial NOT NULL,
    "username" varchar(100) NOT NULL UNIQUE,
    "password" varchar(100) NOT NULL,
    "first_name" varchar(30) NOT NULL,
    "last_name" varchar(50) NOT NULL,
    "color" varchar(50) DEFAULT 'green',
    "clearance_id" integer NOT NULL,
    "team_id" integer,
    CONSTRAINT "user_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "schedule"
(
    "id" serial NOT NULL,
    "date" varchar(50) NOT NULL,
    "time" varchar(30) NOT NULL,
    CONSTRAINT "schedule_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "schedule_user"
(
    "id" serial NOT NULL,
    "schedule_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    CONSTRAINT "schedule_user_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "questions"
(
    "id" serial NOT NULL,
    "hour" integer NOT NULL,
    "question_number" integer NOT NULL,
    "point_value" integer,
    "question_description" varchar(2000),
    "answer" varchar(500),
    "correct" varchar(15),
    "contest_id" int NOT NULL,
    CONSTRAINT "questions_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "contest"
(
    "id" serial NOT NULL,
    "contest_name" varchar(80) NOT NULL,
    "start_date" DATE NOT NULL,
    "start_time" varchar (15),
    "number_of_hours" integer NOT NULL,
    "number_of_questions" integer NOT NULL,
    "team_id" int NOT NULL,
    CONSTRAINT "contest_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "visual"
(
    "id" serial NOT NULL,
    "url" varchar(1000) NOT NULL,
    "contest_id" integer NOT NULL,
    "image_number" integer NOT NULL,
    "match_level" varchar(50) NOT NULL DEFAULT 'Not Found',
    "comment" varchar(9999),
    CONSTRAINT "visual_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "team"
(
    "id" serial NOT NULL,
    "name" varchar(50) NOT NULL UNIQUE,
    "current_contest" integer,
    "access_id" integer NOT NULL UNIQUE,
    "boilerplate" varchar(9999),
    "logo_url" varchar(2000),
    CONSTRAINT "team_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);

ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("team_id") REFERENCES "team"("id");

ALTER TABLE "schedule_user" ADD CONSTRAINT "schedule_user_fk0" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id");

ALTER TABLE "schedule_user" ADD CONSTRAINT "schedule_user_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("contest_id") REFERENCES "contest"("id");

ALTER TABLE "visual" ADD CONSTRAINT "visual_fk0" FOREIGN KEY ("contest_id") REFERENCES "contest"("id");

ALTER TABLE "team" ADD CONSTRAINT "team_fk0" FOREIGN KEY ("current_contest") REFERENCES "contest"("id");
