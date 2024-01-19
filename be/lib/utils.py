# Load Database Packages
import sqlite3
# Creates database in the directory
conn = sqlite3.connect('./data/data.db', check_same_thread = False)
c = conn.cursor()

# Function to Track Input & Prediction
def create_emotionclf_table():
	c.execute('CREATE TABLE IF NOT EXISTS EmotionTable(rawtext TEXT, prediction TEXT)')

def add_prediction_details(rawtext, prediction):
	c.execute('INSERT INTO EmotionTable(rawtext, prediction) VALUES(?, ?)',(rawtext, prediction))
	conn.commit()

def view_all_prediction_details():
	c.execute('SELECT * FROM EmotionTable')
	data = c.fetchall()
	return data