import os
import math
import pypandoc
from datetime import datetime
from yaml import safe_load_all, YAMLError

DIST_DIR = 'dist2'


class Summary:
    def __init__(self, title, url, synopsis, created, minutes_to_read):
        self.title = title
        self.url = url
        self.synopsis = synopsis
        self.created = datetime.strptime(created, '%m/%d/%Y').date()
        self.minutes_to_read = minutes_to_read

    def __str__(self):
        return_str = ':::summary\n'
        return_str += f'## [{self.title}]({self.url})\n'
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
    return Summary(doc['title'], url, doc['synopsis'], doc['created'], minutes_to_read)


def create_summaries(path):
    summaries = []
    for file in os.listdir(path):
        if file.endswith(".md"):
            with open(path + file) as stream:
                try:
                    content = stream.read()
                    summary = safe_load_all(content)
                    summaries.append(create_summary(
                        next(summary), path + file, reading_time_in_minutes(content)))
                except YAMLError as exc:
                    print(exc)
    return Summaries(sorted(summaries, key=lambda summary: summary.created, reverse=True))


def create_index(content_path, output_file, title):
    # Create the dist2 directory if it doesn't exist
    if not os.path.exists(f'./{DIST_DIR}/{os.path.dirname(output_file)}'):
        os.makedirs(f'./{DIST_DIR}/{os.path.dirname(output_file)}')

    # Generate the summaries
    summaries = create_summaries(content_path)
    html_content = pypandoc.convert_text(
        str(summaries),
        to="html5",
        format="md",
        extra_args=['--template=./template.html', '--metadata', f'title=${title}']
    )

    # Write the index.html file
    print(f' Creating ./{DIST_DIR}/{output_file}')
    with open(f'./{DIST_DIR}/{output_file}', 'w') as f:
        f.write(html_content)

print("Creating indexes...")
create_index('./content/articles/', 'index.html', "Home")
create_index('./content/articles/', 'articles/index.html', "Articles")
create_index('./content/presentations/', 'presentations/index.html', "Presentations")
create_index('./content/projects/', 'projects/index.html', "Projects")

