import sqlite3
import itertools
import flask
from flask import request

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/stocks', methods=['GET'])
def stocks_route():
    ticker = request.args.get('ticker', default=1, type=str)
    stdate = request.args.get('stdate', default='*', type=str)
    eddate = request.args.get('eddate', default='*', type=str)

    conn = sqlite3.connect('../../aldbstre/dbstore.db')
    cur = conn.cursor()
    cur.execute("select ticker, date,  close from stocks where ticker='%s'" % ticker)
    rows = cur.fetchall()
    updates = {}
    for row in rows:
        updates[row[0]] = str(row[0]) + ':' + str(row[1]) + ':' + str(row[2])

    return updates


@app.route('/', methods=['GET'])
def home_route():
    return "<html></html><body align=center valign=middle><H1>Project Alpine</h1></body>"


if __name__ == '__main__':
    app.run()
