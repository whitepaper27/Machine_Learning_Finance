import pandas as pd
import quandl


class QFin(object):

    def get_data(self, tickers, dir_store):
        quandl.ApiConfig.api_key = 'ssDS9kSxuzERNrwf3RBu'
        for index, row in tickers.iterrows():
            print(row['SYM'], row['ST_DT'], row['ED_DT'])
            ticker_data = quandl.get_table('WIKI/PRICES', qopts={'columns': ['ticker', 'date', 'close']},
                                           ticker=row['SYM'], date={'gte': row['ST_DT'], 'lte': row['ED_DT']})
            ticker_data = ticker_data.iloc[::-1]
            ticker_data.to_csv(dir_store + row['SYM'] + '.csv', index=False)


if __name__ == '__main__':
    q_fin = QFin()
    stck_tickers = pd.read_csv('../alconfig/stck.csv')
    q_fin.get_data(stck_tickers, 'data/')