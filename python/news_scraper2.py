# import os
# import requests
# from bs4 import BeautifulSoup
# import json
# import string
# import nltk
# from nltk.tokenize import sent_tokenize
# from random import shuffle

# nltk.download('punkt')

# def get_image_url(soup):
#     images = soup.select('img')
#     if images:
#         img_url = images[0].get('src')
#         return img_url
#     return None

# def scrape_article(url):
#     try:
#         response = requests.get(url)
#         response.raise_for_status()

#         soup = BeautifulSoup(response.content, 'html.parser')
#         contents = soup.select('.article-text')
#         if not contents:
#             contents = soup.select('.duet--article--article-body-component')
#             if not contents:
#                 contents = soup.select('.post')
#                 if not contents:
#                     contents = soup.select('#article-body')

#         if not contents:
#             return None, None

#         # Extract the content as is without paraphrasing
#         content = "\n\n".join([p.text.strip() for p in contents])

#         # Get the image URL
#         img_url = get_image_url(soup)

#         return content, img_url

#     except requests.exceptions.RequestException as e:
#         print(f"Error: {e}")
#         return None, None

# def create_unique_article(paraphrased_content):
#     sentences = sent_tokenize(paraphrased_content)

#     # Shuffle the sentences to create a unique order
#     shuffled_sentences = sentences[:]
#     shuffle(shuffled_sentences)

#     # Combine shuffled sentences to form the unique article
#     unique_content = " ".join(shuffled_sentences)

#     return unique_content

# def main():
#     if os.path.exists('data.json'):
#         with open('data.json', 'r', encoding='utf-8') as file:
#             data = json.load(file)
#     else:
#         print("data.json not found. Please make sure the file exists in the same directory.")
#         return

#     updated_data = False
#     for i, article in enumerate(data['articles']):
#         url = article['url']
#         if 'paraphrased_content' not in article:
#             content, _ = scrape_article(url)  # We don't need the img_url, so we use "_"
#             if content:
#                 data['articles'][i]['paraphrased_content'] = create_unique_article(content)
#                 updated_data = True

#     # Update the data.json file if any changes were made
#     if updated_data:
#         with open('data.json', 'w', encoding='utf-8') as file:
#             json.dump(data, file, indent=4)
#         print("Data updated successfully.")
#     else:
#         print("No changes were made to the data.")

# if __name__ == '__main__':
#     main()



import os
import requests
from bs4 import BeautifulSoup
import json
import string
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from random import shuffle, choice
import random
import heapq

nltk.download('punkt')
nltk.download('stopwords')

# Define a list of random publisher names
PUBLISHER_NAMES = ["Tech News Network", "Digital Gazette", "Innovative Times", "Tech Insider", "InfoWave", "Tech Chronicle"]

def get_image_url(soup):
    images = soup.select('img')
    if images:
        img_url = images[0].get('src')
        return img_url
    return None

def scrape_article(url):
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'html.parser')
        contents = soup.select('.article-text')
        if not contents:
            contents = soup.select('.duet--article--article-body-component')
            if not contents:
                contents = soup.select('.post')
                if not contents:
                    contents = soup.select('#article-body')

        if not contents:
            return None  # Return None for content

        # Extract the content as is without paraphrasing
        content = "\n\n".join([p.text.strip() for p in contents])

        return content

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def create_unique_article(paraphrased_content, original_content):
    # Tokenize the content into sentences
    sentences = sent_tokenize(paraphrased_content)

    # Find tables in the original content
    soup_original = BeautifulSoup(original_content, 'html.parser')
    tables = soup_original.find_all('table')

    # Shuffle the sentences to create a unique order
    shuffled_sentences = sentences[:]
    shuffle(shuffled_sentences)

    # Combine shuffled sentences and tables to form the unique article
    unique_content = ""
    table_index = 0

    for sentence in shuffled_sentences:
        # Add tables at appropriate positions
        if "<table>" in sentence:
            unique_content += str(tables[table_index])
            table_index += 1
        else:
            unique_content += sentence

    return unique_content

def summarize_content(content, num_sentences=5):
    # Tokenize the content into sentences
    sentences = sent_tokenize(content)

    # Remove punctuation and convert to lowercase
    translator = str.maketrans('', '', string.punctuation)
    clean_sentences = [sentence.translate(translator).lower() for sentence in sentences]

    # Tokenize words in sentences
    words = [word for sentence in clean_sentences for word in word_tokenize(sentence)]

    # Remove stopwords and perform stemming
    stop_words = set(nltk.corpus.stopwords.words('english'))
    words = [word for word in words if word not in stop_words]

    # Calculate word frequency
    word_freq = nltk.FreqDist(words)

    # Calculate sentence scores based on word frequency
    sentence_scores = {}
    for sentence in clean_sentences:
        for word in word_tokenize(sentence):
            if word in word_freq:
                if len(sentence.split()) < 30:  # Skip very long sentences
                    if sentence not in sentence_scores:
                        sentence_scores[sentence] = word_freq[word]
                    else:
                        sentence_scores[sentence] += word_freq[word]

    # Get top 'num_sentences' sentences with highest scores
    summary_sentences = heapq.nlargest(num_sentences, sentence_scores, key=sentence_scores.get)

    # Combine summary sentences to form the final summary
    summary = " ".join(summary_sentences)

    return summary

# Function to generate trending meta tags from the title
def generate_trending_tags(title, num_tags=3):
    words = word_tokenize(title.lower())  # Tokenize and convert to lowercase
    stop_words = set(nltk.corpus.stopwords.words("english"))
    words = [word for word in words if word.isalnum() and word not in stop_words]
    random.shuffle(words)  # Shuffle the words

    # Get top 'num_tags' words as trending meta tags
    trending_tags = words[:num_tags]

    return trending_tags

def main():
    if os.path.exists('data.json'):
        with open('data.json', 'r', encoding='utf-8') as file:
            data = json.load(file)
    else:
        print("data.json not found. Please make sure the file exists in the same directory.")
        return

    updated_data = False
    for i, article in enumerate(data['articles']):
        url = article['url']
        if 'paraphrased_content' not in article:
            content = scrape_article(url)
            if content:
                paraphrased_content = create_unique_article(content, content)
                data['articles'][i]['paraphrased_content'] = paraphrased_content
                updated_data = True

                # Summarize the paraphrased content with 5 sentences
                summarized_content = summarize_content(paraphrased_content, num_sentences=20)
                data['articles'][i]['summary'] = summarized_content

                # Generate a random publisher name
                data['articles'][i]['publisher'] = choice(PUBLISHER_NAMES)

                # Generate trending meta tags from the title
                title = article['title']
                trending_tags = generate_trending_tags(title, num_tags=10)
                data['articles'][i]['meta_tags'] = trending_tags

    # Update the data.json file if any changes were made
    if updated_data:
        with open('data.json', 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4)
        print("Data updated successfully.")
    else:
        print("No changes were made to the data.")

if __name__ == '__main__':
    main()
