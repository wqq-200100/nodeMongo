import https from "https";
import cheerio from "cheerio";
import fs from "fs";

export default async function getText(txtUrl, name,title) {
    https.get(`https://www.xbiquge.la${txtUrl}`, (res => {
        let html = ''
        res.on('data', (d)=>{
            html += d
        })
        res.on('end', ()=>{
            const $ = cheerio.load(html)
            // 使用小说url作为文件名 通过\\分割 再取最后一位作为文件名
            let txt = $('#content').text()
            // fs.stat检测文件夹是否存在，不存在则报错，然后创建这个文件夹
            fs.stat(title, err=>{
                if (err) fs.mkdir(title, err1 => {
                    console.log('创建文件夹异常', err1)
                })
            })
            fs.writeFile(`./${title}/${name}.txt`, txt, {
                encoding: "utf8",
            }, err=>{
                if (err) console.log(err)
            })
        })
    }))
}
