create schema alpine;

drop table if exists alpine.al_sentiments; 

create table alpine.al_sentiments(
  stock varchar(15), 
  setiment varchar(15), 
  up_date timestamp
);

drop table if exists alpine.al_technicals; 

create table alpine.al_technicals(
  stock varchar(15), 
  analysis varchar(15), 
  up_date timestamp
);

drop table if exists alpine.al_financials; 

create table alpine.al_financials(
  stock varchar(15), 
  analysis varchar(15), 
  up_date timestamp
);

-- Optional table alpine.al_stocks
drop table if exists alpine.al_stocks;

create table alpine.al_stocks (
  stock varchar(15), 
  stock_desc varchar(1000)
);
	
drop table if exists alpine.al_stock_prices;

create table alpine.al_stock_prices (
  stock varchar(15), 
  stock_price decimal, 
  up_date timestamp
);

drop table if exists alpine.al_portfolio;

create table alpine.al_portfolio (
  portfolio varchar(15),
  stock varchar(15),
  pf_owner varchar(15),
  up_date timestamp
);

drop table if exists alpine.al_individual_signals;

create table alpine.al_individual_signals(
  stock varchar(15),
  signal varchar(15),
  up_date timestamp
);

drop table if exists alpine.al_portfolio_signals;

create table alpine.al_portfolio_signals(
  portfolio varchar(15),
  stock varchar(15),
  signal varchar(15),
  percentage decimal,
  up_date timestamp
);

drop table if exists alpine.al_portfolio_agg;

create table alpine.al_portfolio_agg(
  portfolio varchar(15),
  pf_value decimal,
  up_date timestamp
);

drop table if exists alpine.al_portfolio_positions;

create table alpine.al_portfolio_positions(
  portfolio varchar(15),
  stock varchar(15),
  stock_units decimal,
  stock_value decimal,
  up_date timestamp
);

drop table if exists alpine.al_mkt_index;

create table alpine.al_mkt_index(
  mkt_index varchar(15),
  idx_value decimal,
  up_date timestamp
);

drop table if exists alpine.al_newsreel;

create table alpine.al_newsreel(
  stock varchar(15),
  headline varchar(100),
  image_url varchar(100),
  up_date timestamp
);

truncate alpine.al_stocks;
insert into alpine.al_stocks values ('AAPL', current_timestamp);
insert into alpine.al_stocks values ('GOOGL', current_timestamp);

truncate alpine.al_stocks;
insert into alpine.al_stock_prices values ('AAPL', 109.0, current_timestamp - interval '5 day');
insert into alpine.al_stock_prices values ('GOOGL', 1499.0, current_timestamp - interval '5 day');
insert into alpine.al_stock_prices values ('AAPL', 110.0, current_timestamp - interval '4 day');
insert into alpine.al_stock_prices values ('GOOGL', 1500.0, current_timestamp - interval '4 day');
insert into alpine.al_stock_prices values ('AAPL', 111.0, current_timestamp - interval '3 day');
insert into alpine.al_stock_prices values ('GOOGL', 1501.0, current_timestamp - interval '3 day');
insert into alpine.al_stock_prices values ('AAPL', 112.0, current_timestamp - interval '2 day');
insert into alpine.al_stock_prices values ('GOOGL', 1502.0, current_timestamp - interval '2 day');
insert into alpine.al_stock_prices values ('AAPL', 113.0, current_timestamp - interval '1 day');
insert into alpine.al_stock_prices values ('GOOGL', 1503.0, current_timestamp - interval '1 day');
insert into alpine.al_stock_prices values ('AAPL', 114.0, current_timestamp);
insert into alpine.al_stock_prices values ('GOOGL', 1504.0, current_timestamp);

truncate alpine.al_portfolio;
insert into alpine.al_portfolio values ('High Returns', 'AAPL', 'John Doe', current_timestamp);
insert into alpine.al_portfolio values ('High Returns', 'GOOGL', 'John Doe', current_timestamp);
insert into alpine.al_portfolio values ('High Returns', 'CASH', 'John Doe', current_timestamp);

truncate alpine.al_portfolio_signals;
insert into alpine.al_portfolio_signals values ('High Returns', 'AAPL', 'BUY', 8, current_timestamp);
insert into alpine.al_portfolio_signals values ('High Returns', 'GOOGL', 'BUY', 2, current_timestamp);
insert into alpine.al_portfolio_signals values ('High Returns', 'CASH', 'SELL', 10, current_timestamp);

