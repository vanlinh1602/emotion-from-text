import joblib 
import altair as alt
import pandas as pd
from altair_saver import save
from io import BytesIO
import base64
from lib.utils import add_prediction_details
import json

pipe_lr_vi = joblib.load(open("./models/vietnamese.pkl","rb"))
pipe_lr_en = joblib.load(open("./models/english.pkl","rb"))

def predict_emotions_vi(docx):
    results = pipe_lr_vi.predict([docx])
    return results[0]

def get_prediction_proba_vi(docx):
    results = pipe_lr_vi.predict_proba([docx])
    return results

def predict_emotions_en(docx):
    results = pipe_lr_en.predict([docx])
    return results[0]

def get_prediction_proba_en(docx):
    results = pipe_lr_en.predict_proba([docx])
    return results

def EmotionDetect_Vietnamese(data):
    text = data['text']
    prediction = predict_emotions_vi(text)
    probability = get_prediction_proba_vi(text)
    proba_df = pd.DataFrame(probability, columns = pipe_lr_vi.classes_)
    proba_df_clean = proba_df.T.reset_index()
    proba_df_clean.columns = ["emotions", "probability"]

    fig = alt.Chart(proba_df_clean).mark_bar().encode(x = 'emotions', y = 'probability', color = 'emotions')
    buffer = BytesIO()
    fig.save(fp=buffer, format='png', scale_factor=1.5)

    encoded_string = base64.b64encode(buffer.getvalue()).decode()
    response = {
        "emotion": prediction,
        "probability": probability.tolist().pop(),
        "chart": "data:image/png;base64," + encoded_string,
    }
    return response

def EmotionDetect_English(data):
    text = data['text']
    prediction = predict_emotions_en(text)
    probability = get_prediction_proba_en(text)
    proba_df = pd.DataFrame(probability, columns = pipe_lr_en.classes_)
    proba_df_clean = proba_df.T.reset_index()
    proba_df_clean.columns = ["emotions", "probability"]

    fig = alt.Chart(proba_df_clean).mark_bar().encode(x = 'emotions', y = 'probability', color = 'emotions')
    buffer = BytesIO()
    fig.save(fp=buffer, format='png', scale_factor=1.5)

    encoded_string = base64.b64encode(buffer.getvalue()).decode()
    response = {
        "emotion": prediction,
        "probability": probability.tolist().pop(),
        "chart": "data:image/png;base64," + encoded_string,
    }
    return response

def EmotionDetect(data):
    language = data['language']
    if language == "vi":
        return EmotionDetect_Vietnamese(data)
    elif language == "en":
        return EmotionDetect_English(data)

def Feedback(data):
    content = data['content']
    emotion = data['emotion']
    add_prediction_details(content, emotion)
    return {"status": "success"}
