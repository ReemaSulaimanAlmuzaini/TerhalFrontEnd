import json

# Read the broken JSON
with open("placesDemo.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Function to fix each string
def fix_text(text):
    try:
        return text.encode("latin1").decode("utf-8")
    except:
        return text

# Fix all place names
for item in data:
    item["place_name"] = fix_text(item["place_name"])

# Save repaired file
with open("places_fixed.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Done. Check places_fixed.json")