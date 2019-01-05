
# coding: utf-8

# In[16]:


from selenium import webdriver


# In[17]:


browser = webdriver.Firefox()


# In[18]:


browser.get('http://14.139.108.229/W27/login.aspx?ReturnUrl=%2fw27%2fMyInfo%2fw27MyInfo.aspx') 


# In[19]:


elem = browser.find_element_by_css_selector('#txtUserName')


# In[20]:


elem.send_keys('17158')


# In[21]:


elemp = browser.find_element_by_css_selector('#Password1')


# In[22]:


elemp.send_keys('shailesh') #singh1998


# In[23]:


logb = browser.find_element_by_css_selector('#Submit1')
print(logb)


# In[24]:


logb.click()


# In[25]:


no_of_book = browser.find_element_by_css_selector('#ctl00_ContentPlaceHolder1_CtlMyLoans1_lblItems')
no_of_books = int(no_of_book.text)
print(no_of_books)


# In[26]:


due_date = []
for i in range(no_of_books):
    due_date.append(browser.find_element_by_css_selector('#ctl00_ContentPlaceHolder1_CtlMyLoans1_grdLoans > tbody:nth-child(1) > tr:nth-child('+str(i+2)+') > td:nth-child(5)').text)
reissue_btn = []
for i in range(no_of_books):
    reissue_btn.append(browser.find_element_by_css_selector('#ctl00_ContentPlaceHolder1_CtlMyLoans1_grdLoans_ctl0'+str(i+2)+'_Button1'))


# In[27]:


import datetime
today = datetime.date.today()
months = {"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}


# In[28]:


if no_of_books is not 0:
    for i in range(no_of_books):
        print(i)
        #for 1st
        d = due_date[i].split('-')
        if int(d[2]) == today.year:
            print("day")
            if months[d[1]] == today.month:
                print("mon")
                print(d[0] , today.day)
                if int(d[0]) == today.day:
                    reissue_btn[i].click()


# In[29]:


browser.close()

