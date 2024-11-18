import requests
from bs4 import BeautifulSoup
import json
import html
import time
import re
from urllib.parse import urlparse
from datetime import datetime
import subprocess
import uuid
import numpy as np
import pandas as pd
times_request = 400
def getProjectsOfHackathon(url):
  try:
    global times_request

    # Khởi tạo URL trang đầu tiên và danh sách để lưu tên project
    base_url = url+'project-gallery?page='
    projects = []

    # Khởi tạo biến để duyệt các trang
    page = 1
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3' }
    while True:
      # Lấy nội dung trang hiện tại
      url = base_url + str(page)
      if times_request <= 0:
        print("sleepppppppingggggg")
        time.sleep(200)
        times_request = 400


      response = requests.get(url, headers=headers)
      times_request = times_request-1
      soup = BeautifulSoup(response.content, 'html.parser')

      # Tìm tất cả thẻ <a> có class là 'link-to-software'
      a_tags = soup.find_all('a', class_='link-to-software')

      # Nếu có thẻ <a> thỏa mãn, trích xuất phần cuối của href và thêm vào mảng projects
      if a_tags:
        for tag in a_tags:
          href = tag.get('href')
          if href:
            project_name = href.split('/')[-1]
            projects.append(project_name)
      else:
        print(f"Không tìm thấy thẻ <a> nào có class 'link-to-software' trên trang {page}")

      # Kiểm tra thẻ phân trang
      pagination_info = soup.find('div', class_='pagination-info')
      if pagination_info:
        next_page = pagination_info.find('a', rel='next')

        # Nếu có thẻ <a> rel='next' chuyển sang trang tiếp theo
        if next_page:
            page += 1
        else:
            break  # Dừng nếu không có trang tiếp theo
      else:
        print("Không tìm thấy phần tử phân trang, kết thúc.")
        break  # Dừng nếu không có thẻ phân trang

    unique_projects = list(set(projects))

    return unique_projects

  except requests.RequestException as e:
    print(f"Error fetching data from {url}: {e}")
    return None
  
def fixurl(url):
  if url[:2] == "//":
    return "https:" + url
  elif url[0] == "/":
    return "https://devpost.com" + url
  else:
    return url

def checkurl(url):
  return re.match(re.compile('^(?:http|ftp)s?://(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\\.)+(?:[A-Z]{2,6}\\.?|[A-Z0-9-]{2,}\\.?)\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})(?::\\d+)?(?:/?|[/?]\\S+)$', re.IGNORECASE), url) is not None

