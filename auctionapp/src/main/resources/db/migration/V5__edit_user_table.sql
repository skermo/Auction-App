ALTER TABLE public.users
    ADD COLUMN address      character varying(255),
    ADD COLUMN city         character varying(255),
    ADD COLUMN zip          character varying(255),
    ADD COLUMN country      character varying(255);