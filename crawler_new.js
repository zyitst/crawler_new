var http = require('http')
var url = 'http://www.zgycwx.com/forum-105-'
var cheerio = require('cheerio')

var linksData = new Set()//用来保存链接的集合

function filterLinks(html){//抽取URL函数
	var $ = cheerio.load(html)
	var links = $('tbody')

	links.each(function(item){
		var link = $(this).find('.xst').attr('href')//每个链接的class属性为"xst"，使用该信息获取URL信息
		if(link != undefined){
			var key = link.split('-')[1]
			linksData.add(link)
		}		
	})
}

function printLinks(links){
	console.log(links)
}

function crawl_a_page(url){//爬取一个链接
	http.get(url, function(res){
		var html = ''
		res.on('data', function(data){
			html += data//获得该链接文档的所有内容
		})

		res.on('end', function(){
			// console.log(html)
			filterLinks(html)//从HTML文档中抽取URL
			//printLinks(linksData)//打印提取到的URL
		})
	}).on('error', function(){
		console.log('error!')
	})
}
for(i=1;i<=15;i++){//爬取15个网页，获得所有谜语URL链接
	var url1 = url + i + '.html'
	console.log(url1)
	crawl_a_page(url1)//爬取一个链接
}

//打印所有子链接
// setTimeout(function(){
// 	console.log('this is the end!')
// 	printLinks(linksData)
// }, 10000)
setTimeout(function(){
	var count = 0
	linksData.forEach(function(item){
		console.log(item)
		count++
	})
	console.log("count = " + count)
}, 50000)
