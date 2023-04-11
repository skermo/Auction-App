CREATE TABLE public.users
(
    id                uuid                   NOT NULL,
    email             character varying(255) NOT NULL,
    password          character varying(255) NOT NULL,
    first_name        character varying(255) NOT NULL,
    last_name         character varying(255) NOT NULL,
    profile_photo_url character varying(255),
    phone_number      character varying(255),

    CONSTRAINT PK_users PRIMARY KEY (id),
    CONSTRAINT UQ_users_email UNIQUE (email)
);

CREATE TABLE public.role
(
    id   uuid                   NOT NULL,
    name character varying(255) NOT NULL,

    CONSTRAINT PK_role PRIMARY KEY (id),
    CONSTRAINT UQ_role_name UNIQUE (name)
);

CREATE TABLE public.users_role
(
    users_id uuid NOT NULL REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
    role_id  uuid NOT NULL REFERENCES role (id) ON UPDATE CASCADE ON DELETE CASCADE,

    CONSTRAINT PK_users_role PRIMARY KEY (users_id, role_id)
);

INSERT INTO public.role(id, name)
VALUES ('013d53be-d6e9-11ed-afa1-0242ac120002', 'ADMIN');

INSERT INTO public.role(id, name)
VALUES ('013d576a-d6e9-11ed-afa1-0242ac120002', 'USER');