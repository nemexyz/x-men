CREATE DATABASE "x-men";

\c "x-men";

CREATE TABLE public.dnas
(
    id serial PRIMARY KEY,
    structure text[] NOT NULL,
    mutant boolean NOT NULL DEFAULT false,
    created timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);