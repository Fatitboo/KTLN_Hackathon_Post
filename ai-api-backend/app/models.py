import pandas as pd # type: ignore
import numpy as np 
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import app
class ContentBasedRecommender:

  MODEL_NAME = 'Content-Based'
  

  def __init__(self, items_df=None ):
    self.items_df = items_df
    self.item_ids = items_df['hackathon_id'].tolist()

  def get_model_name(self):
    return self.MODEL_NAME

  def _get_similar_items_to_user_profile(self, person_id, topn=1000):
    #Computes the cosine similarity between the user profile and all item profiles
    cosine_similarities = cosine_similarity(app.user_profiles[person_id], app.tfidf_matrix)
    #Gets the top similar items
    similar_indices = cosine_similarities.argsort().flatten()[-topn:]
    #Sort the similar items by similarity
    similar_items = sorted([(self.item_ids[i], cosine_similarities[0,i]) for i in similar_indices], key=lambda x: -x[1])
    return similar_items

  def recommend_items(self, user_id, items_to_ignore=[], topn=10, verbose=False):
    similar_items = self._get_similar_items_to_user_profile(user_id)
    #Ignores items the user has already interacted
    similar_items_filtered = list(filter(lambda x: x[0] not in items_to_ignore, similar_items))

    recommendations_df = pd.DataFrame(similar_items_filtered, columns=['hackathon_id', 'recStrength']) \
                                .head(topn)

    if verbose:
      if self.items_df is None:
          raise Exception('"items_df" is required in verbose mode')

      recommendations_df = recommendations_df.merge(self.items_df, how = 'left',
                                                    left_on = 'hackathon_id',
                                                    right_on = 'hackathon_id')[['recStrength', 'hackathon_id', 'name', 'url', 'themes']]


    return recommendations_df