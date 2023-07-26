# import os
# import requests
# from bs4 import BeautifulSoup
# import json
# import nltk
# from nltk.corpus import wordnet
# from nltk.tokenize import word_tokenize, sent_tokenize
# import string
# import re
# from random import sample

# nltk.download('punkt')
# nltk.download('wordnet')
# nltk.download('averaged_perceptron_tagger')

# def get_synonyms(word):
#     synonyms = set()
#     for syn in wordnet.synsets(word):
#         for lemma in syn.lemmas():
#             synonyms.add(lemma.name())
#     return list(synonyms)

# def is_supporting_word(pos):
#     return pos.startswith('RB') or pos.startswith('MD') or pos.startswith('DT')

# def get_best_synonym(word, context):
#     synonyms = get_synonyms(word)
#     scores = {syn: nltk.edit_distance(context, syn) for syn in synonyms}
#     best_syn = min(scores, key=scores.get)
#     return best_syn

# def paraphrase_sentence(sentence):
#     tokens = word_tokenize(sentence)
#     paraphrased_tokens = []

#     for i, (word, pos) in enumerate(nltk.pos_tag(tokens)):
#         if not is_supporting_word(pos) and word.isalpha():
#             context = " ".join(tokens[max(0, i-3):i] + tokens[i+1:min(i+4, len(tokens))])
#             paraphrased_word = get_best_synonym(word, context) if get_synonyms(word) else word
#             paraphrased_tokens.append(paraphrased_word)
#         else:
#             paraphrased_tokens.append(word)

#     paraphrased_sentence = " ".join(paraphrased_tokens)
#     return paraphrased_sentence

# def correct_grammar(paraphrased, original):
#     # Capitalize the first letter of the sentence
#     if original[0].isupper():
#         paraphrased = paraphrased.capitalize()
#     else:
#         paraphrased = paraphrased[0].lower() + paraphrased[1:]

#     # Ensure proper punctuation
#     paraphrased = paraphrased.rstrip(string.punctuation)
#     if paraphrased[-1] not in string.punctuation:
#         paraphrased += '.'

#     return paraphrased

# def create_unique_article(paraphrased_content):
#     sentences = sent_tokenize(paraphrased_content)
#     num_sentences = len(sentences)
#     num_variations = min(num_sentences // 3, 3)  # Create variations for up to one-third of the sentences
#     sentences_to_vary = set(sample(range(num_sentences), k=num_variations))

#     for i, sentence in enumerate(sentences):
#         if i in sentences_to_vary:
#             paraphrased_sentence = paraphrase_sentence(sentence)
#             sentences[i] = correct_grammar(paraphrased_sentence, sentence)

#     return " ".join(sentences)

# def get_image_url(soup):
#     images = soup.select('img')
#     if images:
#         img_url = images[0].get('src')
#         return img_url
#     return None

# def scrape_and_paraphrase(url):
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

#         # Paraphrase and correct grammar for the content
#         paraphrased_content = ""
#         for p in contents:
#             original_content = p.text.strip()
#             sentences = sent_tokenize(original_content)
#             paraphrased_sentences = []

#             for sentence in sentences:
#                 paraphrased_sentence = paraphrase_sentence(sentence)
#                 paraphrased_sentence = correct_grammar(paraphrased_sentence, sentence)
#                 paraphrased_sentences.append(paraphrased_sentence)

#             paraphrased_content += " ".join(paraphrased_sentences)

#         # Break into paragraphs after every 5th full stop
#         sentences = sent_tokenize(paraphrased_content)
#         paragraphs = []
#         current_paragraph = ""
#         full_stop_count = 0

#         for sentence in sentences:
#             current_paragraph += sentence
#             full_stop_count += sentence.count('.')
#             if full_stop_count >= 5:
#                 paragraphs.append(current_paragraph)
#                 current_paragraph = ""
#                 full_stop_count = 0

#         if current_paragraph:
#             paragraphs.append(current_paragraph)

#         paraphrased_content = "\n\n".join(paragraphs)

#         # Remove unnecessary backticks
#         paraphrased_content = paraphrased_content.replace("``", "")

#         # Get the image URL
#         img_url = get_image_url(soup)

#         return paraphrased_content, img_url

#     except requests.exceptions.RequestException as e:
#         print(f"Error: {e}")
#         return None, None

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
#             paraphrased_content, img_url = scrape_and_paraphrase(url)
#             if paraphrased_content and img_url:
#                 unique_content = create_unique_article(paraphrased_content)
#                 data['articles'][i]['paraphrased_content'] = paraphrased_content
#                 data['articles'][i]['img_url'] = img_url
#                 data['articles'][i]['unique_content'] = unique_content
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
import torch
from transformers import PegasusForConditionalGeneration, PegasusTokenizerFast


def scrape_and_paraphrase(url, model, tokenizer):
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
            return None, None

        # Extract the text from the webpage
        original_content = " ".join(p.text.strip() for p in contents)

        # Paraphrase the content using the Pegasus model
        input_text = "paraphrase: " + original_content
        inputs = tokenizer(input_text, return_tensors="pt", max_length=1024, truncation=True)

        # Generate paraphrased content
        with torch.no_grad():
            output = model.generate(
                input_ids=inputs.input_ids,
                attention_mask=inputs.attention_mask,
                use_cache=True,
                decoder_start_token_id=model.config.pad_token_id,
                max_length=1024,
                num_beams=4,
                early_stopping=True
            )

        paraphrased_content = tokenizer.decode(output[0], skip_special_tokens=True)

        # Get the image URL
        img_url = get_image_url(soup)

        return paraphrased_content, img_url

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None, None

def get_image_url(soup):
    images = soup.select('img')
    if images:
        img_url = images[0].get('src')
        return img_url
    return None

def main():
    model_name = "tuner007/pegasus_paraphrase"
    model = PegasusForConditionalGeneration.from_pretrained(model_name)
    tokenizer = PegasusTokenizerFast.from_pretrained(model_name)

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
            paraphrased_content, img_url = scrape_and_paraphrase(url, model, tokenizer)
            if paraphrased_content and img_url:
                data['articles'][i]['paraphrased_content'] = paraphrased_content
                data['articles'][i]['img_url'] = img_url
                updated_data = True

    # Update the data.json file if any changes were made
    if updated_data:
        with open('data.json', 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4)
        print("Data updated successfully.")
    else:
        print("No changes were made to the data.")

if __name__ == '__main__':
    main()
