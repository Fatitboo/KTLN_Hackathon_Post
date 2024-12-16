from flask import Flask, request, jsonify, make_response
import numpy as np
import scipy
import pandas as pd
import math
import random
from datetime import datetime, timedelta
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
from bson import ObjectId
import json

from pymongo import MongoClient
client = MongoClient("mongodb+srv://21522448:fuqeCwJnBb4GLDCb@cluster0.x24ts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['test']
app = Flask(__name__)
users_collection = db['Users']
event_type_strength = {
   'view': 1.0,
   'like': 2.5,
   'join': 5.0
}
df_hackathon = pd.read_csv('/app/app/data/main/hk_train_with_date.csv')
df_user = pd.DataFrame()
final_hk_ful=pd.read_csv('/app/app/data/final_data_hackathon_full.csv')
df_interactions = pd.read_csv('/app/app/data/main/combined_interactions.csv')
interactions_full_df = pd.DataFrame()
item_ids = pd.DataFrame()
tfidf_matrix_with_id = None
id_to_index = None
user_profiles = None
content_based_recommender_model=None
tfidf_matrix=None
cf_preds_df= None
cf_recommender_model=None
hybrid_recommender_model=None
def build_init_data():
  global df_user, df_hackathon, df_interactions, interactions_full_df, item_ids, tfidf_matrix_with_id, user_profiles, content_based_recommender_model,tfidf_matrix,users_items_pivot_matrix_df, cf_preds_df, cf_recommender_model,hybrid_recommender_model
  seeker_users = users_collection.find({'userType': {'$in': ['seeker']}})
  for user in seeker_users:
    print('user: ======> ',user)  

  df_interactions['interaction_strength'] = df_interactions['interaction_type'].apply(lambda x: event_type_strength[x])
  users_interactions_count_df = df_interactions.groupby(['user_id', 'hackathon_id']).size().groupby('user_id').size()
  users_with_enough_interactions_df = users_interactions_count_df[users_interactions_count_df > 0].reset_index()[['user_id']]
  interactions_from_selected_users_df = df_interactions.merge(users_with_enough_interactions_df,
                how = 'right',
                left_on = 'user_id',
                right_on = 'user_id')
  def smooth_user_preference(x):
    return math.log(1+x, 2)
  interactions_full_df = interactions_from_selected_users_df \
                    .groupby(['user_id', 'hackathon_id'])['interaction_strength'].sum() \
                    .apply(smooth_user_preference).reset_index()
  item_ids = df_hackathon['hackathon_id'].tolist()  # Replace with initial data if available

  tfidf_matrix_with_id = build_tfidf_matrix(df_hackathon)
  user_profiles = build_users_profiles()

  # data for cbf
  users_items_pivot_matrix_df = interactions_full_df.pivot(index='user_id',
                                                          columns='hackathon_id',
                                                          values='interaction_strength').fillna(0)
  users_items_pivot_matrix = users_items_pivot_matrix_df.to_numpy()
  users_ids = list(users_items_pivot_matrix_df.index)
  users_items_pivot_sparse_matrix = csr_matrix(users_items_pivot_matrix)
  NUMBER_OF_FACTORS_MF = 15
  U, sigma, Vt = svds(users_items_pivot_sparse_matrix, k = NUMBER_OF_FACTORS_MF)
  sigma = np.diag(sigma)
  all_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt)
  all_user_predicted_ratings_norm = (all_user_predicted_ratings - all_user_predicted_ratings.min()) / (all_user_predicted_ratings.max() - all_user_predicted_ratings.min())
  cf_preds_df = pd.DataFrame(all_user_predicted_ratings_norm, columns = users_items_pivot_matrix_df.columns, index=users_ids).transpose()


  content_based_recommender_model = ContentBasedRecommender(df_hackathon)
  cf_recommender_model = CFRecommender(cf_preds_df, df_hackathon)
  hybrid_recommender_model = HybridRecommender(content_based_recommender_model, cf_recommender_model, df_hackathon,
                                             cb_ensemble_weight=1.0, cf_ensemble_weight=100.0)

