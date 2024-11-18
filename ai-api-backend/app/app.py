from flask import Flask, request, jsonify, make_response
import numpy as np
import scipy
import pandas as pd
import math
import random
import sklearn
from nltk.corpus import stopwords
from scipy.sparse import csr_matrix
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse.linalg import svds
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
from crawl_data import get_data
import uuid
app = Flask(__name__)

event_type_strength = {
   'view': 1.0,
   'like': 2.5,
   'join': 4.0
}
df_hackathon = pd.read_csv('/app/app/data/hackathon_processed_text.csv')
df_user = pd.read_csv('/app/app/data/output_file_user.csv')
final_hk_ful = pd.read_csv('/app/app/data/final_data_hackathon_full.csv')
df_interactions = pd.read_csv('/app/app/data/interactions_1.csv')
df_interactions['interaction_strength'] = df_interactions['interaction_type'].apply(lambda x: event_type_strength[x])
users_interactions_count_df = df_interactions.groupby(['user_id', 'hackathon_id']).size().groupby('user_id').size()
users_with_enough_interactions_df = users_interactions_count_df[users_interactions_count_df > 0].reset_index()[['user_id']]
interactions_from_selected_users_df = df_interactions.merge(users_with_enough_interactions_df,
               how = 'right',
               left_on = 'user_id',
               right_on = 'user_id')

item_ids = df_hackathon['hackathon_id'].tolist()  # Replace with initial data if available
def smooth_user_preference(x):
  return math.log(1+x, 2)

interactions_full_df = interactions_from_selected_users_df \
                    .groupby(['user_id', 'hackathon_id'])['interaction_strength'].sum() \
                    .apply(smooth_user_preference).reset_index()
def build_tfidf_matrix(df_hk):
    df_hk['challenge_description'] = df_hk['challenge_description'].fillna('')

    #Trains a model whose vectors size is 5000, composed by the main unigrams and bigrams found in the corpus, ignoring stopwords
    vectorizer = TfidfVectorizer(analyzer='word',stop_words='english',
                        ngram_range=(1, 2),
                        min_df=0.003,
                        max_df=0.5,
                        max_features=5000)

    words_to_replace = ["devpost","hackers","hacking", "hacks", "hackathon", "hack", "30","00pm", "00",
                        "event", "build", "create",
                        "teams", "team", "world", "open", "new", "join", "good","projects",
                        "project","participants", "participant","challenge","gift","posted",
                        "tnr", "day", "prizes", "https", "learning", "learn", "students", "student",
                        "make", "community", "university", "come","com", "ll", "ended","people", "helps","help","high",
                        "hours", "year","use","using","time","started", "best","week","start","end", "hour", "participate",
                        "la ", "want", "meet", "need", "chance", "opportunity"  ]
                        # Combine the columns into a single string
    combined_series = df_hk['name'] + " " + df_hk['themes'] + " " + df_hk['organization_name'] + " " + df_hk['challenge_description']

    # Convert to lowercase for case-insensitivity
    combined_series = combined_series.str.lower()

    # Use word boundaries (\b) to replace whole words only
    pattern = r'\b(?:' + '|'.join(words_to_replace) + r')\b'

    # Replace the words with an empty string
    cleaned_combined_series = combined_series.replace(pattern, '', regex=True)
    tfidf_matrix = vectorizer.fit_transform(cleaned_combined_series)
    return tfidf_matrix


tfidf_matrix = build_tfidf_matrix(df_hackathon)


def get_item_profile(item_id):
  idx = item_ids.index(item_id)
  item_profile = tfidf_matrix[idx:idx+1]
  return item_profile

def get_item_profiles(ids):
  item_profiles_list = [get_item_profile(x) for x in ids]
  item_profiles = scipy.sparse.vstack(item_profiles_list)
  return item_profiles

def build_users_profile(person_id, interactions_indexed_df):
  interactions_person_df = interactions_indexed_df.loc[person_id]
  user_item_profiles = get_item_profiles(interactions_person_df['hackathon_id'])

  user_item_strengths = np.array(interactions_person_df['interaction_strength']).reshape(-1,1)
  #Weighted average of item profiles by the interactions strength
  user_item_strengths_weighted_avg = np.sum(user_item_profiles.multiply(user_item_strengths), axis=0) / np.sum(user_item_strengths)
  user_profile_norm = sklearn.preprocessing.normalize(np.asarray(user_item_strengths_weighted_avg).reshape(1, -1))
  return user_profile_norm

def build_users_profiles():
  interactions_indexed_df = interactions_full_df[interactions_full_df['hackathon_id'].isin(df_hackathon['hackathon_id'])].set_index('user_id')
#   print("🚀 ~ interactions_indexed_df:", interactions_indexed_df)
  user_profiles = {}
  for person_id in interactions_indexed_df.index.unique():
      user_profiles[person_id] = build_users_profile(person_id, interactions_indexed_df)
  return user_profiles

