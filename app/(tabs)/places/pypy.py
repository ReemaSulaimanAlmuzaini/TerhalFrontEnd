import pandas as pd
df =pd.read_csv('placesDemo.csv')
df.to_json('placesDemo.json',orient="records",force_ascii=False)