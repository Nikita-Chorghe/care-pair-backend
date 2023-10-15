from tokenize import Ignore
import joblib
import json
import sys
import ast
import pandas as pd
# Load the input data and model path from the JSON input

args = sys.argv
model_path = args[1]
P_Id = ast.literal_eval(args[2])
# P_Id = 3

model = joblib.load(model_path)
df = pd.read_csv("./public/Combined.csv", index_col=None)
df = df.drop(["Unnamed: 0", "N_Id"], axis=1)

# predictions = model.predict(data)


# print(json.dumps(predictions.tolist()))

# if knn then un comment the following

rslt_df = df[df['P_Id'] == P_Id]
results = model.predict_proba(rslt_df)

#print(results)

temp_ar = [i for i in range(1, min(5, len(results)))]
ans = []
for r in range(len(results)):
  temp = zip(list(results[r]), temp_ar)
  ans.append(sorted(list(temp))[::-1][:1])
  
#print(ans)
top_five = {}
#top_five = []
for a in range(len(ans)):
  if len(top_five) >= 5:
    break

  if ans[a][0][1] not in top_five:
    top_five[ans[a][0][1]] = ans[a][0][0]
  elif ans[a][0][0] > top_five[ans[a][0][1]]:
      top_five[ans[a][0][1]] = ans[a][0][0]

#print(top_five)
top_five = sorted(top_five.items(), key=lambda x:x[1])[::-1]
print(json.dumps(top_five))



# print(json.dumps(ans.tolist()))

#till now was knn