truncate alpine.al_portfolio_agg;
insert into alpine.al_portfolio_agg values ('High Returns', 100000, current_timestamp);

truncate alpine.al_portfolio_positions;
insert into alpine.al_portfolio_positions values ('High Returns', 'CASH', 100000, 1, current_timestamp - interval '10 day');
insert into alpine.al_portfolio_positions values ('High Returns', 'CASH', 8025, 1, current_timestamp - interval '5 day');
insert into alpine.al_portfolio_positions values ('High Returns', 'AAPL', 109, 500, current_timestamp - interval '5 day');
insert into alpine.al_portfolio_positions values ('High Returns', 'GOOGL', 1499, 25, current_timestamp - interval '5 day');


truncate alpine.al_individual_signals;
insert into alpine.al_individual_signals values ('AAPL', 'BUY', current_timestamp);
insert into alpine.al_individual_signals values ('GOOGL', 'BUY', current_timestamp);
insert into alpine.al_individual_signals values ('AMZN', 'SELL', current_timestamp);
insert into alpine.al_individual_signals values ('WMT', 'BUY', current_timestamp);
insert into alpine.al_individual_signals values ('V', 'BUY', current_timestamp);
insert into alpine.al_individual_signals values ('T', 'SELL', current_timestamp);
insert into alpine.al_individual_signals values ('BA', 'BUY', current_timestamp);
insert into alpine.al_individual_signals values ('SNOW', 'BUY', current_timestamp);
insert into alpine.al_individual_signals values ('NSRGY', 'BUY', current_timestamp);
insert into alpine.al_individual_signals values ('NVDA', 'BUY', current_timestamp);
insert into alpine.al_individual_signals values ('NLY', 'SELL', current_timestamp);
insert into alpine.al_individual_signals values ('AAPL', 'BUY', current_timestamp - interval '1 day');
insert into alpine.al_individual_signals values ('GOOGL', 'BUY', current_timestamp - interval '1 day');
insert into alpine.al_individual_signals values ('AMZN', 'BUY', current_timestamp - interval '1 day');
insert into alpine.al_individual_signals values ('WMT', 'BUY', current_timestamp - interval '1 day');
insert into alpine.al_individual_signals values ('V', 'BUY', current_timestamp - interval '1 day');
insert into alpine.al_individual_signals values ('T', 'BUY', current_timestamp - interval '1 day');
insert into alpine.al_individual_signals values ('BA', 'BUY', current_timestamp - interval '1 day');
insert into alpine.al_individual_signals values ('SNOW', 'SELL', current_timestamp - interval '1 day');
insert into alpine.al_individual_signals values ('NSRGY', 'BUY', current_timestamp - interval '1 day');
insert into alpine.al_individual_signals values ('NVDA', 'BUY', current_timestamp - interval '1 day');
insert into alpine.al_individual_signals values ('NLY', 'BUY', current_timestamp - interval '1 day');
insert into alpine.al_individual_signals values ('AAPL', 'SELL', current_timestamp - interval '2 day');
insert into alpine.al_individual_signals values ('GOOGL', 'BUY', current_timestamp - interval '2 day');
insert into alpine.al_individual_signals values ('AMZN', 'BUY', current_timestamp - interval '2 day');
insert into alpine.al_individual_signals values ('WMT', 'BUY', current_timestamp - interval '2 day');
insert into alpine.al_individual_signals values ('V', 'BUY', current_timestamp - interval '2 day');
insert into alpine.al_individual_signals values ('T', 'SELL', current_timestamp - interval '2 day');
insert into alpine.al_individual_signals values ('BA', 'BUY', current_timestamp - interval '2 day');
insert into alpine.al_individual_signals values ('SNOW', 'BUY', current_timestamp - interval '2 day');
insert into alpine.al_individual_signals values ('NSRGY', 'BUY', current_timestamp - interval '2 day');
insert into alpine.al_individual_signals values ('NVDA', 'BUY', current_timestamp - interval '2 day');
insert into alpine.al_individual_signals values ('NLY', 'BUY', current_timestamp - interval '2 day');
