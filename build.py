import os
import shutil
import math
import pypandoc
from datetime import datetime
from yaml import safe_load_all, YAMLError

DIST_DIR = 'dist'


class Summary:
    def __init__(self, title, url, image, synopsis, created, minutes_to_read):
        self.title = title
        self.url = url
        self.image = image
        self.synopsis = synopsis
        self.created = datetime.strptime(created, '%m/%d/%Y').date()
        self.minutes_to_read = minutes_to_read

    def __str__(self):
        return_str = ':::summary\n'
        return_str += f'## [{self.title}]({self.url})\n'
        if (self.image):
            return_str += f'::: summary-image\n[![]({self.image})]({self.url})\n:::\n'
        return_str += f'{self.synopsis}\n'
        return_str += f'\n### {self.created.strftime("%-d %b, %Y")} · {self.minutes_to_read} min read\n'
        return_str += ':::\n'
        return return_str


class Summaries(list):
    def __str__(self):
        return '\n'.join([str(summary) for summary in self])


def word_count(text):
    words = text.split()
    return len(words)


def reading_time_in_minutes(text, words_per_minute=200):
    num_words = word_count(text)
    reading_time = num_words / words_per_minute
    return math.ceil(reading_time)


def create_summary(doc, url, minutes_to_read):
    url = url.replace('./content/', '/')
    url = url.replace('.md', '')
    image = doc['image'] if 'image' in doc else None
    return Summary(doc['title'], url, image, doc['synopsis'], doc['created'], minutes_to_read)


def create_article(content, content_path, filename):
    parent = content_path.replace('./content/', '').replace('/', '')
    basename = filename.replace('.md', '')
    html_content = pypandoc.convert_text(
        content,
        to="html5",
        format="md",
        extra_args=['--template=./template.html',
                    '--metadata', f'article=true',
                    '--metadata', f'parent={parent}']
    )
    # Write the article file
    print(f'Creating article: ./{DIST_DIR}/{parent}/{basename}/index.html')
    if not os.path.exists(f'./{DIST_DIR}/{parent}/{basename}'):
        os.makedirs(f'./{DIST_DIR}/{parent}/{basename}')
    with open(f'./{DIST_DIR}/{parent}/{basename}/index.html', 'w') as f:
        f.write(html_content)


def create_dir(content_path, output_file, title):
    # Create the directory if it doesn't exist
    if not os.path.exists(f'./{DIST_DIR}/{os.path.dirname(output_file)}'):
        os.makedirs(f'./{DIST_DIR}/{os.path.dirname(output_file)}')

    summaries = []
    for file in os.listdir(content_path):
        if file.endswith(".md"):
            with open(content_path + file) as stream:
                try:
                    content = stream.read()
                    summary = safe_load_all(content)

                    # Create the article
                    create_article(content, content_path, file)

                    # Create the summary
                    summaries.append(create_summary(
                        next(summary), content_path + file, reading_time_in_minutes(content)))
                except YAMLError as exc:
                    print(exc)

    # Generate the index file from the summaries
    sorted_summaries = sorted(
        summaries, key=lambda summary: summary.created, reverse=True)
    html_content = pypandoc.convert_text(
        str(Summaries(sorted_summaries)),
        to="html5",
        format="md",
        extra_args=['--template=./template.html',
                    '--metadata', f'title=${title}']
    )

    # Write the index file
    print(f'Creating index: ./{DIST_DIR}/{output_file}')
    with open(f'./{DIST_DIR}/{output_file}', 'w') as f:
        f.write(html_content)


# Remove the dist2 directory if it exists
if os.path.exists(f'./{DIST_DIR}'):
    print('Removing dist directory...')
    shutil.rmtree(f'./{DIST_DIR}')

create_dir('./content/articles/', 'index.html', "Home")
create_dir('./content/articles/', 'articles/index.html', "Articles")
create_dir('./content/presentations/',
           'presentations/index.html', "Presentations")
create_dir('./content/projects/', 'projects/index.html', "Projects")

print ('Creating About.md')
create_article(open('./content/about.md').read(), './content/', 'about.md')

print ('Copying CSS')
shutil.copy('./main.css', f'./{DIST_DIR}/main.css')

print ('Copying images')
shutil.copytree('./content/images', f'./{DIST_DIR}/images')
