ALTER TABLE IF EXISTS public.users
    ADD COLUMN stripe_user_id character varying(255),

    ADD CONSTRAINT UQ_stripe_user_id UNIQUE (stripe_user_id);

CREATE TABLE public.card
(
    id   uuid                   NOT NULL,
    card_fingerprint character varying(255) NOT NULL,
    user_id uuid NOT NULL,

    CONSTRAINT PK_card PRIMARY KEY (id),
    CONSTRAINT UQ_card_fingerprint UNIQUE (card_fingerprint),
    CONSTRAINT FK_card_users FOREIGN KEY (user_id) REFERENCES public.users(id)
);
