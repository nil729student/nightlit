--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: root
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO root;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: root
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Club; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Club" (
    id integer NOT NULL,
    name text,
    amenity text NOT NULL,
    "addrCity" text,
    "addrStreet" text,
    "addrHouseNumber" text,
    addrpostcode text,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    website text,
    instagram text,
    facebook text,
    phone text,
    email text,
    "nodeId" text NOT NULL,
    rating double precision,
    information text
);


ALTER TABLE public."Club" OWNER TO root;

--
-- Name: Club_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Club_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Club_id_seq" OWNER TO root;

--
-- Name: Club_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Club_id_seq" OWNED BY public."Club".id;


--
-- Name: Playlist; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Playlist" (
    id integer NOT NULL,
    "clubId" integer NOT NULL,
    "songId" integer NOT NULL
);


ALTER TABLE public."Playlist" OWNER TO root;

--
-- Name: Playlist_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Playlist_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Playlist_id_seq" OWNER TO root;

--
-- Name: Playlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Playlist_id_seq" OWNED BY public."Playlist".id;


--
-- Name: Song; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Song" (
    id integer NOT NULL,
    title text NOT NULL,
    artist text NOT NULL
);


ALTER TABLE public."Song" OWNER TO root;

--
-- Name: SongVote; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."SongVote" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "songId" integer NOT NULL,
    vote integer NOT NULL,
    week timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SongVote" OWNER TO root;

--
-- Name: SongVote_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."SongVote_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SongVote_id_seq" OWNER TO root;

--
-- Name: SongVote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."SongVote_id_seq" OWNED BY public."SongVote".id;


--
-- Name: Song_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Song_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Song_id_seq" OWNER TO root;

--
-- Name: Song_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Song_id_seq" OWNED BY public."Song".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL
);


ALTER TABLE public."User" OWNER TO root;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO root;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Vote; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Vote" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "clubId" integer NOT NULL,
    vote integer NOT NULL,
    week timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Vote" OWNER TO root;

--
-- Name: Vote_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Vote_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Vote_id_seq" OWNER TO root;

--
-- Name: Vote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Vote_id_seq" OWNED BY public."Vote".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public._prisma_migrations OWNER TO root;

--
-- Name: Club id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Club" ALTER COLUMN id SET DEFAULT nextval('public."Club_id_seq"'::regclass);


--
-- Name: Playlist id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Playlist" ALTER COLUMN id SET DEFAULT nextval('public."Playlist_id_seq"'::regclass);


--
-- Name: Song id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Song" ALTER COLUMN id SET DEFAULT nextval('public."Song_id_seq"'::regclass);


--
-- Name: SongVote id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SongVote" ALTER COLUMN id SET DEFAULT nextval('public."SongVote_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: Vote id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Vote" ALTER COLUMN id SET DEFAULT nextval('public."Vote_id_seq"'::regclass);


