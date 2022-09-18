import pandas as pd

input_book = pd.read_excel("./words.xlsx")
input_book.to_csv("sample.csv")