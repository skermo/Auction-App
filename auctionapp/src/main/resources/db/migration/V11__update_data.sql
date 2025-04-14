INSERT INTO public.users (id, email, password, first_name, last_name)
VALUES ('ba2e95b6-cbe2-11ed-afa1-0242ac120002', 'test@example.com', 'hashedpassword', 'Test', 'User');

INSERT INTO public.users_role (users_id, role_id)
SELECT 'ba2e95b6-cbe2-11ed-afa1-0242ac120002', id
FROM public.role
WHERE name = 'USER';


UPDATE public.item
SET
  start_date = current_date - ((floor(random() * 7)::int + 1) * interval '1 day'),
  end_date   = (current_date - ((floor(random() * 7)::int + 1) * interval '1 day'))
               + ((floor(random() * 10)::int + 1) * interval '1 day'),
  highest_bid = 0,
  no_bids     = 0,
  seller_id   = 'ba2e95b6-cbe2-11ed-afa1-0242ac120002';
