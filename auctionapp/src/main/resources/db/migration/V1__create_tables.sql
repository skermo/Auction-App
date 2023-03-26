CREATE TABLE public.category (
                                 id uuid NOT NULL,
                                 name character varying(255) NOT NULL
);

CREATE TABLE public.image (
                              id uuid NOT NULL,
                              url character varying(255),
                              "itemId" uuid
);

CREATE TABLE public.item (
                             id uuid NOT NULL,
                             description character varying(255) NOT NULL,
                             enddate timestamp(6) without time zone NOT NULL,
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

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.subcategory
    ADD CONSTRAINT subcategory_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.category
    ADD CONSTRAINT uk_foei036ov74bv692o5lh5oi66 UNIQUE (name);

ALTER TABLE ONLY public.item
    ADD CONSTRAINT fk1axmceldpq5qvvr25dgevagar FOREIGN KEY ("subcategoryId") REFERENCES public.subcategory(id);

ALTER TABLE ONLY public.item
    ADD CONSTRAINT fk5fpnq5hcxchphbw6r1i4qxunb FOREIGN KEY ("categoryId") REFERENCES public.category(id);


ALTER TABLE ONLY public.subcategory
    ADD CONSTRAINT fkmksucdwjhvtvx1ee4eeb3mmyw FOREIGN KEY ("categoryId") REFERENCES public.category(id);

ALTER TABLE ONLY public.image
    ADD CONSTRAINT fkp9t412441m0rt5lu0vaxck291 FOREIGN KEY ("itemId") REFERENCES public.item(id);