--
-- Data for Name: Club; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Club" (id, name, amenity, "addrCity", "addrStreet", "addrHouseNumber", addrpostcode, latitude, longitude, website, instagram, facebook, phone, email, "nodeId", rating, information) FROM stdin;
436	Hype	nightclub	Gurb	Av. de la Ribera 6	10	\N	41.9451666	2.249793	\N	\N	\N	\N	\N	node/11690535935	\N	\N
291	la Font del Balç	nightclub	\N	\N	\N	\N	42.0384133	1.8786451	\N	\N	\N	\N	\N	node/317180461	\N	\N
292	Sunset Jazzclub	nightclub	\N	\N	\N	\N	41.9889466	2.8242557	\N	\N	\N	\N	\N	node/805202229	\N	\N
293	El Pati del Rabí	nightclub	\N	\N	\N	\N	41.9870099	2.8252328	\N	\N	\N	\N	\N	node/805202318	\N	\N
294	Cocteleria "Skiros"	nightclub	\N	\N	\N	\N	41.506437	2.3866685	\N	\N	\N	\N	\N	node/838773538	\N	\N
295	Burriac Café	nightclub	Vilassar de Mar	Plaça Can Mi	\N	\N	41.5026565	2.392382	\N	\N	\N	\N	\N	node/843363548	\N	\N
296	Fata Morgana	nightclub	\N	\N	\N	\N	42.1600031	3.1096754	\N	\N	\N	\N	\N	node/895569899	\N	\N
297	Zero	nightclub	\N	\N	\N	\N	41.1126101	1.2494906	\N	\N	\N	\N	\N	node/995925448	\N	\N
298	Salamandra 1	nightclub	L'Hospitalet de Llobregat	Avinguda del Carrilet	235	\N	41.3600758	2.109424	\N	\N	\N	\N	\N	node/1314468423	\N	\N
299	Canela Premium	nightclub	\N	\N	\N	\N	41.4091036	2.1610503	\N	\N	\N	\N	\N	node/1502974123	\N	\N
300	Tropical	nightclub	\N	\N	\N	\N	41.0721088	1.1493852	\N	\N	\N	\N	\N	node/1635346082	\N	\N
301	Sala El Cau	nightclub	\N	\N	\N	\N	41.1170742	1.256339	\N	\N	\N	\N	\N	node/1879723762	\N	\N
302	Totem	nightclub	\N	\N	\N	\N	41.1177071	1.2510223	\N	\N	\N	\N	\N	node/1879723763	\N	\N
303	Mojito Club	nightclub	Barcelona	Carrer del Rosselló	217	\N	41.393099	2.1568896	https://www.mojitobcn.com/	\N	\N	\N	\N	node/1886635516	\N	\N
304	Faktoria d'Arts	nightclub	\N	\N	\N	\N	41.5643135	2.0100215	http://www.faktoria.org/rasa/	\N	\N	\N	\N	node/2046449139	\N	\N
305	Hell awaits	nightclub	\N	\N	\N	\N	41.3755945	2.1702374	\N	\N	\N	\N	\N	node/2056514582	\N	\N
306	Bonker	nightclub	\N	\N	\N	\N	41.3738977	2.1586905	\N	\N	\N	\N	\N	node/2056514584	\N	\N
307	Sidecar	nightclub	\N	\N	\N	\N	41.3805565	2.1752496	\N	\N	\N	\N	\N	node/2056517880	\N	\N
308	Privée	nightclub	\N	Carretera C14 de Reus a Salou, Km 3.	\N	\N	41.1163485	1.1242498	https://www.privee.es/	\N	\N	\N	\N	node/2141518501	\N	\N
309	Club Astoria	nightclub	\N	Carrer de París	193	\N	41.3938378	2.1532409	https://www.clubastoriabcn.com/	\N	\N	\N	\N	node/2247748060	\N	\N
310	Antilla Latin Club	nightclub	\N	Carrer d'Aragó	141	\N	41.3845653	2.1545955	https://www.antillasalsa.com/	\N	\N	\N	\N	node/2247754303	\N	\N
311	Boulevard Culture Club	nightclub	\N	la Rambla	27	\N	41.3786292	2.1752978	\N	\N	\N	\N	\N	node/2247772387	\N	\N
312	el Sielu	nightclub	\N	\N	\N	\N	41.7240312	1.8218955	\N	\N	\N	\N	\N	node/2306518670	\N	\N
313	Sala Japan	nightclub	Reus	Passeig de Mata	18	\N	41.1601028	1.1018303	http://www.salajapanreus.com/	\N	\N	\N	\N	node/2343601850	\N	\N
314	Classix	nightclub	Reus	Raval de Robuster	14	\N	41.1538123	1.1104831	http://www.soldenit.com/	\N	\N	\N	\N	node/2343601852	\N	\N
315	La Fábrica	nightclub	Reus	Passeig de Mata	32-34	\N	41.1596091	1.1014334	http://www.lafabricareus.com/	\N	\N	\N	\N	node/2343601855	\N	\N
316	Jamboree	nightclub	\N	\N	\N	\N	41.3797128	2.1751933	\N	\N	\N	\N	\N	node/2457866965	\N	\N
317	Harlem Jazz Club	nightclub	Barcelona	Carrer de la Comtessa de Sobradiel	8	\N	41.3811234	2.1784298	https://www.harlemjazzclub.es/	\N	\N	\N	\N	node/2457874856	\N	\N
318	Sala Tango Noches	nightclub	\N	\N	\N	\N	41.3808626	2.1546055	https://www.salatango.com/	\N	\N	\N	\N	node/2498389547	\N	\N
319	Arena Madre	nightclub	\N	\N	\N	\N	41.3884428	2.1639901	https://grupoarena.com/sala-arena-madre/	\N	\N	\N	\N	node/2498389550	\N	\N
320	Aire / Arena Clàssic	nightclub	\N	\N	\N	\N	41.3884327	2.1642261	https://grupoarena.com/sala-arena-classic/	\N	\N	\N	\N	node/2498389551	\N	\N
321	Metro	nightclub	\N	\N	\N	\N	41.3840336	2.1634161	\N	\N	\N	\N	\N	node/2498389557	\N	\N
322	Sala de Fiestas Tango	nightclub	Barcelona	Carrer de la Diputació	94	\N	41.3808462	2.1545811	https://saladefiestastango.com/	\N	\N	\N	\N	node/2522915521	\N	\N
323	Organic Disco	nightclub	\N	\N	\N	\N	41.2359016	1.8080357	\N	\N	\N	\N	\N	node/2572679633	\N	\N
324	BUKKAKE	nightclub	Sitges	Carrer de Joan Tarrida	15	\N	41.2356837	1.8074586	\N	\N	\N	\N	\N	node/2572683849	\N	\N
325	TRAILER DISCO	nightclub	\N	ANGEL VIDAL	36	\N	41.2362426	1.8115515	\N	\N	\N	\N	\N	node/2574164624	\N	\N
326	XXL	nightclub	Sitges	Carrer de Joan Tarrida	7	\N	41.2357134	1.8076737	\N	\N	\N	\N	\N	node/2574170186	\N	\N
327	Discoteca Marius	nightclub	\N	\N	\N	\N	42.4082353	0.7415145	\N	\N	\N	\N	\N	node/2782337181	\N	\N
328	Macarena Club	nightclub	Barcelona	Carrer Nou de Sant Francesc	5	\N	41.3794046	2.1768641	https://www.macarenaclub.com/	\N	\N	\N	\N	node/2879811887	\N	\N
329	Sutton Club	nightclub	Barcelona	Carrer Tuset	13	\N	41.3959489	2.1517438	\N	\N	\N	\N	\N	node/2910255021	\N	\N
330	Marhes The Club	nightclub	Barcelona	Avinguda del Doctor Marañón	17	\N	41.381261	2.1143271	\N	\N	\N	\N	\N	node/2923513235	\N	\N
331	El Piano	nightclub	\N	\N	\N	\N	41.6042341	2.2918624	http://www.elpianogranollers.com	\N	\N	\N	\N	node/2955232345	\N	\N
332	Sans Música i Copes	nightclub	\N	\N	\N	\N	41.6093789	2.2904626	\N	\N	\N	\N	\N	node/2965008220	\N	\N
333	Caprichos	nightclub	\N	\N	\N	\N	41.5663399	2.5183837	\N	\N	\N	\N	\N	node/3051021347	\N	\N
334	Sala Apolo	nightclub	\N	\N	\N	\N	41.3743908	2.1695606	https://www.sala-apolo.com	\N	\N	\N	\N	node/3072968504	\N	\N
335	SÖKO Club	nightclub	Caldes de Montbui	Carrer del Forn	\N	\N	41.6335559	2.1626719	\N	\N	\N	\N	\N	node/3144078845	\N	\N
336	Almo2bar	nightclub	Barcelona	Carrer de Bruniquer	59,61	\N	41.4056064	2.1621059	https://grupalmodobar.com/almo2bar/	\N	\N	\N	\N	node/3158729112	\N	\N
337	Discoteca Podium	nightclub	L'Estartit	Passatge Vela	\N	\N	42.0521251	3.1953453	\N	\N	\N	\N	\N	node/3198070368	\N	\N
338	Blow	nightclub	\N	\N	\N	\N	41.9846468	2.82018	\N	\N	\N	\N	\N	node/3378334054	\N	\N
339	Darling Music Club	nightclub	\N	\N	\N	\N	41.3711469	1.7249177	\N	\N	\N	\N	\N	node/3388137153	\N	\N
340	Catwalk Club	nightclub	\N	Carrer de Ramon Trias Fargas	2-4	\N	41.3858135	2.1967637	http://cluccatwalk.net	\N	\N	\N	\N	node/3481112677	\N	\N
341	Le Poupée	nightclub	\N	\N	\N	\N	41.6819039	2.488817	\N	\N	\N	\N	\N	node/3565417949	\N	\N
342	Nueva Época	nightclub	Barcelona	Gran Via de les Corts Catalanes	770	\N	41.3983986	2.1807324	\N	\N	\N	\N	\N	node/3626838286	\N	\N
343	Otto Zutz	nightclub	Barcelona	Carrer de Lincoln	15	\N	41.4001094	2.1503817	\N	\N	\N	\N	\N	node/3631295923	\N	\N
344	OXYGEN	nightclub	\N	\N	\N	\N	41.6153392	2.6514796	\N	\N	\N	\N	\N	node/3723038574	\N	\N
345	Bob's Bar	nightclub	\N	\N	\N	\N	41.6115944	2.6546689	\N	\N	\N	\N	\N	node/3723038575	\N	\N
346	The Frog	nightclub	\N	\N	\N	\N	41.6128981	2.6536509	\N	\N	\N	\N	\N	node/3723038576	\N	\N
347	Museum	nightclub	Barcelona	Carrer de Sepúlveda	178	\N	41.3831657	2.162742	\N	\N	\N	\N	\N	node/3892711667	\N	\N
348	Safari Disco Club	nightclub	Barcelona	Carrer de Tarragona	141	\N	41.3783395	2.1448682	\N	\N	\N	\N	\N	node/3961122030	\N	\N
349	BeCool	nightclub	Barcelona	Plaça de Joan Llongueras	5	\N	41.3925144	2.140693	http://www.salabecool.com/	\N	\N	\N	\N	node/4054769140	\N	\N
350	Madam's	nightclub	\N	\N	\N	\N	42.3667512	2.895702	\N	\N	\N	\N	\N	node/4198519573	\N	\N
351	Sala Garage	nightclub	Salou	Carrer de Casp	3	\N	41.0761652	1.1472939	\N	\N	\N	\N	\N	node/4275425288	\N	\N
352	Villa Martini	nightclub	\N	\N	\N	\N	41.7648441	1.8758073	\N	\N	\N	\N	\N	node/4350898704	\N	\N
353	Baobab	nightclub	\N	\N	\N	\N	41.6135986	0.649263	\N	\N	\N	\N	\N	node/4414443084	\N	\N
354	PK2	nightclub	\N	\N	\N	\N	41.070882	1.1782795	\N	\N	\N	\N	\N	node/4417861580	\N	\N
355	My way	nightclub	\N	\N	\N	\N	42.0496445	3.1932815	\N	\N	\N	\N	\N	node/4455021191	\N	\N
356	Venus	nightclub	\N	Autovia A-2	pk. 446	\N	41.5437061	0.4736531	\N	\N	\N	\N	\N	node/4576954189	\N	\N
357	La Boite (Disco)	nightclub	\N	Carrer del Riu Essera	19	\N	41.6220307	0.6277854	\N	\N	\N	\N	\N	node/4621573889	\N	\N
358	Discothèque LaNuit	nightclub	\N	Avinguda de les Garrigues	39	\N	41.6089939	0.635093	\N	\N	\N	\N	\N	node/4623057789	\N	\N
359	OneOcean Club	nightclub	\N	\N	\N	\N	41.3799209	2.1862228	\N	\N	\N	\N	\N	node/4708595789	\N	\N
360	Undeadarkclub	nightclub	\N	\N	\N	\N	41.3798286	2.1334164	\N	\N	\N	\N	\N	node/4712026039	\N	\N
361	Rainbow Dragon	nightclub	\N	\N	\N	\N	41.3852951	2.172046	\N	\N	\N	\N	\N	node/4773217122	\N	\N
362	Discoteca Arena Blanes	nightclub	Blanes	Carrer d'Eivissa	2	\N	41.6667038	2.7817484	\N	\N	\N	\N	\N	node/4811486083	\N	\N
363	kiss-salou	nightclub	\N	Avinguda de Carles Buïgas	14	\N	41.0723521	1.1471486	http://kisssalou.com	\N	\N	\N	\N	node/4906264522	\N	\N
364	La Esquina	nightclub	\N	Carrer de Ramon Llull	23	\N	41.6230276	0.6236357	\N	\N	\N	\N	\N	node/4936674924	\N	\N
365	Open Mind	nightclub	\N	\N	\N	\N	41.3849266	2.1557	https://www.openmindbcn.com/	\N	\N	\N	\N	node/4958833022	\N	\N
366	Nightbarcelona	nightclub	\N	Carrer de la Diputació	161	\N	41.3843686	2.158811	https://www.nightbarcelona.net/	\N	\N	\N	\N	node/4958833624	\N	\N
367	Berlin Dark	nightclub	Barcelona	Passatge de Prunera	18	\N	41.3743162	2.1561764	http://www.berlindark.com	\N	\N	\N	\N	node/4958849921	\N	\N
368	The Black Room	nightclub	\N	Rambla de Catalunya	2-4	\N	41.3877311	2.1682772	\N	\N	\N	\N	\N	node/4958889874	\N	\N
369	Continental	nightclub	Barcelona	Carrer de la Providència	30-32	\N	41.4062568	2.1564886	\N	\N	\N	\N	\N	node/5052323721	\N	\N
370	Caribe Caliente	nightclub	\N	\N	\N	\N	41.3744995	2.1148664	\N	\N	\N	\N	\N	node/5206544217	\N	\N
371	Pilu	nightclub	\N	\N	\N	\N	41.5360616	1.8722298	\N	\N	\N	\N	\N	node/5208411221	\N	\N
372	Tarumba	nightclub	Viladecavalls	\N	\N	\N	41.5556568	1.9552362	\N	\N	\N	\N	\N	node/5274587720	\N	\N
373	Zahara Cocktail Club	nightclub	\N	\N	\N	\N	41.383278	2.1894771	\N	\N	\N	\N	\N	node/5539845612	\N	\N
374	Razzmatazz sales 2 & 3	nightclub	\N	\N	\N	\N	41.3972784	2.1910762	\N	\N	\N	\N	\N	node/5554720357	\N	\N
375	R33	nightclub	\N	La Rambla, el Raval	\N	\N	41.3788563	2.1749439	\N	\N	\N	\N	\N	node/5663248080	\N	\N
376	La Terazza	nightclub	\N	Plaça de la Font	\N	\N	41.3689262	2.149236	\N	\N	\N	\N	\N	node/5663251369	\N	\N
377	L'Hangar	nightclub	Reus	Carrer de Vilar	16	\N	41.1561515	1.1081857	\N	\N	\N	\N	\N	node/5731338766	\N	\N
378	Opium	nightclub	\N	\N	\N	\N	41.6404997	2.7377454	\N	\N	\N	\N	\N	node/5732090471	\N	\N
379	La Nuit de Reus	nightclub	\N	\N	\N	\N	41.1561845	1.1092357	\N	\N	\N	\N	\N	node/5732554644	\N	\N
380	La Terrassa	nightclub	\N	\N	\N	\N	41.3822326	2.045612	\N	\N	\N	\N	\N	node/5810830020	\N	\N
381	Els Pagessos	nightclub	\N	\N	\N	\N	41.3811117	2.0466608	\N	\N	\N	\N	\N	node/5810830026	\N	\N
382	Mint Salou	nightclub	\N	\N	\N	\N	41.0717376	1.1466669	\N	\N	\N	\N	\N	node/5823400553	\N	\N
383	Club Diana	nightclub	Tordera	Carrer de Vallplana	2	\N	41.6894962	2.7221395	\N	\N	\N	\N	\N	node/5844899005	\N	\N
384	Blau	nightclub	\N	\N	\N	\N	40.8927045	0.7858469	\N	\N	\N	\N	\N	node/5979906603	\N	\N
385	Disco Revolution	nightclub	\N	\N	\N	\N	41.7002784	2.8408883	\N	\N	\N	\N	\N	node/6002121988	\N	\N
386	Disco Hollywood	nightclub	\N	\N	\N	\N	41.7034872	2.8453883	\N	\N	\N	\N	\N	node/6002139097	\N	\N
387	Almodobar	nightclub	\N	Carrer d'en Grassot	36	\N	41.4036783	2.1675289	https://grupalmodobar.com/almodobar/	\N	\N	\N	\N	node/6038913886	\N	\N
388	Moon Club	nightclub	\N	Avinguda de les Corts Catalanes	5	\N	41.475093	2.0978593	\N	\N	\N	\N	\N	node/6090305387	\N	\N
389	Dixi 724	nightclub	\N	\N	\N	\N	41.3970111	2.1920045	\N	\N	\N	\N	\N	node/6139033077	\N	\N
390	Luz de Gas	nightclub	Barcelona	Carrer de Muntaner	246	\N	41.3945976	2.1491592	\N	\N	\N	\N	\N	node/6387346287	\N	\N
391	Rock'N'Trini	nightclub	Barcelona	Via Favència	441	\N	41.4469745	2.1902067	\N	\N	\N	\N	\N	node/6430305257	\N	\N
392	G-Bar Lleida	nightclub	\N	Carrer d'Aribau	26	\N	41.6206898	0.6190546	https://g-bar-lleida.negocio.site/	\N	\N	\N	\N	node/6528443619	\N	\N
393	Plataforma	nightclub	Barcelona	Carrer Nou de la Rambla	145	\N	41.3728751	2.1680013	\N	\N	\N	\N	\N	node/6543118810	\N	\N
394	Londoner	nightclub	\N	\N	\N	\N	41.6985553	2.8448045	\N	\N	\N	\N	\N	node/6680447019	\N	\N
395	St.Trop'	nightclub	\N	\N	\N	\N	41.6978514	2.8441957	https://www.sttrop.com/	\N	\N	\N	\N	node/6680456745	\N	\N
396	Discoteca la Masia	nightclub	\N	Carrer de la Conca de Barberà	6	\N	41.1505651	1.4119108	\N	\N	\N	\N	\N	node/6738537525	\N	\N
397	Imperator	nightclub	\N	Carrer de Corsega	327	\N	41.3972085	2.1600197	\N	\N	\N	\N	\N	node/6854723168	\N	\N
398	Disco Xenon	nightclub	\N	Avinguda de Catalunya	16	\N	41.3953824	1.0987515	\N	\N	\N	\N	\N	node/6938863407	\N	\N
399	Espai Titus	nightclub	Badalona	Carrer de Ramon Martí Alsina	44	\N	41.459907	2.2615126	https://espaititus.cat/	\N	\N	\N	\N	node/7028817097	\N	\N
400	Gatzara	nightclub	Girona	Carrer de Figuerola	12	\N	41.9858892	2.8215841	\N	\N	\N	\N	\N	node/7031442195	\N	\N
401	INPUT	nightclub	\N	Av. Francesc Ferrer i Guàrdia	13	\N	41.3688468	2.1468564	https://www.inputbcn.com/	\N	\N	\N	\N	node/7042784186	\N	\N
402	Mambo Club	nightclub	\N	Carrer de Miquel Servet	149	\N	41.4462226	2.2401134	\N	\N	\N	\N	\N	node/7172666371	\N	\N
403	La Daurada	nightclub	Vilanova i la Geltrú	Plaça del Trajo de Garbí	\N	\N	41.2099197	1.7278982	https://www.ladauradabeachclub.com/	\N	\N	\N	\N	node/7847753959	\N	\N
404	Beach Club	nightclub	\N	\N	\N	\N	42.2460236	3.1980119	\N	\N	\N	\N	\N	node/7896965036	\N	\N
405	Barroko's	nightclub	\N	Carrer d'Aribau	242	\N	41.3957578	2.1497718	\N	\N	\N	\N	\N	node/8658397927	\N	\N
406	Costa Breve	nightclub	\N	Carrer d'Aribau	230	\N	41.3952962	2.1503847	\N	\N	\N	\N	\N	node/8685951182	\N	\N
407	Sarau 08911	nightclub	\N	Carrer de Ramon Martí Alsina	32	\N	41.4593959	2.2620468	https://www.sarau08911.com	\N	\N	\N	\N	node/9076494634	\N	\N
408	CLAP Mataró	nightclub	Mataró	Carrer Serra i Moret	6	\N	41.5335826	2.4314215	\N	\N	\N	\N	\N	node/9570867615	\N	\N
409	Tajator	nightclub	\N	\N	\N	\N	41.532801	2.4307975	\N	\N	\N	\N	\N	node/9573716408	\N	\N
410	Ilusion	nightclub	\N	\N	\N	\N	41.3842012	2.1472514	\N	\N	\N	\N	\N	node/9800778917	\N	\N
411	Skylab	nightclub	\N	Carrer d'Entença	214	\N	41.3855135	2.1430297	\N	\N	\N	\N	\N	node/9801832818	\N	\N
412	Genius	nightclub	\N	\N	\N	\N	41.3726526	2.1420577	\N	\N	\N	\N	\N	node/9807002422	\N	\N
413	Twenties	nightclub	\N	\N	\N	\N	41.3936124	2.1580101	\N	\N	\N	\N	\N	node/9823573921	\N	\N
414	Pink Lady	nightclub	\N	\N	8	\N	41.3902898	2.1461014	\N	\N	\N	\N	\N	node/9868296417	\N	\N
415	Sala Manolita	nightclub	Lleida	Carrer de Guillem de Bessiers	\N	\N	41.6059146	0.6222577	\N	\N	\N	\N	\N	node/9942706642	\N	\N
416	Club Soda	nightclub	\N	\N	\N	\N	41.375239	2.1885695	\N	\N	\N	\N	\N	node/9947913817	\N	\N
417	Black & White	nightclub	\N	\N	\N	\N	41.8195764	3.0685285	\N	\N	\N	\N	\N	node/9974860323	\N	\N
418	Laut	nightclub	\N	\N	\N	\N	41.3737857	2.1697111	\N	\N	\N	\N	\N	node/9989243217	\N	\N
419	La Biblio	nightclub	\N	Carrer de Moià	1	\N	41.3954764	2.1521881	\N	\N	\N	\N	\N	node/10091572577	\N	\N
420	Smile	nightclub	\N	\N	\N	\N	41.7885929	0.8142304	\N	\N	\N	\N	\N	node/10286280385	\N	\N
421	La Sonora	nightclub	\N	Ronda Sud	17	\N	42.2621292	2.977215	\N	\N	\N	\N	\N	node/10608108105	\N	\N
422	Arena	nightclub	\N	\N	19-21	\N	41.3895686	2.1739427	https://grupoarena.com/	\N	\N	\N	\N	node/10649981205	\N	\N
423	Oceanic	nightclub	\N	\N	\N	\N	40.6175764	0.5952862	https://oceaniclarapita.com/	\N	\N	\N	\N	node/10702049597	\N	\N
424	Lizard	nightclub	\N	Rambla de Salvador Samà	102	\N	41.220474	1.7240904	\N	\N	\N	\N	\N	node/10994182152	\N	\N
425	Music Bar Siles	nightclub	\N	Carrer de Cuba	5	\N	41.2211923	1.7256461	\N	\N	\N	\N	\N	node/10994607560	\N	\N
426	Bar Candy (disco-pub)	nightclub	\N	Camí de la Masia d'en Frederic	16	\N	41.2296913	1.7252988	\N	\N	\N	\N	\N	node/10996125943	\N	\N
427	Saoco	nightclub	\N	Carrer de la Llibertat	27	\N	41.2218445	1.7277313	\N	\N	\N	\N	\N	node/11020624607	\N	\N
428	Arcs Music Club	nightclub	\N	Carrer de la Unió	42	\N	41.225534	1.7271825	\N	\N	\N	\N	\N	node/11037494869	\N	\N
429	Nits	nightclub	\N	Carrer del Correu	77	\N	41.2222494	1.7281178	\N	\N	\N	\N	\N	node/11077789693	\N	\N
430	Music Eclipse	nightclub	\N	Carrer del Correu	80	\N	41.2219537	1.7280305	\N	\N	\N	\N	\N	node/11077789694	\N	\N
431	BoB’s Disco & Bar	nightclub	\N	Passeig de les roques 	13	\N	41.610929	2.6527695	\N	\N	\N	\N	\N	node/11195755850	\N	\N
432	disco phoenix	nightclub	Calella	Jovara	36	\N	41.6120558	2.6567388	\N	\N	\N	\N	\N	node/11195755851	\N	\N
434	Sala de festes Yaya	nightclub	\N	Passeig Marítim de Ribes Roges	35 BX	\N	41.2123794	1.7165404	\N	\N	\N	\N	\N	node/11446001772	\N	\N
435	La Fira Casanova	nightclub	Barcelona	Carrer de Casanova	171	\N	41.3918937	2.1500484	https://lafiragroup.com	\N	\N	\N	\N	node/11690535934	\N	\N
433	Discoteca Kauai	nightclub	Calella	Carrer de Valldebanador	21	\N	41.6139173	2.6516064	\N	\N	\N	\N	\N	node/11195786653	\N	\N
\.


