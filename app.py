# Core Packages
import streamlit as st
from streamlit_chat import message
import altair as alt


# EDA Packages
import pandas as pd
import numpy as np

# Load Model
import joblib 
pipe_lr = joblib.load(open("./models/vietnamese.pkl","rb"))

# init

st.session_state.setdefault('chat', [])
st.session_state.setdefault('user1', '')
st.session_state.setdefault('user2', '')

# Function
def predict_emotions(docx):
	results = pipe_lr.predict([docx])
	return results[0]

def get_prediction_proba(docx):
	results = pipe_lr.predict_proba([docx])
	return results

def on_input_user_1():
    user_input = st.session_state.user_1
    st.session_state.chat.append({'type': 'user1', 'data': user_input})
    st.session_state.__setitem__('user1', user_input)

def on_input_user_2():
    user_input = st.session_state.user_2
    st.session_state.chat.append({'type': 'user2', 'data': user_input})
    st.session_state.__setitem__('user2', user_input)


emotions_emoji_dict = {"anger" : "😠", "disgust" : "🤮", "fear" : "😨😱", "happy" : "🤗", "joy" : "😂", "neutral" : "😐", "sad" : "😔", "sadness" : "😔", "shame" : "😳", "surprise" : "😮"}

# Main Application
def main():
	menu = ["Emotion Detect", "Chat Detect", "Conversation Detect"]
	choice = st.sidebar.selectbox("Menu", menu)
	if choice == "Emotion Detect":
		st.title("Emotion Detect")

		with st.form(key='emotion_clf_form'):
			raw_text = st.text_area("Type Here")
			submit_text = st.form_submit_button(label = 'Submit')

		if submit_text:
			col1, col2  = st.columns(2)

			# Apply Function Here
			prediction = predict_emotions(raw_text)
			probability = get_prediction_proba(raw_text)
		

			with col1:
				st.success("Original Text")
				st.write(raw_text)

				st.success("Prediction")
				emoji_icon = emotions_emoji_dict[prediction]
				st.write("{}:{}".format(prediction, emoji_icon))
				st.write("Confidence:{}".format(np.max(probability)))

			with col2:
				st.success("Prediction Probability")
				# st.write(probability)
				proba_df = pd.DataFrame(probability, columns = pipe_lr.classes_)
				# st.write(proba_df.T)
				proba_df_clean = proba_df.T.reset_index()
				proba_df_clean.columns = ["emotions", "probability"]

				fig = alt.Chart(proba_df_clean).mark_bar().encode(x = 'emotions', y = 'probability', color = 'emotions')
				st.altair_chart(fig,use_container_width = True)

	elif choice == "Chat Detect":
		st.title("Chat Emotion Detect")
		col1, col2, col3  = st.columns(3)
		with col1:
			textUser1 = st.session_state['user1']
			prediction1 = predict_emotions(textUser1)
			probability1 = get_prediction_proba(textUser1)

			st.success("User 1")
			emoji_icon1 = emotions_emoji_dict[prediction1]
			st.write("{}: {}".format(prediction1, emoji_icon1))
			st.write("Confidence:{}".format(np.max(probability1)))

			textUser2 = st.session_state['user2']
			prediction2 = predict_emotions(textUser2)
			probability2 = get_prediction_proba(textUser2)
			st.success("User 2")
			emoji_icon2 = emotions_emoji_dict[prediction2]
			st.write("{}: {}".format(prediction2, emoji_icon2))
			st.write("Confidence:{}".format(np.max(probability2)))

		with col2:
			st.title("Chat 1")
			chat_placeholder = st.empty()
			with chat_placeholder.container():    
				for i in range(len(st.session_state['chat'])):                
					if (st.session_state['chat'][i]['type'] != 'user1'):
						message(st.session_state['chat'][i]['data'], key=f"{i}_user1_chat1")
					else:
						message(st.session_state['chat'][i]['data'], is_user=True,key=f"{i}_user2_chat1")
					
			with st.container():
				st.text_input("User 1:",on_change=on_input_user_1, key="user_1")
		with col3:
			st.title("Chat 2")
			chat_placeholder = st.empty()
			with chat_placeholder.container():    
				for i in range(len(st.session_state['chat'])):                
					if (st.session_state['chat'][i]['type'] != 'user2'):
						message(st.session_state['chat'][i]['data'], key=f"{i}_user2_chat2")
					else:
						message(st.session_state['chat'][i]['data'], is_user=True,key=f"{i}_user1_chat2")
			with st.container():
				st.text_input("User 2:",on_change=on_input_user_2, key="user_2")
	else:
		st.title("Comming soon")
			
				

				
if __name__ == '__main__':
	main()