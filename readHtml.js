import fs from "fs";
import cheerio from "cheerio";
import https from "https";
import getText from "./getText.js";


// 三个参数  路径  编码格式 回调函数
https.get('https://www.xbiquge.la/9/9419/',{
    headers:{}
}, (res) => {
    // res.setEncoding('utf-8');
    console.log(res)
    let html = ''
    res.on('data', data => html += data)
    res.on('end', () => {
        console.log(html)

        // fs.writeFile('t', html, err => console.log(err))
        const $ = cheerio.load(html)
        // const bookArray = []
        const title = $('#maininfo h1').text(),
            user = $('#info p').text(), //作者
            intro = $('#intro p').text(); //简介
        console.log(title)
        $('#list dd').each((index, element) => {
            if (index >= 1) {
                return false; //break,当小说章节达到5章则退出循环
            }
            const el = $(element)
            let chapter = el.find('a').text(), //章节名
                chapterHref = el.find('dd a').attr('href') // 章节链接
            // bookArray.push({name: chapter, href: chapterHref})
            getText(chapterHref, chapter, title)
        })
    })
})