def build_tfidf_matrix(df_hk):
    global id_to_index,tfidf_matrix
    df_hk['challenge_description'] = df_hk['challenge_description'].fillna('')

    #Trains a model whose vectors size is 5000, composed by the main unigrams and bigrams found in the corpus, ignoring stopwords
    vectorizer = TfidfVectorizer(analyzer='word',stop_words='english',
                        ngram_range=(1, 2),
                        min_df=0.003,
                        max_df=0.5,
                        max_features=5000)

    words_to_replace = ["devpost", "30","00pm", "00",
                        "event", "build", "create",
                        "teams", "team", "world", "open", "new", "join", "good","projects",
                        "project","participants", "participant","challenge","gift","posted",
                        "tnr", "day", "prizes", "https", "learning", "learn", "students", "student",
                        "make", "community", "university", "come","com", "ll", "ended","people", "helps","help","high",
                        "hours", "year","use","using","time","started", "best","week","start","end", "hour", "participate",
                        "la ", "want", "meet", "need", "chance", "opportunity"  ]
                        # Combine the columns into a single string
    combined_series = df_hk['title'] + " " + df_hk['themes'] + " " + df_hk['organization_name'] + " " + df_hk['challenge_description']

    # Convert to lowercase for case-insensitivity
    combined_series = combined_series.str.lower()

    # Use word boundaries (\b) to replace whole words only
    pattern = r'\b(?:' + '|'.join(words_to_replace) + r')\b'

    # Replace the words with an empty string
    cleaned_combined_series = combined_series.replace(pattern, '', regex=True)
    tfidf_matrix = vectorizer.fit_transform(cleaned_combined_series)
    tfidf_df = pd.DataFrame.sparse.from_spmatrix(tfidf_matrix, index=item_ids, columns=vectorizer.get_feature_names_out())
    # Lưu trữ TF-IDF matrix dưới dạng sparse
    tfidf_matrix_with_id = csr_matrix(tfidf_df.sparse.to_coo())
    # print(tfidf_matrix)
    id_to_index = {item_id: idx for idx, item_id in enumerate(item_ids)}

    return tfidf_matrix_with_id

def get_item_profile(item_id):
  if item_id not in id_to_index:
    raise ValueError(f"Hackathon ID {item_id} not found!")
  idx = id_to_index[item_id]
  
  # Truy xuất vector tương ứng từ matrix gốc
  item_profile = tfidf_matrix_with_id[idx:idx+1]
  return item_profile

def get_item_profiles(ids):
  if isinstance(ids, (float, int)):
    ids = [ids]
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
  user_profiles = {}
  for person_id in interactions_indexed_df.index.unique():
      user_profiles[person_id] = build_users_profile(person_id, interactions_indexed_df)
  return user_profiles

def json_converter(obj):
  if isinstance(obj, ObjectId):
      return str(obj)
  raise TypeError("Type not serializable")

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

  def recommend_items(self, user_id, items_to_ignore=[], topn=10, verbose=False,recent_days=None):
    similar_items = self._get_similar_items_to_user_profile(user_id)
    #Ignores items the user has already interacted
    similar_items_filtered = list(filter(lambda x: x[0] not in items_to_ignore, similar_items))

    recommendations_df = pd.DataFrame(similar_items_filtered, columns=['hackathon_id', 'recStrength']) \
                                .head(topn*30)
    if recent_days is not None:
      if self.items_df is None:
        raise Exception('"items_df" is required to filter recent hackathons')

      # Ensure `start_date` column is in datetime format
      self.items_df['start_date'] = pd.to_datetime(self.items_df['start_date'])
      recent_cutoff = datetime.now() - timedelta(days=recent_days)
      
      # Filter by recent hackathons
      recent_items = self.items_df[self.items_df['start_date'] >= recent_cutoff]['hackathon_id']
      recommendations_df = recommendations_df[recommendations_df['hackathon_id'].isin(recent_items)]
      
      # Ensure that the number of recommendations doesn't exceed topn (either after filtering or not)
    recommendations_df = recommendations_df.head(topn)
    if verbose:
      if self.items_df is None:
          raise Exception('"items_df" is required in verbose mode')

      recommendations_df = recommendations_df.merge(self.items_df, how = 'left',
                                                    left_on = 'hackathon_id',
                                                    right_on = 'hackathon_id')[['recStrength', 'hackathon_id', 'title', 'url', 'themes']]


    return recommendations_df

class CFRecommender:

  MODEL_NAME = 'Collaborative Filtering'

  def __init__(self, cf_predictions_df, items_df=None):
    self.cf_predictions_df = cf_predictions_df
    self.items_df = items_df

  def get_model_name(self):
    return self.MODEL_NAME

  def recommend_items(self, user_id, items_to_ignore=[], topn=10, verbose=False, recent_days=None):
    # Get and sort the user's predictions
    sorted_user_predictions = self.cf_predictions_df[user_id].sort_values(ascending=False) \
                                .reset_index().rename(columns={user_id: 'recStrength'})

    # Recommend the highest predicted rating  that the user hasn't seen yet.
    recommendations_df = sorted_user_predictions[~sorted_user_predictions['hackathon_id'].isin(items_to_ignore)] \
                            .sort_values('recStrength', ascending = False) \
                            .head(topn*30)
    if recent_days is not None:
      if self.items_df is None:
        raise Exception('"items_df" is required to filter recent hackathons')

      # Ensure `start_date` column is in datetime format
      self.items_df['start_date'] = pd.to_datetime(self.items_df['start_date'])
      recent_cutoff = datetime.now() - timedelta(days=recent_days)
      
      # Filter by recent hackathons
      recent_items = self.items_df[self.items_df['start_date'] >= recent_cutoff]['hackathon_id']
      recommendations_df = recommendations_df[recommendations_df['hackathon_id'].isin(recent_items)]
      
      # Ensure that the number of recommendations doesn't exceed topn (either after filtering or not)
    recommendations_df = recommendations_df.head(topn)
    if verbose:
      if self.items_df is None:
        raise Exception('"items_df" is required in verbose mode')

      recommendations_df = recommendations_df.merge(self.items_df, how = 'left',
                                                    left_on = 'hackathon_id',
                                                    right_on = 'hackathon_id')[['recStrength', 'hackathon_id', 'title', 'url', 'themes']]


    return recommendations_df


