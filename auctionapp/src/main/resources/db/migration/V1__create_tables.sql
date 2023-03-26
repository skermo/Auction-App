CREATE TABLE public.category (
                                 id uuid NOT NULL,
                                 name character varying(255) NOT NULL,

                                 CONSTRAINT PK_category PRIMARY KEY (id),
                                 CONSTRAINT UQ_name UNIQUE (name)
);

CREATE TABLE public.image (
                              id uuid NOT NULL,
                              url character varying(255),
                              item_id uuid,

                              CONSTRAINT PK_image PRIMARY KEY (id)
);

CREATE TABLE public.item (
                             id uuid NOT NULL,
                             description character varying(255) NOT NULL,
                             end_date timestamp(6) without time zone NOT NULL,
                             name character varying(255) NOT NULL,
                             startdate timestamp(6) without time zone NOT NULL,
                             startprice double precision NOT NULL,
                             highestbid double precision,
                             "NoBids" integer,
                             "categoryId" uuid,
                             "subcategoryId" uuid
);

CREATE TABLE public.subcategory (
                                    id uuid NOT NULL,
                                    name character varying(255) NOT NULL,
                                    "categoryId" uuid
);


ALTER TABLE ONLY public.item
    ADD CONSTRAINT FK_item_subcategory FOREIGN KEY (subcategory_id) REFERENCES public.subcategory(id);

ALTER TABLE ONLY public.item
    ADD CONSTRAINT FK_item_category FOREIGN KEY (category_id) REFERENCES public.category(id);


ALTER TABLE ONLY public.subcategory
    ADD CONSTRAINT fkmksucdwjhvtvx1ee4eeb3mmyw FOREIGN KEY ("categoryId") REFERENCES public.category(id);

ALTER TABLE ONLY public.image
    ADD CONSTRAINT FK_image_item FOREIGN KEY (item_id) REFERENCES public.item(id);
