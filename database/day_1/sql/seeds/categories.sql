--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories VALUES (1, 'Beverages', 'Soft drinks, coffees, teas, beers, and ales');
INSERT INTO public.categories VALUES (2, 'Condiments', 'Sweet and savory sauces, relishes, spreads, and seasonings');
INSERT INTO public.categories VALUES (3, 'Confections', 'Desserts, candies, and sweet breads');
INSERT INTO public.categories VALUES (4, 'Dairy Products', 'Cheeses');
INSERT INTO public.categories VALUES (5, 'Grains/Cereals', 'Breads, crackers, pasta, and cereal');
INSERT INTO public.categories VALUES (6, 'Meat/Poultry', 'Prepared meats');
INSERT INTO public.categories VALUES (7, 'Produce', 'Dried fruit and bean curd');
INSERT INTO public.categories VALUES (8, 'Seafood', 'Seaweed and fish');


--
-- PostgreSQL database dump complete
--