class HybridRecommender:

  MODEL_NAME = 'Hybrid'

  def __init__(self, cb_rec_model, cf_rec_model, items_df, cb_ensemble_weight=1.0, cf_ensemble_weight=1.0):
    self.cb_rec_model = cb_rec_model
    self.cf_rec_model = cf_rec_model
    self.cb_ensemble_weight = cb_ensemble_weight
    self.cf_ensemble_weight = cf_ensemble_weight
    self.items_df = items_df

  def get_model_name(self):
    return self.MODEL_NAME

  def recommend_items(self, user_id, items_to_ignore=[], topn=10, verbose=False, recent_days=None):
    #Getting the top-1000 Content-based filtering recommendations
    cb_recs_df = self.cb_rec_model.recommend_items(user_id, items_to_ignore=items_to_ignore, verbose=verbose,
                                                        topn=1000).rename(columns={'recStrength': 'recStrengthCB'})

    #Getting the top-1000 Collaborative filtering recommendations
    cf_recs_df = self.cf_rec_model.recommend_items(user_id, items_to_ignore=items_to_ignore, verbose=verbose,
                                                        topn=1000).rename(columns={'recStrength': 'recStrengthCF'})

    #Combining the results by contentId
    recs_df = cb_recs_df.merge(cf_recs_df,
                                how = 'outer',
                                left_on = 'hackathon_id',
                                right_on = 'hackathon_id').fillna(0.0)

    #Computing a hybrid recommendation score based on CF and CB scores
    #recs_df['recStrengthHybrid'] = recs_df['recStrengthCB'] * recs_df['recStrengthCF']
    recs_df['recStrengthHybrid'] = (recs_df['recStrengthCB'] * self.cb_ensemble_weight) \
                                  + (recs_df['recStrengthCF'] * self.cf_ensemble_weight)
    recommendations_df = recs_df.sort_values('recStrengthHybrid', ascending=False)

    if recent_days is not None:
      if self.items_df is None:
        raise Exception('"items_df" is required to filter recent hackathons')

      # Ensure `start_date` column is in datetime format
      self.items_df['start_date'] = pd.to_datetime(self.items_df['start_date'])
      recent_cutoff = datetime.now() - timedelta(days=recent_days)
      
      # Filter by recent hackathons
      recent_items = self.items_df[self.items_df['start_date'] >= recent_cutoff]['hackathon_id']
      recommendations_df = recommendations_df[recommendations_df['hackathon_id'].isin(recent_items)]
      
      # Ensure that the number of recommendations doesn't exceed topn (either after filtering or not)
    recommendations_df = recommendations_df.head(topn)

    if verbose:
      if self.items_df is None:
        raise Exception('"items_df" is required in verbose mode')

      recommendations_df = recommendations_df.merge(self.items_df, how = 'left',
                                                    left_on = 'hackathon_id',
                                                    right_on = 'hackathon_id')[['recStrengthHybrid', 'hackathon_id', 'title', 'url', 'themes']]


    return recommendations_df


build_init_data()
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
        user_id = request.args.get('user_id')
        topn = int(request.args.get('topn', 10))
        recent_days = int(request.args.get('recent_days', 150))
        byModel = request.args.get('byModel')
        # items_to_ignore = request.args.getlist('items_to_ignore')
        seeker_users = users_collection.find({'isActive': True})
        for user in seeker_users:
          skills = user.get('settingRecommend', {}).get('skills', [])
          interested_in = user.get('settingRecommend', {}).get('interestedIn', [])
          print("🚀 ~ skills:", skills+interested_in)
        # seeker_users_list = list(seeker_users)
    
        # # Xóa '_id' nếu không muốn gửi về cho client
        # for user in seeker_users_list:
        #     user['_id'] = str(user['_id'])  # Chuyển đổi ObjectId thành chuỗi string để gửi qua JSON
        
        # # Trả về dữ liệu dưới dạng JSON
        # return jsonify(seeker_users_list)

        # Convert items_to_ignore to integers if necessary 
        # items_to_ignore = list(map(int, items_to_ignore))

        # if user_id not in helper.user_profiles:
        #     return jsonify({"error": "User profile not found"}), 404
        if byModel == 'cb':
          recommendations = content_based_recommender_model.recommend_items(
              user_id=user_id,
              # items_to_ignore=items_to_ignore,
              topn=topn,
              verbose=True,
              recent_days=recent_days
          )
        if byModel == 'cf':
             recommendations = cf_recommender_model.recommend_items(
              user_id=user_id,
              # items_to_ignore=items_to_ignore,
              topn=topn,
              verbose=True,
              recent_days=recent_days
          )
             
        if byModel == 'hd':
             recommendations = hybrid_recommender_model.recommend_items(
              user_id=user_id,
              # items_to_ignore=items_to_ignore,
              topn=topn,
              verbose=True,
              recent_days=recent_days
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
