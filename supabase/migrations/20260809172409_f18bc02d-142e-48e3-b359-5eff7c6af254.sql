CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_ordine text NOT NULL UNIQUE,
  email text NOT NULL,
  nome text NOT NULL,
  cognome text NOT NULL,
  telefono text NOT NULL,
  indirizzo text NOT NULL,
  civico text,
  citta text NOT NULL,
  cap text NOT NULL,
  provincia text NOT NULL,
  metodo_pagamento text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotale numeric(10,2) NOT NULL DEFAULT 0,
  spedizione numeric(10,2) NOT NULL DEFAULT 0,
  totale numeric(10,2) NOT NULL DEFAULT 0,
  stato text NOT NULL DEFAULT 'nuovo',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.orders TO anon;
GRANT INSERT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create an order"
ON public.orders FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();