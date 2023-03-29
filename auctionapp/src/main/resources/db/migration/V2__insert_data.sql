INSERT INTO public.category (id, name)
VALUES ('49ab3206-c659-11ed-afa1-0242ac120002', 'Fashion');
INSERT INTO public.category (id, name)
VALUES ('49ab35a8-c659-11ed-afa1-0242ac120002', 'Accessories');
INSERT INTO public.category (id, name)
VALUES ('49ab3724-c659-11ed-afa1-0242ac120002', 'Jewelry');
INSERT INTO public.category (id, name)
VALUES ('49ab3850-c659-11ed-afa1-0242ac120002', 'Shoes');
INSERT INTO public.category (id, name)
VALUES ('49ab397c-c659-11ed-afa1-0242ac120002', 'Sportswear');


INSERT INTO public.subcategory (id, name, category_id)
VALUES ('ba2e7aae-cbe2-11ed-afa1-0242ac120002', 'Tops', '49ab3206-c659-11ed-afa1-0242ac120002');
INSERT INTO public.subcategory (id, name, category_id)
VALUES ('ba2e7c20-cbe2-11ed-afa1-0242ac120002', 'Pants', '49ab3206-c659-11ed-afa1-0242ac120002');
INSERT INTO public.subcategory (id, name, category_id)
VALUES ('ba2e854e-cbe2-11ed-afa1-0242ac120002', 'Bags', '49ab35a8-c659-11ed-afa1-0242ac120002');
INSERT INTO public.subcategory (id, name, category_id)
VALUES ('ba2e88fa-cbe2-11ed-afa1-0242ac120002', 'Headbands', '49ab35a8-c659-11ed-afa1-0242ac120002');
INSERT INTO public.subcategory (id, name, category_id)
VALUES ('ba2e8a8a-cbe2-11ed-afa1-0242ac120002', 'Necklaces', '49ab3724-c659-11ed-afa1-0242ac120002');
INSERT INTO public.subcategory (id, name, category_id)
VALUES ('ba2e8b8e-cbe2-11ed-afa1-0242ac120002', 'Rings', '49ab3724-c659-11ed-afa1-0242ac120002');
INSERT INTO public.subcategory (id, name, category_id)
VALUES ('ba2e8d1e-cbe2-11ed-afa1-0242ac120002', 'Sandals', '49ab3850-c659-11ed-afa1-0242ac120002');
INSERT INTO public.subcategory (id, name, category_id)
VALUES ('ba2e8ea4-cbe2-11ed-afa1-0242ac120002', 'Sneakers', '49ab3850-c659-11ed-afa1-0242ac120002');
INSERT INTO public.subcategory (id, name, category_id)
VALUES ('ba2e9336-cbe2-11ed-afa1-0242ac120002', 'Leggings', '49ab397c-c659-11ed-afa1-0242ac120002');
INSERT INTO public.subcategory (id, name, category_id)
VALUES ('ba2e95b6-cbe2-11ed-afa1-0242ac120002', 'Sports bras', '49ab397c-c659-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, description, end_date, name, start_date, start_price, category_id, subcategory_id,
                         highest_bid, no_bids)
VALUES ('49ab4444-c659-11ed-afa1-0242ac120002',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. ',
        '2023-05-05 00:00:00', 'Running Shoes', '2023-02-02 00:00:00', 59, '49ab3850-c659-11ed-afa1-0242ac120002',
        'ba2e8ea4-cbe2-11ed-afa1-0242ac120002', 60, 3);
INSERT INTO public.item (id, description, end_date, name, start_date, start_price, category_id, subcategory_id,
                         highest_bid, no_bids)
VALUES ('49ab52b8-c659-11ed-afa1-0242ac120002',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla pellentesque dignissim enim sit amet venenatis. Vitae ultricies leo integer malesuada nunc vel risus commodo.',
        '2023-03-31 00:00:00', 'Shirt', '2023-03-15 00:00:00', 18, '49ab3206-c659-11ed-afa1-0242ac120002',
        'ba2e7aae-cbe2-11ed-afa1-0242ac120002', 24, 2);
INSERT INTO public.item (id, description, end_date, name, start_date, start_price, category_id, subcategory_id,
                         highest_bid, no_bids)
VALUES ('cb8f54de-c814-11ed-afa1-0242ac120002',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        '2023-04-30 00:00:00', 'Pants', '2023-03-20 00:00:00', 27, '49ab3206-c659-11ed-afa1-0242ac120002',
        'ba2e7c20-cbe2-11ed-afa1-0242ac120002', 35, 2);
