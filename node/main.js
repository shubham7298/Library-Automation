const puppeteer = require('puppeteer');
const CREDS = require('./creds');


const loggedCheck = async (page) => {
    try {
        await page.waitForSelector('#bluebarRoot', { timeout: 10000 });
        return true;
    } catch(err) {
        return false;
    }
};


(async () => {
  
const browser = await puppeteer.launch({
  headless: false
});

let isLogged = false;

 const page = await browser.newPage();
await page.goto('http://14.139.108.229/W27/login.aspx?ReturnUrl=%2fw27%2fMyInfo%2fw27MyInfo.aspx');

const USERNAME_SELECTOR = '#txtUserName';   
const PASSWORD_SELECTOR = '#Password1';
const BUTTON_SELECTOR = '#Submit1';


await page.click(USERNAME_SELECTOR);
await page.keyboard.type(CREDS.username);

await page.click(PASSWORD_SELECTOR);
await page.keyboard.type(CREDS.password);

await page.click(BUTTON_SELECTOR);
 await page.waitForNavigation();
  //isLogged = await loggedCheck(page);

  
//console.log(' i am here 1');
//await page.goto('http://14.139.108.229/w27/MyInfo/w27MyInfo.aspx');
//console.log(' i am here 2');

await page.screenshot({path: '123lib23.png'});

/*
let ht = await page.evaluate(el => el.innerHTML, await page.$('#lblMsg'))
if(typeof ht === 'undefined')
{
	console.log("hello");
}
else{

console.log("failed error ");
  	await browser.close();

}
 


 

try {
        await page.goto(LOGIN_URL);
        console.log('login url opened\nfilling entries...\nid: '+fbID+'\npass: '+fbPass);
        await page.type('#email', fbID);
        await page.type('#pass', fbPass);
        await page.waitFor(1000);
        console.log('entries filled\nlogging in...');
        await page.click('#loginbutton');
        return true;
    } catch (error) {
        console.log('LOGIN FAILED!');
        throw new Error(error);
    }

*/




let html_content = await page.evaluate(el => el.innerHTML, await page.$('#ctl00_ContentPlaceHolder1_CtlMyLoans1_lblItems'))

///
/*
const LENGTH_SELECTOR_CLASS = 'user-list-item';

let listLength = await page.evaluate((sel) => {
      return document.getElementsByClassName(sel).length;
    }, LENGTH_SELECTOR_CLASS);

*/
//const gl='#ctl00_ContentPlaceHolder1_CtlMyLoans1_lblItems';

//const text = page.evaluate(() => document.querySelector(gl).textContent);

console.log('NUMBER OF BOOK ISSUED : '+html_content + ' \n\n ');

let yx=Number(html_content);
let ty=2;

//console.log(' BOOK               Issue date                Need for reissue');
for(let i=yx;i>0;i--)
{
  //console.log('output : '+i);



let book = await page.evaluate(el => el.innerHTML, await page.$('#ctl00_ContentPlaceHolder1_CtlMyLoans1_grdLoans_ctl0'+ty+'_lnkTitle'))



let dtdate = await page.evaluate(el => el.innerHTML, await page.$('#ctl00_ContentPlaceHolder1_CtlMyLoans1_grdLoans > tbody > tr:nth-child('+ty+') > td:nth-child(5)'))

let bt = '#ctl00_ContentPlaceHolder1_CtlMyLoans1_grdLoans_ctl0'+ty+'_Button1';

console.log('BOOK :   '+book + '\nISSUE DATE :   '+dtdate);




//#ctl00_ContentPlaceHolder1_CtlMyLoans1_grdLoans > tbody > tr:nth-child(4) > td:nth-child(6)
//#ctl00_ContentPlaceHolder1_CtlMyLoans1_grdLoans_ctl04_Button1

//#ctl00_ContentPlaceHolder1_CtlMyLoans1_grdLoans > tbody > tr:nth-child(4) > td:nth-child(5)


var d = new Date();
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var m= months[d.getMonth()];
var dt=d.getDate();
var yyu=d.getFullYear();

var ddate=' '+dt+'-'+m+'-'+yyu;

//console.log(ddate);
console.log(typeof(dtdate) + dtdate);
console.log(typeof(ddate) + ddate);

if(ddate===dtdate)
{
  console.log('NEED FOR REISSUE :YES'+'\n\n');
  await page.click(bt);
}
else
{
   console.log('NEED FOR REISSUE :NO'+'\n\n');
}


ty++;

}

/*
let list = awa

const element = await page.$(gl);
    const text = await (await element.getProperty('textContent')).jsonValue();



console.log('   ');
console.log(typeof(html_content));
console.log(typeof(book));
console.log(typeof(dtdate));

    */

  //await browser.close();


  await browser.close();
})();


