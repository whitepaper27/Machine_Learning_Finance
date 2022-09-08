Website Link: https://trade-right.herokuapp.com/
Username: uname
Password: pwd

Description:-

We need Python 3.7 along with Jupiter notebook below packages:-
notebook
newsapi
newsapi-python
pandas
numpy
numpy==1.19.3
yfinance
vaderSentiment
nltk
sklearn
matplotlib
xgboost
seaborn
nltk==3.5 
pandas==1.0.5 
numpy==1.18.5
sklearn==0.23.1



Installtion:-

conda create -n test python=3.7
conda activate test

Packaged needed for enviorment test:-
pip install notebook
pip install newsapi
pip install newsapi-python
pip install pandas
pip install numpy
pip install numpy==1.19.3
pip install yfinance
pip install vaderSentiment
pip install nltk
pip install sklearn
pip install matplotlib
pip install xgboost
pip install seaborn
pip install nltk==3.5 
pip install pandas==1.0.5 
pip install numpy==1.18.5
pip install sklearn==0.23.1

Execution:-
DATA GATHERING(NewsAPI/Reddit):-
Steps To Gather Data from NewsAPI:-

Source code of files are at code\aldtxtrt location from below location if not present:-
Input File:-stock_sahil.csv or S&P500-Symbols.csv
Output File :-stocks_news.csv

1.) Go to code folder. 

2.) Go to https://newsapi.org/ and registered here . 

3.) Get the API key.

4.) Go to code/aldtxtr

5.) Open anaconda and go to code\aldtxtrt.

6.) Start jupyter notebook from Virtual enviorment test.

7.) Run the Notebook Final_News_Copy.ipynb


Steps To Gather Data from Yahoo Finance:-
Source code of files are at code\aldtxtrt location:-

Input File needed:-S&P500-Symbols.csv
OutPut File:-Ticker_Values_market.csv

1.)  Run the Notebook Yahoo Finance S&P 500.ipynb


MACHINE LEARNING & DATA ANALYSIS:-

Steps to Run Models:-
Expriment 1:-
Source code of files are at code\aldtxtrt location:-

These files are more than 100MB so please download it here and put this on code\aldtxtrt location.
https://gtvault-my.sharepoint.com/personal/ssoni41_gatech_edu/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fssoni41%5Fgatech%5Fedu%2FDocuments%2FCS6242%5FGroupProject

Input file needed:-(Ticker_Values.csv/stocks_news.csv/stocks_news_newformat.csv) 
Output file :-Stock_Signals.csv ---------->Used on UI
1) Run the Notebook Stocks_Analysis.ipynb:-


Experiments related to baseline VADER model and RoBERTa

Expriment 2:-
All code and data is present here code/alds/
VADER Baseline
Requirements - Ideally code should execute in latest versions of following packages, if not please ensure following versions of packages are present

- Ensure train.csv and test.csv is same folder as the notebook baseline-vader-sentiment.ipynb
- Run each cell of notebook to produce baseline VADER scores on test set.

Expriment 3:-
All code and data is present here code/alds/
RoBERTa Experiment 
- These experiments were done in Google Colab. Following are list of steps to run the experiment there.
- Goto https://colab.research.google.com/ 
- Ensure you are logged into google
- Click on file and upload stock_nlp_roberta.ipynb
- Click on Runtim>Change Runtime Time> Ensure GPU is selected
- Click on Files icon in sidebar
- Click icon Upload to session storage and upload train_attr.csv and test_attr.csv
- Once upload is complete, click on Runtime and run all cells


FRONT END(UI):-

Deploying Application on Local Machine:

Requirements:
	-Python 3.x.x
	-Chrome

1.) Navigate to code/frontend folder
2.) Startup a server by opening shell within folder and typing in:

		python -m http.server 5000

3.) Open browser and navigate to localhost:5000

4) Login username password
ta/ta


DATABASE:-

1. Download the lastest PostgreSQL from this location: https://www.postgresql.org/download/
2. Install the database as per the instructions outlined here: https://www.postgresql.org/docs/13/tutorial-install.html
3. Once the database is up and running, use DBeaver to connect to this database
   Note: DBeaver can be downloaded from here: https://dbeaver.io/download/
4. Create a scheme called alpine using code/aldbstre/pgMain.sql from ::

