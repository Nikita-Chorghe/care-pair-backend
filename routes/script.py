import joblib
import json
import sys
import ast

# Load the input data and model path from the JSON input

args = sys.argv
print(args)
# input_data = json.loads(input())
# model_path = input_data['modelPath']
# data = input_data['inputData']


# model_path = args[1]
# data = ast.literal_eval(args[2])

# # Load the saved model from the file
# model = joblib.load(model_path)

# # Make predictions on the input data
# predictions = model.predict(data)

# # Send the predictions back to Node.js
# print(json.dumps(predictions.tolist()))
# sys.stdout.flush()
