import sqlite3

conn = sqlite3.connect("healthcare.db")
cursor = conn.cursor()

cursor.execute("SELECT COUNT(*) FROM hospital")
print("Hospitals:", cursor.fetchone()[0])

cursor.execute("SELECT COUNT(*) FROM pharmacy")
print("Pharmacies:", cursor.fetchone()[0])

conn.close()