def project(mainreq, name):
  global times_request
  info = {}

  soup = BeautifulSoup(mainreq.text, 'html.parser')

  try:
    gallery = []
    for li in soup.find("div", {"id": "gallery"}).findChildren("li"):
      try:
        url = fixurl(li.find("a")['href'])
        caption = li.p.i.text.lstrip().rstrip()
        gallery.append({"url": url, "caption": caption})
      except:
        url = fixurl(li.findChildren("iframe")[0]['src'])
        try:
          caption = li.p.i.text.lstrip().rstrip()
        except:
          caption = None
        gallery.append({"url": url, "caption": caption})
    info['gallery'] = gallery
  except:
    info['gallery'] = []
  content = ""
  for div in soup.findAll("div", class_=None):
    if len(dict(div.attrs).keys()) == 0:
      multipart_form_data = {
        'forceInNewWindow': (None, 'true'),
        'htmlString': (None, str(div)),
        'encoding': (None, "UTF-8"),
        'indentation': (None, "TABS")
      }
      if times_request <= 0:
        print("sleepppppppingggggg")
        time.sleep(200)
        times_request = 400

      response = requests.post('https://www.freeformatter.com/html-formatter.html', files=multipart_form_data)
      times_request = times_request-1
      content = response.text
      break
  info['content'] = content.translate(dict([(ord(x), ord(y)) for x, y in zip(u"‘’´“”–-", u"'''\"\"--")])) if content else pd.NA

  try:
    built_with = []
    for li in soup.find("div", {"id": "built-with"}).findChildren("li"):
      built_with.append(li.text.lstrip().rstrip())
    info['built_with'] = built_with
  except:
    info['built_with'] = []

  try:
    app_links = []
    for link in soup.find("nav", {"class": "app-links"}).findChildren("a"):
      app_links.append(link['href'])
    info['app_links'] = app_links
  except:
    info['app_links'] = []

  try:
    submitted_to = []
    for hackathon in soup.findAll("div", class_="software-list-content"):
      submitted_to.append(hackathon.text.lstrip().rstrip().split("\n")[0])
    info['submitted_to'] = submitted_to
  except:
    info['submitted_to'] = []

  created_by = []
  for hackathon in soup.findAll("li", class_="software-team-member"):
    created_by.append(hackathon.findChildren("img")[0]['title'])
  info['created_by'] = created_by

  try:
    submitted_to_url = []
    for hackathon in soup.findAll("div", class_="software-list-content"):
      submitted_to_url.append(hackathon.find('a')['href'])
    info['submitted_to_url'] = submitted_to_url
  except:
    info['submitted_to_url'] = []

  created_by_username = []
  for hackathon in soup.findAll("li", class_="software-team-member"):
    a_tags = hackathon.findChildren("a")
    if a_tags:
        created_by_username.append(a_tags[0]['href'].split('/')[-1])
  info['created_by_username'] = created_by_username

  ids = []
  temphtml = []
  mastercomments = []
  users = []
  times = []
  for art in soup.findAll("article"):
    if "data-commentable-id" in dict(art.attrs).keys():
      templist = []
      ids.append(art['data-commentable-id'])
      for text in art.findChildren("p"):
        if len(dict(text.attrs).keys()) == 0:
          templist.append(str(text))
      temphtml.append("\n".join(templist))
      try:
        users.append(art.find("a").attrs['href'].replace("https://devpost.com/", ""))
      except:
        users.append("Private user")
      times.append(datetime.strptime(art.time.attrs['datetime'].replace(art.time.attrs['datetime'].split(":")[-2:][0][2:] + ":" + art.time.attrs['datetime'].split(":")[-2:][1], art.time.attrs['datetime'].split(":")[-2:][0][2:] + art.time.attrs['datetime'].split(":")[-2:][1]), '%Y-%m-%dT%H:%M:%S%z').strftime("%Y-%m-%dT%H:%M:%S") + ".000Z")
  for mainid in ids:
    comments = []
    if times_request <= 0:
        print("sleepppppppingggggg")
        time.sleep(200)
        times_request = 400

    maindict = requests.get("https://devpost.com/software_updates/" + mainid + "/comments", headers={'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'}).json()
    times_request = times_request-1
    for page in range(int(maindict['meta']['pagination']['total_pages'])):
      pagenum = page+1
      if times_request <= 0:
        print("sleepppppppingggggg")
        time.sleep(200)
        times_request = 400
      commentdict = requests.get("https://devpost.com/software_updates/" + mainid + "/comments?page=" + str(pagenum), headers={'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'}).json()
      times_request = times_request-1
      for comment in commentdict['comments']:
        tempcomment = {}
        tempcomment['user'] = comment['user']['screen_name']
        tempcomment['comment'] = comment['html_body']
        temptime = datetime.strptime(comment['created_at'].replace(comment['created_at'].split(":")[-2:][0][2:] + ":" + comment['created_at'].split(":")[-2:][1], comment['created_at'].split(":")[-2:][0][2:] + comment['created_at'].split(":")[-2:][1]), '%Y-%m-%dT%H:%M:%S%z')
        # print(comment['created_at'].replace(comment['created_at'].split(":")[-2:][0][2:] + ":" + comment['created_at'].split(":")[-2:][1], comment['created_at'].split(":")[-2:][0][2:] + comment['created_at'].split(":")[-2:][1]))
        tempcomment['created_at'] = temptime.strftime("%Y-%m-%dT%H:%M:%S") + ".000Z"
        comments.append(tempcomment)
        # ?page=
    mastercomments.append(list(reversed(comments)))
  final = []
  for created_at, user, html, comments in zip(times, users, temphtml, mastercomments):
    final.append({"user": user, "update": html, "created_at": created_at, "comments": comments})
  info['updates'] = final
  if times_request <= 0:
    print("sleepppppppingggggg")
    time.sleep(200)
    times_request = 400

  soup2 = BeautifulSoup(requests.get("https://devpost.com/software/" + name + "/likes?page=1", headers={'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'}).text, 'html.parser')
  times_request = times_request-1
  pages = []
  for li in soup2.findAll("li"):
    if len(dict(li.attrs).keys()) == 0:
      try:
        pages.append(int(li.string))
      except:
        pass
  pagenum = pages[-1] if len(pages) != 0 else 1
  liked_by = []
  for page in range(pagenum):
    for a in BeautifulSoup(requests.get("https://devpost.com/software/" + name + "/likes?page=" + str(page+1)).text).findAll("a", class_="user-profile-link"):
      liked_by.append(a['href'].replace("https://devpost.com/", ""))
  if len(liked_by) != 0:
    for x in range(pagenum - len(liked_by)):
      liked_by.append("Private user")
  info['liked_by'] = liked_by

  info['likes'] = len(liked_by)

  return info


def get_data(url):
  try:
    global times_request
    projects = getProjectsOfHackathon(url = url)
    print(projects)
    view_by = []
    like_by = []
    join_by = []
    df_projects = pd.DataFrame(columns=["project_name","gallery", "content", "built_with", "app_links", "submitted_to", "created_by","updates","liked_by",'likes', 'submitted_to_url', 'created_by_username'])
    for proj in projects:
      if times_request <= 0:
        print("sleepppppppingggggg")
        time.sleep(200)
        times_request = 400
      mainreq = requests.get('https://devpost.com/software/' + proj, headers={'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'})
      times_request = times_request-1
      if mainreq.status_code != 404:
        pass
      info = project(mainreq, proj)
      view_by.extend(info['liked_by'])

      # Add 'created_by' to 'join_by'
      join_by.extend(info['created_by'])
      for update in info['updates']:
        if 'comments' in update:
          like_by.extend(comment['user'] for comment in update['comments'])
      info['project_name'] = proj
      df_projects.loc[len(df_projects)] = info

    return {
      'projects': projects,
      'view_by': view_by,
      'like_by': like_by,
      'join_by': join_by,
      'df_projects': df_projects,
    }
  except requests.RequestException as e:
    print(f"Error fetching data from {url}: {e}")
    return None