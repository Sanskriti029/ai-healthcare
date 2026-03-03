import requests
import sqlite3

conn = sqlite3.connect("healthcare.db")
cursor = conn.cursor()

# Create tables if not exist
cursor.execute("""
CREATE TABLE IF NOT EXISTS hospital (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    address TEXT,
    city TEXT,
    phone TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS pharmacy (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    address TEXT,
    city TEXT,
    phone TEXT,
    open_24hrs BOOLEAN
)
""")

query = """
[out:json];
area["name"="Bhopal"]->.searchArea;
(
  node["amenity"="pharmacy"](area.searchArea);
  node["amenity"="hospital"](area.searchArea);
);
out;
"""

url = "https://overpass-api.de/api/interpreter"
response = requests.post(url, data={"data": query})

if response.status_code != 200:
    print("API Error:", response.status_code)
    exit()

data = response.json()

for element in data.get("elements", []):
    tags = element.get("tags", {})
    name = tags.get("name", "Unknown")
    amenity = tags.get("amenity", "")

    if amenity == "pharmacy":
        cursor.execute("""
        INSERT INTO pharmacy (name, address, city, phone, open_24hrs)
        VALUES (?, ?, ?, ?, ?)
        """, (name, "Bhopal", "Bhopal", "", False))

    elif amenity == "hospital":
        cursor.execute("""
        INSERT INTO hospital (name, address, city, phone)
        VALUES (?, ?, ?, ?)
        """, (name, "Bhopal", "Bhopal", ""))

conn.commit()
conn.close()

print("Real Bhopal data inserted successfully!")