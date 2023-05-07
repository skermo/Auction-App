ALTER TABLE public.shipment
    DROP COLUMN phone_number,
    ALTER COLUMN zip TYPE character varying(255);

ALTER TABLE public.card
    ALTER COLUMN id TYPE character varying(255);