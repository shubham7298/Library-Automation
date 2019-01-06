
from selenium import webdriver
import json
import os

#if using for first time
if(os.path.isfile('./data.json')==False):
    print("It's your first time....")
    username=input('Enter username(reg. no.):-')
    password=input('Enter password:-')
    data={'username':username,
            'password':password}
    with open('data.json','w') as outfile:
        json.dump(data,outfile)

#opening data file which contains username and password
with open('data.json') as json_file:
    data = json.load(json_file)

browser = webdriver.Firefox()

#opening library login page
browser.get('http://14.139.108.229/W27/login.aspx?ReturnUrl=%2fw27%2fMyInfo%2fw27MyInfo.aspx') 

#selecting and filling username
elem = browser.find_element_by_css_selector('#txtUserName')
elem.send_keys(data['username'])

#selecting and filling password
elemp = browser.find_element_by_css_selector('#Password1')
elemp.send_keys(data['password'])

#entering the page by clicking submit button
logb = browser.find_element_by_css_selector('#Submit1')
#print(logb)
logb.click()

#finding and printing no. of books
no_of_book = browser.find_element_by_css_selector('#ctl00_ContentPlaceHolder1_CtlMyLoans1_lblItems')
no_of_books = int(no_of_book.text)
print("No. of books issued:",no_of_books)

#making list of due dates
due_date = []
for i in range(no_of_books):
    due_date.append(browser.find_element_by_css_selector('#ctl00_ContentPlaceHolder1_CtlMyLoans1_grdLoans > tbody:nth-child(1) > tr:nth-child('+str(i+2)+') > td:nth-child(5)').text)

#making list of reissue buttons which would be clicked later
reissue_btn = []
for i in range(no_of_books):
    reissue_btn.append(browser.find_element_by_css_selector('#ctl00_ContentPlaceHolder1_CtlMyLoans1_grdLoans_ctl0'+str(i+2)+'_Button1'))

#to get today's date
import datetime
today = datetime.date.today()
months = {"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}

#checking if current date is equal to due date; if true then clicking reissue button
if no_of_books is not 0:
    for i in range(no_of_books):
        print("Book no:-",i+1)
        print("Due date is:-")
        d = due_date[i].split('-')
        print(d[0],d[1],d[2])
        if int(d[2]) == today.year:
            if months[d[1]] == today.month:
                if int(d[0]) == today.day:
                    reissue_btn[i].click()

#closig browser/webdriver
browser.close()