INSERT INTO public.item (id, description, end_date, name, start_date, start_price, category_id, subcategory_id,
                         highest_bid, no_bids)
VALUES ('cb8f51f0-c814-11ed-afa1-0242ac120002',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla pellentesque dignissim enim sit amet venenatis. Vitae ultricies leo integer malesuada nunc vel risus commodo.',
        '2023-05-23 00:00:00', 'Butterfly Jewelry', '2023-01-29 00:00:00', 78, '49ab3724-c659-11ed-afa1-0242ac120002',
        'ba2e8a8a-cbe2-11ed-afa1-0242ac120002', 86, 6);
INSERT INTO public.item (id, description, end_date, name, start_date, start_price, category_id, subcategory_id,
                         highest_bid, no_bids)
VALUES ('cb8f4f02-c814-11ed-afa1-0242ac120002',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla pellentesque dignissim enim sit amet venenatis. Vitae ultricies leo integer malesuada nunc vel risus commodo.',
        '2023-05-22 00:00:00', 'Leggings ', '2023-01-23 00:00:00', 33, '49ab397c-c659-11ed-afa1-0242ac120002',
        'ba2e9336-cbe2-11ed-afa1-0242ac120002', 43, 8);

INSERT INTO public.image (id, url, item_id)
VALUES ('49ab5178-c659-11ed-afa1-0242ac120002',
        'https://www.seekpng.com/png/full/252-2523372_women-running-shoes-png-image-running-shoe.png',
        '49ab4444-c659-11ed-afa1-0242ac120002');
INSERT INTO public.image (id, url, item_id)
VALUES ('ba2ea6dc-cbe2-11ed-afa1-0242ac120002', 'https://i.ebayimg.com/images/g/3iIAAOSwCBVjy0FF/s-l500.jpg',
        '49ab4444-c659-11ed-afa1-0242ac120002');
INSERT INTO public.image (id, url, item_id)
VALUES ('ba2ea86c-cbe2-11ed-afa1-0242ac120002',
        'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/869aa196-c592-4614-b8a6-6d8573ce7492/terra-kiger-8-trail-running-shoes-D6vrh1.png',
        '49ab4444-c659-11ed-afa1-0242ac120002');
INSERT INTO public.image (id, url, item_id)
VALUES ('ba2ead12-cbe2-11ed-afa1-0242ac120002',
        'https://media.wired.com/photos/62f597aa6896acbb4eb3394f/3:2/w_1280%2Cc_limit/Hoka-Kawana-SOURCE-Hoka-Gear.jpg',
        '49ab4444-c659-11ed-afa1-0242ac120002');
INSERT INTO public.image (id, url, item_id)
VALUES ('ba2eae66-cbe2-11ed-afa1-0242ac120002',
        'https://media.cnn.com/api/v1/images/stellar/prod/230131115916-hoka-sneakers-stock.jpg?c=original',
        '49ab4444-c659-11ed-afa1-0242ac120002');
INSERT INTO public.image (id, url, item_id)
VALUES ('49ab5718-c659-11ed-afa1-0242ac120002',
        'https://i.pinimg.com/originals/42/6c/8f/426c8fc07a9577467c58c5bebcd5ed13.png',
        '49ab52b8-c659-11ed-afa1-0242ac120002');
INSERT INTO public.image (id, url, item_id)
VALUES ('cb8f5376-c814-11ed-afa1-0242ac120002',
        'https://cdn11.bigcommerce.com/s-c7qlm8a06j/images/stencil/1280x1280/products/2932/29365/90s-aesthetic-vintage-solid-green-pants-cosmique-studio__25119.1643985553.1280.1280__59664.1668082282.png?c=1?imbypass=on',
        'cb8f54de-c814-11ed-afa1-0242ac120002');
INSERT INTO public.image (id, url, item_id)
VALUES ('cb8f5088-c814-11ed-afa1-0242ac120002',
        'https://i.pinimg.com/originals/fb/e3/f5/fbe3f5552f8bca53ce13435d232e56da.png',
        'cb8f51f0-c814-11ed-afa1-0242ac120002');
INSERT INTO public.image (id, url, item_id)
VALUES ('cb8f4bba-c814-11ed-afa1-0242ac120002',
        'https://www.etonline.com/sites/default/files/images/2022-09/Screen%20Shot%202022-09-23%20at%2010.36.35%20AM.png',
        'cb8f4f02-c814-11ed-afa1-0242ac120002');