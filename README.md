
## Task 1

I was not able to proceed beyond this point because all accounts given could not be used due to 
needing password resets. In order to still display my ability in RPA, i decided to find similar
website that requires similar types of operations like the original one above, namely the
website requires automating the following user interactions:
  1) launching browser and navigating to a website URL
  2) logging in to an online account
  3) entering search keywords inside search textbox
  4) clicking links and buttons
  5) downloading a PDf file

The website chosen is the website for [Lenovo Support](https://pcsupport.lenovo.com/my/ko) where 
Task1b is in English and Task1c is in Korean. In addition to the user operations above, this website 
also requires solving a captcha. However, in the short time that i had, i could not find a way to 
automate the action. There is a way (or perhaps ways) to do it but it is using a paid service. So i 
decided to prompt the user to solve it manually for the purpose of this demo.

So, for Task 1, my final solution is **Task1c**.

## Task 2

Task 2 was straightforward and i had no issue completing it. **Task2** is my final solution.

## Task 3

Task 3 was a bit tricky. First, i attempted to do it like what was suggested in the Performance
Assessment guide i.e. extract the text content from PDF file, translate them and finally overlapping
the original content in place (i believe that is what was meant in the guide). I searched for a
good library that could extract text content from a PDF file but i could not find one which was
reliable and accurate. I'm confident if i had more time, i would be able to find one but for the
purpose of this demo, i had decided to try an alternative approach and that is to find free online PDF
file translator and automate it to do exactly that.

I tried with 2 websites.  One is [DocTranslator](https://www.onlinedoctranslator.com/en/) (Task3b) and the 
other one [Google Translate](https://translate.google.com/) (Task3c). As DocTranslator still uses Google 
Translate behind the scene, it is slower than using Google Translate directly.

So, for Task 3, my final solution is **Task3c**. Task3a is my latest attempt at using an NPM module to extract
raw text content from PDF, but it did not work too well.
