# -*- coding: utf-8 -*-
"""
Created on Sun Dec  1 14:49:15 2019

@author: Administrator
"""
import urllib
from bs4 import BeautifulSoup
import ssl
import re
import sys
import pandas as pd
import time
from sqlalchemy import create_engine
import config as conf

# kehuan2.sql sql文件是包含抓取数据的创建表和数据的sql
#kehuan2.sql sql 创建表的sql
#列表首页 https://www.piaohua.com/html/kehuan/list_1.html

#web 头信息
webheader = conf.webheader
#数据库信息
db_info = conf.db_info

print(db_info)
#配置连接mysql
engine = create_engine(
            'mysql+mysqlconnector://%(user)s:%(password)s@%(host)s:%(port)s/%(database)s?charset=utf8' % db_info,
            encoding='utf-8'
        )
#列表首页
DataUrl = 'https://www.piaohua.com/html/kehuan/list_1.html'
#爬取网站
Site='https://www.piaohua.com'
MovieList = []
ListInfo = {}
#ssl https请求支持
context = ssl._create_unverified_context()

#获取html页面
def getHtml(url):
    #注意：在urllib 中这种的headers 是需要是字典的
    headers={"User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36 QIHU 360SE"}
    req=urllib.request.Request(url=url,headers=headers)
    res=urllib.request.urlopen(req, context=context)

    #出现有些解码错误的话，加上“ignore”就可以啦
    #print(file.read().decode("utf-8",'ignore'))
    #res = urllib.request.urlopen(url=url, context=context)
    html = res.read().decode('utf-8');
    return html
#获取所有列表
def getHtmlList(html):
    mysoup = BeautifulSoup(html,'html.parser')
    if ('total' in ListInfo) == False:
        pageList = mysoup.find('li',attrs={'class':'total'}).find("span").getText()
        pageArr = re.sub(r'共(\d*)页(\d*)(条)',r'\1-\2',pageList).split('-')
        ListInfo['pagecount'] = int (pageArr[0]);
        ListInfo['total'] = int (pageArr[1]);
    for i in range(ListInfo['pagecount']):
        MovieList.append('https://www.piaohua.com/html/kehuan/list_'+ repr(i+1) +'.html')        
    return MovieList
    
#分析每个列表页面,返回每个列表的下载页面的html列表
def getDownList(url):
    detailList = []
    page = getHtml(url);
    filmList = BeautifulSoup(page,'html.parser')
    liList = filmList.find("ul",attrs={"class":"ul-imgtxt2"}).find_all('li')
    for tag in liList:
        detailList.append(Site + tag.find("h3").find("a")["href"])
    return detailList
      
#获取每个页面的下载地址，返回每个页下载页面的标题和下载链接
def getDownUrl(url):
    downHtml = BeautifulSoup(getHtml(url),'html.parser')
    link = downHtml.find("div",attrs={"class":"m-details"}).find('div',attrs={'class':"bot"})

    if(link!=None):
        link = link.find_all('a')
    tableLink = downHtml.find_all("table", attrs={"align":"center"})
    txt = downHtml.find("div",attrs={"class":"m-details"}).find('div',attrs={'class':"txt"}).getText()
    h1 = downHtml.find("h1").getText()
    linkInfo = {
            'title':"",
            'downLink':[]
            }
    linkInfo['title'] = h1
    if link != None and len(link)>0:
        for tagA in link:
            linkInfo["downLink"].append(tagA.getText().strip())
    elif tableLink != None and len(tableLink)>0:
        for table in tableLink:
            if table.find("a") != None:
                linkInfo["downLink"].append(table.find("a").getText().strip())
    else:
        DList = re.findall(r'(((ftp|http(s?))):\/\/\S*(\.(rm|rmvb|mkv|mp4|avi)))' , txt,re.I | re.M)
        for dl in DList :
            linkInfo["downLink"].append(dl[0].strip().replace(r"(^(\t|\r|\n)*)|((\t|\r|\n)*$)",""))
    return linkInfo
#格式化获得数据，并存储到mysql
#start 开始从第几页抓取
def parseHtmlList(start):    
    page = getHtml(DataUrl);
    listPage = getHtmlList(page)#返回所有大列表页面
    #dList = getDownList(listPage[0])
    for ind, dlt in enumerate(listPage[start-1:]): 
        dList = getDownList(dlt)#获取列表中的下载页面链接列表
        for dl in dList:
            #dLink = []
            tmpData = []
            dLink=(getDownUrl(dl))
            sys.stdout.flush() #刷新缓冲区
            time.sleep(1)#设置隔1秒抓一次，根据情况自己设置，防止抓取过快被屏蔽
            kong = [""]*5
            tmpData.append(dLink["title"])
            for i in dLink["downLink"]:
                tmpData.append(i)
            result = tmpData+kong
            saveData([result[0:6]])            
            print(result)
            print('第'+ repr(1 + ind+start)+"页：",dlt)
        
#存储数据到mysql
def saveData(info):
    #数据
    data = info
    #配置数据库保存字段
    tableColumns = ['name','down0','down1','down2','down3','down4']
    pd.DataFrame(data, columns=tableColumns).to_sql('kehuan3', engine, if_exists='append', chunksize=100,index=False)

#程序开始，从第X页面抓取,遇到失败后，可以修改从指定页面开始继续抓取
parseHtmlList(1)
#getDownList(DataUrl)
#getDownUrl('https://www.piaohua.com/html/kehuan/2008/0722/13140.html')
#page = getHtml(DataUrl);
#listPage = getHtmlList(page)#返回所有大列表页面
#print(len(getDownList(listPage[0])))