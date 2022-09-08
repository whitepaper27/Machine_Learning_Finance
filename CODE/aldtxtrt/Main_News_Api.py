import getopt
import sys

from newsapi import NewsApiClient
import requests
import json
import pandas as pd
from datetime import date
import datetime

class NewsApi:
    # Do not modify
    def __init__(self, Client_id: str ,Client_Secret: str , Agent_Name:str ):
        self.Client_id = Client_id
        self.Client_Secret = Client_Secret
        self.Agent_Name = Agent_Name




    def get_data(self,stock_symbol,no_of_days):
        today = no_of_days
        l_list = []
        my_status = 'NOT'
        my_results = 0
        for i, j in stock_symbol.iterrows():
            ticker = j['Symbol']
            #print(ticker)
            url = 'http://newsapi.org/v2/everything?'+'q=' + ticker+'&'+'from='+today+'&'+'sortBy=popularity&'+'apiKey='+self.Client_id
            response = requests.get(url)
            data = response.json()
            my_keys = data.keys()
            for key in my_keys:
                #print('Key', key)
                all_values=data[key]
                # Status
                if key == 'status':
                    if all_values == 'ok':
                        my_status = all_values
                # Total results
                if key == 'totalResults':
                    my_results = all_values
                if (key == 'articles')  and   (my_status=='ok') and   (my_results>0):
                    all_values = data[key]
                    for i in range(0, len(all_values)):
                        # for j in all_values[i].keys():
                        # print('In j',j)
                        # print('content',all_values[i][j])
                        my_dict = {
                            "ticker": ticker,
                            "publishedAt": all_values[i]['publishedAt'],
                            "content": all_values[i]['content'],
                            "url": all_values[i]['url'],
                            "description": all_values[i]['description'],
                            "title": all_values[i]['title']
                        }
                        l_list.append(my_dict)
        return l_list

if __name__ == '__main__':
    #Need to change file name here assignmed to you
    argv = sys.argv[1:]
    #print(argv)


    try:
        opts, args = getopt.getopt(argv, "n:d:",["name=","day="])
       # print('In',opts)
        #print('Out',args)
        #opts, args = getopt.getopt(argv, "f:l:")
    except getopt.GetoptError:
        print('main.py -name <file_name> -day <no. of days>')
        sys.exit(2)

    for opt, arg in opts:
        if opt in ['-n', '--name']:
            #print('In opt')
            name = arg
        elif opt in ['-d', '--day']:
            my_day = int(arg)



    stock_symbol = pd.read_csv(name)
    #print(stock_symbol)
    #print(my_day)
    tod = datetime.datetime.now()
    d = datetime.timedelta(days=my_day)
    no_of_days = (tod - d).strftime("%Y-%m-%d")
    #print(a)
    #exit()

    my_daily_news=NewsApi(Client_id='CS6242',Client_Secret='b3ef5c3d00a340a7b80af816ea263bc5-eDgV2ljVhYQ',Agent_Name='News Api')
    lst_my_daily_news=my_daily_news.get_data(stock_symbol,no_of_days)
    df = pd.DataFrame(lst_my_daily_news)
    if df.empty:
        print('Dp nothing as Rate limit exceed')
    else:
        df.to_csv('stocks_news.csv', mode='a', header=False,index=False)
