# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

import praw
import time
import datetime
from datetime import datetime, timedelta
import pandas as pd
import getopt
import sys

class Reddit:

    # Do not modify
    def __init__(self, Client_id: str ,Client_Secret: str , Agent_Name:str ):
        self.Client_id = Client_id
        self.Client_Secret = Client_Secret
        self.Agent_Name = Agent_Name


    def Login_info(self):
        reddit_login = praw.Reddit(client_id=self.Client_id, client_secret=self.Client_Secret, user_agent=self.Agent_Name)
        return reddit_login

    def get_date(created):
        return datetime.fromtimestamp(created)

    def get_SubbReddit_data(self,reddit,sub,max_limit):
        #subreddit = reddit.subreddit(sub).top('day', limit=max_limit)
        subreddit = reddit.subreddit(sub).top('day', limit=max_limit)
        #subreddit = reddit.subreddit(sub).hot(limit=max_limit)
        #top_subreddit = subreddit.top(limit=10)
        #top_subreddit = subreddit.top()
        #top_subreddit = subreddit.top(limit=max_limit)
        my_list=[]
        #
        for submission in subreddit:
            utcPostTime = submission.created
            submissionDate = datetime.utcfromtimestamp(utcPostTime)
            #submissionDateTuple = submissionDate.timetuple()

            currentTime = datetime.utcnow()
            submissionDelta = currentTime - submissionDate
            title = submission.title
            submission_id = submission.id
            link = 'www.reddit.com' + submission.permalink
            submissionDelta = str(submissionDelta)
            #print(submissionDelta)
            if 'day' not in submissionDelta:
                my_dict = {"id": submission_id,
                           "title": title,
                           "link": link,
                           "Delta_Time" :submissionDelta,
                           "Creation_date": submissionDate,
                           "DataCollectTime":currentTime
                           }
                my_list.append((my_dict))
            #print(my_list)
            #exit()
        return my_list

    def get_Daily_data(self, my_data):
        daily_data=[]
        for submission in my_data:
            daily_data.append(submission)
        return daily_data

    def get_SubbReddit_Detail_data(self,reddit,my_list):
        daily_detail_list = []
        for my_dict in range(len(my_list)):
            # print(my_list[my_dict]['id'])
            id = my_list[my_dict]['id']
            submission = reddit.submission(id=id)
            submission.comments.replace_more(limit=100)
            for comment in submission.comments.list():
                my_dict = {"submission_id": submission.id,
                           "comment_id": comment.id,
                           "comment_weight": len(comment.replies),
                           "comment_body": comment.body
                           }
                daily_detail_list.append(my_dict)
        return daily_detail_list

    def convert_Csv(self,my_list,cust_name):
        current_time = datetime.now()
        daily_date = current_time.strftime('%m_%d_%Y')
        pd_daily = pd.DataFrame(my_list)
        name=cust_name+'_'+daily_date + '.csv'
        pd_daily.to_csv(name, index=False)
        return name


def main(argv):
    limit=None



# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    argv = sys.argv[1:]
    #print(argv)
    try:
        opts, args = getopt.getopt(argv, "l:s:",["limit=","subreddit="])
       # print('In',opts)
        #print('Out',args)
        #opts, args = getopt.getopt(argv, "f:l:")
    except getopt.GetoptError:
        print('main.py -limit <limit> -subreddit <subreddit>')
        sys.exit(2)

    for opt, arg in opts:
        if opt in ['-l', '--limit']:
            #print('In opt')
            my_limit = arg
        elif opt in ['-s', '--subreddit']:
            sublist = arg
    my_limit=int(my_limit)
    sublist=sublist.split(',')
    #print(sublist)
    #exit()
    #sublist = [c for c in sys.argv[2].split(',')]  # if you want ints


    #print('List',sublist)
    #exit()



    #my_limit=1
    #sublist=['wallstreetbets','investing','algotrading','options','pennystocks']
    Reddit=Reddit(Client_id='2UeLu2o9q9xE_Q',Client_Secret='mFQEiCVBUobTJaG-eDgV2ljVhYQ',Agent_Name='Sentimental_Analysis')
    reddit_login=Reddit.Login_info()

    reddit_daily=[]
    for sub in sublist:
        #Get data only for day
        print('Getting Data for Subreddit ' + sub+ ' for all top posts of limit ' + str(my_limit))
        my_data= Reddit.get_SubbReddit_data(reddit_login,sub,max_limit=my_limit)
        reddit_daily.append(my_data)
        #Get Detail Reddit Data
        daily_detail_data= Reddit.get_SubbReddit_Detail_data(reddit_login,my_data)

    #print(daily_detail_data)
    #exit()

    #Convert to Csv with daily details about comments 
    daily_file_name=Reddit.convert_Csv(reddit_daily,'daily')
    daily_detail_file_name = Reddit.convert_Csv(daily_detail_data,'daily_detail')


    #print(topics_daily.columns)
    #print(topics_daily)



    #print(daily_detail_data)
    #print(my_data)
    #exit()
    #Valid Data only for print
    daily_data=Reddit.get_Daily_data(my_data)
    #print(daily_data)
    topics_daily = pd.DataFrame(my_data)
    #print(topics_daily)
    #for i in topics_daily:
       # print(i)


#For Daily  csv headings only
    current_time = datetime.now()
    daily_date=current_time.strftime('%m_%d_%Y')
    topics_daily.to_csv(daily_date+'.csv', index=False)
    #print(topics_daily.columns)
    #print(topics_daily)








# See PyCharm help at https://www.jetbrains.com/help/pycharm/