--
-- Data for Name: Playlist; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Playlist" (id, "clubId", "songId") FROM stdin;
\.


--
-- Data for Name: Song; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Song" (id, title, artist) FROM stdin;
\.


--
-- Data for Name: SongVote; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."SongVote" (id, "userId", "songId", vote, week) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."User" (id, name, email) FROM stdin;
1	globaluser	globaluser@gmail.com
\.


--
-- Data for Name: Vote; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Vote" (id, "userId", "clubId", vote, week) FROM stdin;
21	1	291	1	2024-07-13 16:59:53.723
22	1	292	1	2024-07-13 17:00:00.889
23	1	291	1	2024-10-07 19:36:12.89
24	1	436	1	2024-11-13 19:04:41.456
25	1	436	1	2024-11-13 19:04:46.655
26	1	436	1	2024-11-13 19:04:51.744
27	1	436	1	2024-11-13 19:04:56.823
28	1	436	1	2024-11-27 17:49:44.531
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f36dad7d-d729-4f4d-88cd-6195ba9a7711	710a47c34945094efab76b642ff274a2df67c5ab53251d5443dd0036d9a8af70	2024-07-03 20:41:55.477455+00	20240703204052_name_of_your_migration	\N	\N	2024-07-03 20:41:55.457049+00	1
\.