user_profiles = build_users_profiles()
class ContentBasedRecommender:

  MODEL_NAME = 'Content-Based'

  def __init__(self, items_df=None):
    self.item_ids = item_ids
    self.items_df = items_df

  def get_model_name(self):
    return self.MODEL_NAME

  def _get_similar_items_to_user_profile(self, person_id, topn=1000):
    print("🚀 ~ person_id:", person_id)
    #Computes the cosine similarity between the user profile and all item profiles
    # print("🚀 ~ user_profiles:", user_profiles)
    if person_id in user_profiles:

        cosine_similarities = cosine_similarity(user_profiles[person_id], tfidf_matrix)
        #Gets the top similar items
        similar_indices = cosine_similarities.argsort().flatten()[-topn:]
        #Sort the similar items by similarity
        similar_items = sorted([(item_ids[i], cosine_similarities[0,i]) for i in similar_indices], key=lambda x: -x[1])
        return similar_items
    else:
        print(f"Person ID {person_id} not found in user_profiles.")

  def recommend_items(self, user_id, items_to_ignore=[], topn=10, verbose=False):
    similar_items = self._get_similar_items_to_user_profile(user_id)
    #Ignores items the user has already interacted
    similar_items_filtered = list(filter(lambda x: x[0] not in items_to_ignore, similar_items))

    recommendations_df = pd.DataFrame(similar_items_filtered, columns=['hackathon_id', 'recStrength']) \
                                .head(topn)
    recommendations_df_u = recommendations_df.merge(self.items_df, how = 'left',
                                                    left_on = 'hackathon_id',
                                                    right_on = 'hackathon_id')[[ 'hackathon_id', 'url']]
    # print("🚀 ~ recommendations_df_u:", recommendations_df_u)
    if verbose:
      if self.items_df is None:
          raise Exception('"items_df" is required in verbose mode')

      recommendations_df = recommendations_df_u.merge(final_hk_ful, how = 'left',
                                                    left_on = 'url',
                                                    right_on = 'url')


    return recommendations_df

content_based_recommender_model = ContentBasedRecommender(df_hackathon)

# Update the user profiles after each data update
# def update_user_profiles():
#     global user_profiles, df_hackathon, df_interactions
#     interactions_indexed_df = df_interactions[df_interactions['hackathon_id'].isin(df_hackathon['hackathon_id'])].set_index('user_id')
#     user_profiles = {}
#     for person_id in interactions_indexed_df.index.unique():
#         user_profiles[person_id] = build_users_profile(person_id, interactions_indexed_df)

# Endpoint to update data

@app.route("/test", methods=['GET'])
def test():
    # df_hackathon = pd.read_csv('/app/app/data/hackathon_processed_text.csv')
    subset_df = df_hackathon.iloc[0:1]
    # Convert the subset DataFrame to a JSON response
    response = subset_df.to_dict(orient="records")  # Convert to list of dicts for JSON compatibility
    return jsonify(response)

@app.route('/update_data', methods=['POST'])
def update_data():
    global df_hackathon, df_user, df_interactions, content_based_recommender_model

    # Receive data as JSON and update dataframes
    data = request.json
    df_hackathon = pd.DataFrame(data.get('df_hackathon', []))
    df_user = pd.DataFrame(data.get('df_user', []))
    df_interactions = pd.DataFrame(data.get('df_interactions', []))

    # Update the recommendation model with new data
    # content_based_recommender_model = ContentBasedRecommender(df_hackathon)
    # update_user_profiles()
    return jsonify({"message": "Data updated successfully!"})

# Endpoint to get recommendations
@app.route('/recommend-cb', methods=['GET'])
def recommend():
    try:
        user_id = int(request.args.get('user_id'))
        topn = int(request.args.get('topn', 10))
        # items_to_ignore = request.args.getlist('items_to_ignore')

        # Convert items_to_ignore to integers if necessary
        # items_to_ignore = list(map(int, items_to_ignore))

        # if user_id not in helper.user_profiles:
        #     return jsonify({"error": "User profile not found"}), 404

        recommendations = content_based_recommender_model.recommend_items(
            user_id=user_id,
            # items_to_ignore=items_to_ignore,
            topn=topn,
            verbose=True
        )
        # recommendation_ids = recommendations['url']

        # matching_hackathons = final_hk_ful[final_hk_ful['url'].isin(recommendation_ids)]

    # logic xử lý
        response = make_response(recommendations.to_json(orient='records'))
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        return response
    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/get-hackathon-detail/<int:hk_id>', methods=['GET'])
def get_hackathon_detail(hk_id):
    try:
        result = final_hk_ful.loc[final_hk_ful['id'] == hk_id]

    # logic xử lý
        response = make_response(result.to_json(orient='records'))
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        return response
    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


@app.route('/crawl', methods=['POST'])
def crawl():
    data = request.get_json()
    from_index = int(data.get("from", 0))
    to_index = int(data.get("to", 0))
    path = "/app/app/data/file_part_1.csv"
    myuuid = uuid.uuid4()
    with open(path) as f:
        cr_df_hackathon = pd.read_csv(f, dtype={'age':np.float64, 'sibsp':np.int64, 'parch':np.int64})
    subset_df = cr_df_hackathon.iloc[from_index:to_index] 
    df_projects = pd.DataFrame(columns=["project_name","gallery", "content", "built_with", "app_links", "submitted_to", "created_by","updates","liked_by",'likes', 'submitted_to_url', 'created_by_username'])

    for index, row in subset_df.iterrows():
        url = row['url']
        print("row "+str(index) + ":  url: "+ url)
        data = get_data(url)
        if data:
            subset_df.at[index, 'projects'] = str(data['projects']) if isinstance(data['projects'], list) else data['projects']
            subset_df.at[index, 'view_by'] = str(data['view_by']) if isinstance(data['view_by'], list) else data['view_by']
            subset_df.at[index, 'like_by'] = str(data['like_by']) if isinstance(data['like_by'], list) else data['like_by']
            subset_df.at[index, 'join_by'] = str(data['join_by']) if isinstance(data['join_by'], list) else data['join_by']
            df2 = data['df_projects']
            df_projects = pd.concat([df_projects, df2], ignore_index=True)


    df_projects.to_csv(f'/app/app/data_crawl_project/file_part_{myuuid}.csv', index=False)
    subset_df.to_csv(f'/app/app/data_crawl/file_part_{myuuid}.csv', index=False)
    return jsonify('ok')

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
