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


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc230c-d23f-11ed-afa1-0242ac120002',
        'Patchwork Knitted Sweater Top Hollow Out Crochet T-shirt Women Sweater Pullovers Fairycore Streetwear',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-02-19', '2023-07-14', 16, 17, 3, '49ab3206-c659-11ed-afa1-0242ac120002',
        'ba2e7aae-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc264a-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H21f0299fb28f4293bdae06b2adcfb777K.jpg_960x960.jpg',
        'c1cc230c-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc27b2-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hf79d13bef53d446084e3c7b0eb3e79d3F.jpg_960x960.jpg',
        'c1cc230c-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc2910-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H5f7bd0104901433eaa73199c7afc2faat.jpg_960x960.jpg',
        'c1cc230c-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc2eba-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H3bd3760386bb4ee9a4e0a26592fe3fa3P.jpg_960x960.jpg',
        'c1cc230c-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc3176-d23f-11ed-afa1-0242ac120002',
        'European Clothing Women Elegant Short Tops Summer Ruffled Retro Vintage Pleated Floral Print Blouse',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-03-15', '2023-09-15', 19, 23, 7, '49ab3206-c659-11ed-afa1-0242ac120002',
        'ba2e7aae-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc339c-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H7690d227b8f0460b8fbead1ddeffcfdfP.jpg_960x960.jpg',
        'c1cc3176-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc3586-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H72711a508ff248baae73a69e20c58f52a.jpg_960x960.jpg',
        'c1cc3176-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc369e-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hb20a0cbdf07049c1b22bf76f4fd07f7cH.jpg_960x960.jpg',
        'c1cc3176-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc37ac-d23f-11ed-afa1-0242ac120002',
        'American retro heavy short sleeved men suede t-shirt European tide brand clothes loose trendy y2k top sleeves oversized t shirt',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-01-24', '2023-10-02', 18, 25, 1, '49ab3206-c659-11ed-afa1-0242ac120002',
        'ba2e7aae-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc38d8-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H7d52b6852bd34035962843a3428562481.jpg_960x960.jpg',
        'c1cc37ac-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc39dc-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hd2ad6ff467bd44b0a14911487a90a786u.jpg_960x960.jpg',
        'c1cc37ac-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc4076-d23f-11ed-afa1-0242ac120002',
        'Custom Hot Jeans Women Ripped jeans women''s summer thin section high waist straight wide leg mopping pants jeans women''s pants',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-03-03', '2023-11-29', 30, 35, 3, '49ab3206-c659-11ed-afa1-0242ac120002',
        'ba2e7c20-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc41ca-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H2ed4b63459c34c64acef4a130c74be5bn.jpg_960x960.jpg',
        'c1cc4076-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc42ec-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H8762325feec44addb42ba96515ffd425U.jpg_960x960.jpg',
        'c1cc4076-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc44fe-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/He5b80913061d43729afb1b24b159cf5fc.jpg_960x960.jpg',
        'c1cc4076-d23f-11ed-afa1-0242ac120002');

INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc479c-d23f-11ed-afa1-0242ac120002',
        '2023 Newest Style Men''s Hiking Pants Quick Dry Men''s Casual Pants Fashion Design and Optional Color Pants for Men',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-04-01', '2023-08-08', 22, 23, 1, '49ab3206-c659-11ed-afa1-0242ac120002',
        'ba2e7c20-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc48f0-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hd435baedac2e47a6b3788e1f0b933e4cw.jpg_960x960.jpg',
        'c1cc479c-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc49fe-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H8253917de4df46f4b8b53779ed15cb28L.jpg_960x960.jpg',
        'c1cc479c-d23f-11ed-afa1-0242ac120002');

INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc4b2a-d23f-11ed-afa1-0242ac120002',
        '2023 new crossbody bags for women shoulder handbag designer handbags purses crossbody bags for women',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-01-01', '2023-09-10', 5, 9, 4, '49ab35a8-c659-11ed-afa1-0242ac120002',
        'ba2e854e-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc5020-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H41b3e1ea4a1c4f90bf9fa935f2a5c09ac.jpg_960x960.jpg',
        'c1cc4b2a-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc5174-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H544ad0a9b3864cf7b51b1760deaef6ca9.jpg_960x960.jpg',
        'c1cc4b2a-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc52aa-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H0a0a24c60fb44a1ab9e510b7b609277dM.jpg_960x960.jpg',
        'c1cc4b2a-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc541c-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H71bc301845c64359a6ea9c8c7201585aZ.jpg_960x960.jpg',
        'c1cc4b2a-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc55d4-d23f-11ed-afa1-0242ac120002',
        'Colorful Transparent Acrylic Frame Box Chain Wedding Clutch Purse Women Evening Box Clear Acrylic Clutch Bag,Acrylic Purse',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-04-02', '2023-11-23', 14, 15, 2, '49ab35a8-c659-11ed-afa1-0242ac120002',
        'ba2e854e-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc575a-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hb238e84eecee4c829494a290c10380f0v.jpg_960x960.jpg',
        'c1cc55d4-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc5886-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Ha75f29d69ec64dc784915fb6dc790a0fc.jpg_960x960.jpg',
        'c1cc55d4-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc59e4-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hd48c4e8239cf45c493fd5550d8079b7aK.jpg_960x960.jpg',
        'c1cc55d4-d23f-11ed-afa1-0242ac120002');

INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc5dcc-d23f-11ed-afa1-0242ac120002',
        'Wholesale women girl hairband hair accessory vintage wide women cloth head bands thick Satin sponge padded headbands',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-03-05', '2023-12-12', 3, 5, 2, '49ab35a8-c659-11ed-afa1-0242ac120002',
        'ba2e88fa-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc5f02-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H15fca60fbdf44e3aa47ef950f252f156V.jpg_960x960.jpg',
        'c1cc5dcc-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc606a-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H4dfccaf59caf4189b2d49b0c6421c9e2X.jpg_960x960.jpg',
        'c1cc5dcc-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc61be-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hb6d476a1d64847fb87e66ac75bd28edbU.jpg_960x960.jpg',
        'c1cc5dcc-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc6308-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H482986111b274d80a343de3a621e41dcB.jpg_960x960.jpg',
        'c1cc5dcc-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc6448-d23f-11ed-afa1-0242ac120002',
        'Trendy Multiple Colors Butterfly Necklace Thin Chain Colorful Pendant Necklace for Women Jewelry',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-01-04', '2023-11-11', 34, 38, 6, '49ab3724-c659-11ed-afa1-0242ac120002',
        'ba2e8a8a-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc656a-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H41ac8cedc4b545f18904041d1feef6a3q.jpg_960x960.jpg',
        'c1cc6448-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc66b4-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hfdcac023e2e44999b060a5a5f2eae3f1c.jpg_960x960.jpg',
        'c1cc6448-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc6bfa-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H613aebebf1d54284be3ab137893457628.jpg_960x960.jpg',
        'c1cc6448-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc6d44-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hbecae98ca10d4b0094e77469dcae72c1v.jpg_960x960.jpg',
        'c1cc6448-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc6e66-d23f-11ed-afa1-0242ac120002',
        'Simple Design Alloy Long Choker Women Pendant Jewelry Necklace For Women',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-02-20', '2023-08-14', 14, 20, 8, '49ab3724-c659-11ed-afa1-0242ac120002',
        'ba2e8a8a-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc6f6a-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H82a6cc74cadf4877b34bae1675c83ae3N.jpg_960x960.jpg',
        'c1cc6e66-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc7078-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H6b325caa312945e0b768e756170bf7e8W.jpg_960x960.jpg',
        'c1cc6e66-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc7190-d23f-11ed-afa1-0242ac120002',
        'Fashion Vintage 3 colors Necklace Chain For Women Jewelry Accessories Wholesale Heart Pendants Necklace',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-04-02', '2023-07-20', 50, 55, 3, '49ab3724-c659-11ed-afa1-0242ac120002',
        'ba2e8a8a-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc72ee-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H63b7f74271f84e69805e3fd85051e2b6f.jpg_960x960.jpg',
        'c1cc7190-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc7424-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H504c8d120ecb40589de818d12779db797.jpg_960x960.jpg',
        'c1cc7190-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc7712-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H79ead41b33d64a009ce830612d0ed0f11.jpg_960x960.jpg',
        'c1cc7190-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc7834-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hc131adcd89d7430cb0e930a6d5d41445Q.jpg_960x960.jpg',
        'c1cc7190-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc7956-d23f-11ed-afa1-0242ac120002',
        'Hot selling exquisite popular stainless steel jewelry for women rings star heart shaped fashion rings',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-03-03', '2023-09-11', 16, 22, 9, '49ab3724-c659-11ed-afa1-0242ac120002',
        'ba2e8b8e-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc7a6e-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H9904af2aa2c74a6ca34adcfdf5c80898m.jpg_960x960.jpg',
        'c1cc7956-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc7c30-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hb90a72dbfabb421b8e4371f1de98811an.jpg_960x960.jpg',
        'c1cc7956-d23f-11ed-afa1-0242ac120002');

INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc7d5c-d23f-11ed-afa1-0242ac120002',
        'Promotional The Latest Ten-piece Gold Plated Heart Moon Adjustable Diamond Knuckle Ring Set',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-04-02', '2023-07-07', 10, 12, 1, '49ab3724-c659-11ed-afa1-0242ac120002',
        'ba2e8b8e-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc7ef6-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H18afe90af0bd42e4bef06a7a0ddb9a6cp.jpg_960x960.jpg',
        'c1cc7d5c-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc8298-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H2aefd8f2638f43d28c2857084e6d1b2el.jpg_960x960.jpg',
        'c1cc7d5c-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc83ec-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H2ab7bc04e14f464f9bfcf941d546a483T.jpg_960x960.jpg',
        'c1cc7d5c-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc882e-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hca1f7201f97c46709ef4280e756defdfi.jpg_960x960.jpg',
        'c1cc7d5c-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc8a18-d23f-11ed-afa1-0242ac120002',
        'Summer slippers sandals women flat beach slippers Wear-resistant casual sandals ladies shoes',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-02-28', '2023-07-22', 38, 44, 10, '49ab3850-c659-11ed-afa1-0242ac120002',
        'ba2e8d1e-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc8b76-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H06353d19d5c84a4a85132a1e32d6ed17x.jpg_960x960.jpg',
        'c1cc8a18-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc8c98-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H2eaa9402d7b74290931b8a84f3abbad4M.jpg_960x960.jpg',
        'c1cc8a18-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc8db0-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H18be1672e08e4138bd86b5793fb2b7a3z.jpg_960x960.jpg',
        'c1cc8a18-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc933c-d23f-11ed-afa1-0242ac120002',
        'Hot Sale Women Sandals New Design Toe Open Flat Sandals For Women and Ladies',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-01-19', '2023-08-06', 32, 33, 1, '49ab3850-c659-11ed-afa1-0242ac120002',
        'ba2e8d1e-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc9544-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H3cc3d7af26a9434f848e5dddba5418cdp.jpg_960x960.jpg',
        'c1cc933c-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc9684-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H2943633042f141ca8b0c71d22105c3fdv.jpg_960x960.jpg',
        'c1cc933c-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cc97a6-d23f-11ed-afa1-0242ac120002',
        'New Brand Basketball Shoes Air Cushion Sneakers Skateboard Sport Shoes Sneakers Retro 4 Basketball Shoes',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-04-04', '2023-07-29', 65, 73, 8, '49ab3850-c659-11ed-afa1-0242ac120002',
        'ba2e8ea4-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc98b4-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hdd6c1c55f6f54becab6d663e2058b4bai.jpg_960x960.jpg',
        'c1cc97a6-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc99cc-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H2135a9a8dad94dd0ad0168368738f3c19.jpg_960x960.jpg',
        'c1cc97a6-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc9ada-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H6390114ce7b4406693c97857f640a165t.jpg_960x960.jpg',
        'c1cc97a6-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cc9ef4-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/He68803727459490389a87a0053213d16e.jpg_960x960.jpg',
        'c1cc97a6-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cca016-d23f-11ed-afa1-0242ac120002',
        'Genuine Leather High Quality 2022 New Saling Wholesale sneakers shoes for man shoes 550',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-03-09', '2023-09-17', 88, 99, 4, '49ab3850-c659-11ed-afa1-0242ac120002',
        'ba2e8ea4-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1cca11a-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H32a218940aa14aca809ebb88ddb356a1s.jpg_960x960.jpg',
        'c1cca016-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cca21e-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/He10aaa3cfc9c415399018f0800fe8a89e.jpg_960x960.jpg',
        'c1cca016-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cca336-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H80085e19cf474a3caa10553210bf5ce5G.jpg_960x960.jpg',
        'c1cca016-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1cca43a-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hb201b221f88741b58b5b84dc0bd43a134.jpg_960x960.jpg',
        'c1cca016-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1cca692-d23f-11ed-afa1-0242ac120002',
        'High performance Yoga leggings custom logo printed buttery soft tummy control solid color Yoga Pants for women',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-03-16', '2023-07-16', 36, 45, 18, '49ab397c-c659-11ed-afa1-0242ac120002',
        'ba2e9336-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1ccacbe-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Ae54bfd0af11c461a9270939ca4a8b3ac9.jpg_960x960.jpg',
        'c1cca692-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1ccade0-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/A2ce268748ac1486e8fac35955e0caa48k.jpg_960x960.jpg',
        'c1cca692-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1ccaef8-d23f-11ed-afa1-0242ac120002',
        'Low MOQ OEM ODM High Quality Women Gym Padded Sexy Seamless High Impact Workout Fitness Yoga Plus Size Sports Bra',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-04-03', '2023-07-18', 18, 22, 4, '49ab397c-c659-11ed-afa1-0242ac120002',
        'ba2e95b6-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1ccb010-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H51205feb04d54726b74fdccbe0a69982g.jpg_960x960.jpg',
        'c1ccaef8-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1ccb11e-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H9b3111b9071340589567f42638e4da42o.jpg_960x960.jpg',
        'c1ccaef8-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1ccb22c-d23f-11ed-afa1-0242ac120002',
        '2023 Sports Bra Top Fitness Workout Training Y Back Yoga Wear For Women Seamless Women Sports Bra top fitness',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-03-31', '2023-08-31', 25, 27, 1, '49ab397c-c659-11ed-afa1-0242ac120002',
        'ba2e95b6-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1ccb33a-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H2593a0f0e65f45859661eb44ce14cb7eX.jpg_960x960.jpg',
        'c1ccb22c-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1ccb664-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hf8eebac88915417d82b2201571edb54bg.jpg_960x960.jpg',
        'c1ccb22c-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1ccb79a-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H82548da4fe484db0b275037288ee3f19Y.jpg_960x960.jpg',
        'c1ccb22c-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1ccb8a8-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H607d03c87995495dac14da044631c2bdo.jpg_960x960.jpg',
        'c1ccb22c-d23f-11ed-afa1-0242ac120002');


INSERT INTO public.item (id, name, description, start_date, end_date, start_price, highest_bid, no_bids, category_id,
                         subcategory_id)
VALUES ('c1ccb9ca-d23f-11ed-afa1-0242ac120002',
        'Gym Fitness Bra Sportswear Sports Tops Tights Fitness Training Sports Bras',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        '2023-04-01', '2023-08-10', 11, 17, 3, '49ab397c-c659-11ed-afa1-0242ac120002',
        'ba2e95b6-cbe2-11ed-afa1-0242ac120002');

INSERT INTO public.image(id, url, item_id)
VALUES ('c1ccbad8-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H136cb28f6104449282147703955d9b68Q.png_960x960.png',
        'c1ccb9ca-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1ccbbe6-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/Hd2b2364e337943f09ca8da456d89787cR.jpg_960x960.jpg',
        'c1ccb9ca-d23f-11ed-afa1-0242ac120002');
INSERT INTO public.image(id, url, item_id)
VALUES ('c1ccbcf4-d23f-11ed-afa1-0242ac120002',
        'https://s.alicdn.com/@sc04/kf/H9772590b92f947acbecf2504e9d9dccb3.jpg_960x960.jpg',
        'c1ccb9ca-d23f-11ed-afa1-0242ac120002');