--
-- Name: Club_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Club_id_seq"', 436, true);


--
-- Name: Playlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Playlist_id_seq"', 1, false);


--
-- Name: SongVote_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."SongVote_id_seq"', 1, false);


--
-- Name: Song_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Song_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, false);


--
-- Name: Vote_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Vote_id_seq"', 28, true);


--
-- Name: Club Club_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Club"
    ADD CONSTRAINT "Club_pkey" PRIMARY KEY (id);


--
-- Name: Playlist Playlist_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Playlist"
    ADD CONSTRAINT "Playlist_pkey" PRIMARY KEY (id);


--
-- Name: SongVote SongVote_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SongVote"
    ADD CONSTRAINT "SongVote_pkey" PRIMARY KEY (id);


--
-- Name: Song Song_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Song"
    ADD CONSTRAINT "Song_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Vote Vote_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Playlist Playlist_clubId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Playlist"
    ADD CONSTRAINT "Playlist_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES public."Club"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Playlist Playlist_songId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Playlist"
    ADD CONSTRAINT "Playlist_songId_fkey" FOREIGN KEY ("songId") REFERENCES public."Song"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SongVote SongVote_songId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SongVote"
    ADD CONSTRAINT "SongVote_songId_fkey" FOREIGN KEY ("songId") REFERENCES public."Song"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SongVote SongVote_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SongVote"
    ADD CONSTRAINT "SongVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Vote Vote_clubId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES public."Club"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Vote Vote_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: root
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

