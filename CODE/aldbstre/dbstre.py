import sqlite3
from sqlalchemy import create_engine
import pandas as pd


class DBStore(object):
    def store_data(self):
        conn = sqlite3.connect('dbstore.db')
        cur = conn.cursor()
        cur.execute('''create table if not exists stocks (ticker text, rdate date, adjclose float)''')
        cur.execute('''insert into stocks values('AAPL', '2019-01-01', 100.00)''')
        conn.commit()

    def push_stock_data(self):
        engine = create_engine('sqlite:///dbstore.db', echo=False)
        df = pd.read_csv('../aldtxtrt/data/AAPL.csv')
        df.to_sql('stocks', engine, if_exists='replace', index_label='id')


if __name__ == '__main__':
    dbstore = DBStore()
    dbstore.push_stock_data()
