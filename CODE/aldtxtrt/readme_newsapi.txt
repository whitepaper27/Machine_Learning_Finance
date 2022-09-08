
File Needed:-

1.) Main_News_Api.py
2.) Final_News_Copy.ipynb


Requirements:-
  Python 3.7

Packages:-
 pip install panda
 pip install newsapi
 pip install requests
 pip install json
 pip install pandas
 pip install numpy

Optional for debugging/development:-
a.) Jupyter Notebook
b.) pycharm 

Steps to Gather Data(Method 1):-

1.) Clone the Repo:
	git clone https://github.gatech.edu/gwalavalkar3/cse6242project

2.) Go to https://newsapi.org/ and registered here . 

3.) Get the API key.

4.) Go to Main_News_Api.py and edit the file. Replace client Secret with the API Key you get it from the above on below line. 

		my_daily_news=NewsApi(Client_id='CS6242',Client_Secret='<API_KEY_ABOVE',Agent_Name='News Api')
	
		python Main_News_Api.py --name "<<file_name>>" --day <<days_to_collect>>

	E.g.
		python Main_News_Api.py --name "stock_sahil.csv" --day 2

4.) Run below program either through batch scheduled or manually as stock fike with your name :-

		python Main_News_Api.py --name "stock_<name>.csv"
	
Steps to Gather Data(Method 2)	:-

1.) Open Final_News_Copy.ipynb
2.) Changed below lines and run the program 

stock_symbol = pd.read_csv("stock_sahil.csv") ##File to read coressponding to name
my_day=1#No. of days to gather data
apiKey='b3ef5c3d00a##############'#####Api Key hwew

Intially Once gather gathered for 30 days sent it by team .Rename the file stocks_news.csv to stocks_news_<yourname.csv> and either upload/sent to common group folder and sent it by mail.
