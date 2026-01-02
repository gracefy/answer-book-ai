--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Debian 16.8-1.pgdg120+1)
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
-- SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: History; Type: TABLE; Schema: public; OWNER: neondb_owner
--

CREATE TABLE public."History" (
    id text NOT NULL,
    "userId" text NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."History" OWNER TO neondb_owner;

--
-- Name: User; Type: TABLE; Schema: public; OWNER: neondb_owner
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    username text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO neondb_owner;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; OWNER: neondb_owner
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO neondb_owner;

--
-- Data for Name: History; Type: TABLE DATA; Schema: public; OWNER: neondb_owner
--

COPY public."History" (id, "userId", question, answer, "createdAt", "updatedAt") FROM stdin;
cmalcfjqv00028oxsbzd2hc95	cmalcdznz00008oxskr8b5zmk	What is the meaning of curiosity?	Curiosity is the shimmering candlelight that dances in the shadows of the unknown, beckoning the soul to explore.	2025-05-12 17:15:03.962	2025-05-12 17:15:03.962
cmalcg4z300048oxsg0cyq0dg	cmalcdznz00008oxskr8b5zmk	Why do humans seek answers?	In the vast tapestry of night, souls wander, stitching threads of doubt with the needle of yearning truth.	2025-05-12 17:15:31.474	2025-05-12 17:15:31.474
cmalcgccw00068oxsx6p4g5mi	cmalcdznz00008oxskr8b5zmk	What lies beyond what we know?	In the whispering shadows of the unknown, dreams dance like fireflies in the twilight of possibility.	2025-05-12 17:15:41.072	2025-05-12 17:15:41.072
cmalcgkwy00088oxsurzfl2ot	cmalcdznz00008oxskr8b5zmk	Give me a thought to start my day.	Awake with the sun's embrace, for today is a canvas yet unpainted, waiting for your brush to dance.	2025-05-12 17:15:52.132	2025-05-12 17:15:52.132
cmalcgreh000a8oxsd48rbtui	cmalcdznz00008oxskr8b5zmk	What should I reflect on tonight?	In the quiet hush of night, seek the stars hidden within your soul's darkness.	2025-05-12 17:16:00.57	2025-05-12 17:16:00.57
cmalcgydx000c8oxsslwo7shh	cmalcdznz00008oxskr8b5zmk	Suggest a mantra to calm the mind.	Like ripples on a still pond, breathe in peace, exhale chaos, and find the silence within.	2025-05-12 17:16:09.593	2025-05-12 17:16:09.593
cmalchp4t000e8oxsl5hnq7jx	cmalcdznz00008oxskr8b5zmk	What does the universe want me to know today?	In the dance of stars, your dreams whisper; tend to the embers, for they ignite the path of your becoming.	2025-05-12 17:16:44.256	2025-05-12 17:16:44.256
cmalci482000g8oxst6su4xrm	cmalcdznz00008oxskr8b5zmk	What is hidden between the lines of time?	In the silence of shadows, whispers of forgotten dreams intertwine with the fabric of destiny's tapestry.	2025-05-12 17:17:03.813	2025-05-12 17:17:03.813
cmalcl26g000n8oxszuaiyq2q	cmalckw5w000l8oxs0bd3cvlt	If the stars could speak, what would they say?	They would whisper secrets of timeless journeys, painting dreams upon the canvas of night’s infinite embrace.	2025-05-12 17:19:21.161	2025-05-12 17:19:21.161
cmaluhzpf00018oa8juo0pkd0	cmaltu4ne0000jr04j9l3yagr	If the stars could speak, what would they say?	They would whisper secrets of eternity, woven in the silken threads of night’s vast tapestry.	2025-05-13 01:40:51.04	2025-05-13 01:40:51.04
cman6ue2q0001ro0gxzsburjl	cmalcdznz00008oxskr8b5zmk	If the stars could speak, what would they say?	They would whisper secrets of time, weaving dreams through the fabric of night, illuminating hearts like cosmic lanterns.	2025-05-14 00:14:11.138	2025-05-14 00:14:11.138
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; OWNER: neondb_owner
--

COPY public."User" (id, email, password, username, "createdAt", "updatedAt") FROM stdin;
cmalcdznz00008oxskr8b5zmk	test@example.com	$argon2id$v=19$m=65536,t=3,p=4$Ojp5FK/8pfpJdXKeqnZUQw$FPwfTo6rg/Pp0XDadTa/57iVD856aP2nPvLD58x2Syo	TestUser	2025-05-12 17:13:51.312	2025-05-12 17:13:51.312
cmalckw5w000l8oxs0bd3cvlt	grace@test.com	$argon2id$v=19$m=65536,t=3,p=4$FkyCS+Ss+gGqIm0/IommRA$y1k/w8BvHQcH0sKR0E8zXGTz7UW91Z2j8HrI7nNDBMc	Grace	2025-05-12 17:19:13.364	2025-05-12 17:19:13.364
cmaltu4ne0000jr04j9l3yagr	juice@test.com	$argon2id$v=19$m=65536,t=3,p=4$EfHs+HfUywSsWPbbPd+8ng$txqUWBKz2Lm3DOqGEkK0OoQId6GRIJfyKJwkZGlA0zw	Juice	2025-05-13 01:22:17.739	2025-05-13 01:22:17.739
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; OWNER: neondb_owner
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
450f323f-1963-42bc-95b4-bc9c6b718b01	b17dc25fc21081dc7308cdba074fbd97b65b1e5200eb89a4f0f06b533715286e	2025-05-12 17:00:55.986795+00	20250511195630_init	\N	\N	2025-05-12 17:00:55.828537+00	1
\.


--
-- Name: History History_pkey; Type: CONSTRAINT; Schema: public; OWNER: neondb_owner
--

ALTER TABLE ONLY public."History"
    ADD CONSTRAINT "History_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; OWNER: neondb_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; OWNER: neondb_owner
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; OWNER: neondb_owner
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: History History_userId_fkey; Type: FK CONSTRAINT; Schema: public; OWNER: neondb_owner
--

ALTER TABLE ONLY public."History"
    ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

