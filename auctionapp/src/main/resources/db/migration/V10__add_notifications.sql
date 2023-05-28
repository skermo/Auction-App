CREATE TABLE public.notification (
    id uuid NOT NULL,
    item_id uuid NOT NULL,
    user_id uuid NOT NULL,
    type character varying(255) NOT NULL,
    date_time timestamp with time zone NOT NULL,

    CONSTRAINT PK_notification PRIMARY KEY (id),
    CONSTRAINT FK_notification_item FOREIGN KEY (item_id) REFERENCES public.item (id),
    CONSTRAINT FK_notification_users FOREIGN KEY (user_id) REFERENCES public.users(id)
);