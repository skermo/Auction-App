ALTER TABLE IF EXISTS public.item
    ADD COLUMN seller_id uuid,
    ADD COLUMN buyer_id  uuid,

    ADD CONSTRAINT FK_item_seller FOREIGN KEY (seller_id) REFERENCES public.users (id),
    ADD CONSTRAINT FK_item_buyer FOREIGN KEY (buyer_id) REFERENCES public.users (id);


CREATE TABLE public.bid
(
    id      uuid             NOT NULL,
    item_id uuid             NOT NULL,
    user_id uuid             NOT NULL,
    amount  double precision NOT NULL,

    CONSTRAINT PK_bid PRIMARY KEY (id),
    CONSTRAINT FK_bid_users FOREIGN KEY (user_id) REFERENCES public.users (id),
    CONSTRAINT FK_bid_item FOREIGN KEY (item_id) REFERENCES public.item (id)
);

CREATE OR REPLACE FUNCTION update_highest_price() RETURNS TRIGGER
AS
$update_highest_price$
DECLARE
    TG_item_id       uuid;
    TG_highest_price double precision;
    TG_bid_amount    double precision;
BEGIN

    IF (TG_OP = 'DELETE') THEN

        TG_bid_amount = OLD.amount;
        TG_item_id = OLD.item_id;
        TG_highest_price = (SELECT highest_bid
                            FROM public.item
                            WHERE id = TG_item_id);

        IF (TG_bid_amount = TG_highest_price) THEN
            TG_highest_price = (SELECT MAX(amount)
                                FROM public.bid
                                WHERE id = TG_item_id);
            UPDATE public.item
            SET highest_bid = TG_highest_price
            WHERE id = TG_item_id;
        END IF;


    ELSIF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN

        TG_bid_amount = NEW.amount;
        TG_item_id = NEW.item_id;
        TG_highest_price = (SELECT highest_bid
                            FROM public.item
                            WHERE id = TG_item_id);

        IF (TG_bid_amount > TG_highest_price) THEN
            UPDATE public.item
            SET highest_bid = TG_bid_amount
            WHERE id = TG_item_id;
        END IF;

    END IF;
    RETURN NULL;

END;
$update_highest_price$ LANGUAGE plpgsql;

CREATE TRIGGER update_highest_price
    AFTER INSERT OR UPDATE OR DELETE
    ON bid
    FOR EACH ROW
EXECUTE FUNCTION update_highest_price();


CREATE OR REPLACE FUNCTION update_bid_number() RETURNS TRIGGER
AS
$update_bid_number$
DECLARE
    TG_item_id uuid;
BEGIN

    IF (TG_OP = 'DELETE') THEN

        TG_item_id = OLD.item_id;
        UPDATE public.item
        SET no_bids = no_bids - 1
        WHERE id = TG_item_id;

    ELSIF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN

        TG_item_id = NEW.item_id;
        UPDATE public.item
        SET no_bids = no_bids + 1
        WHERE id = TG_item_id;

    END IF;
    RETURN NULL;

END;
$update_bid_number$ LANGUAGE plpgsql;

CREATE TRIGGER update_bid_number
    AFTER INSERT OR DELETE
    ON bid
    FOR EACH ROW
EXECUTE FUNCTION update_bid_number();

CREATE TABLE public.shipment
(
    id           uuid                   NOT NULL,
    address      character varying(255) NOT NULL,
    country      character varying(255) NOT NULL,
    city         character varying(255) NOT NULL,
    zip          integer                NOT NULL,
    phone_number character varying(255) NOT NULL,
    item_id      uuid                   NOT NULL,

    CONSTRAINT PK_shipment PRIMARY KEY (id),
    CONSTRAINT FK_shipment_item FOREIGN KEY (item_id) REFERENCES public.item (id)
);