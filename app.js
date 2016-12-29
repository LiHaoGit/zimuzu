// ==UserScript==
// @name         人人字幕链接提取
// @namespace    undefined
// @version      0.0.1
// @description  提取人人字幕组的资源链接
// @author       lihao
// @include        http://www.zimuzu.tv/gresource/list/*

// @require      http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js
// @run-at       document-end
// @grant        unsafeWindow
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';
    console.time('testForEach');

    $('.it').each(function (i,ele){        
        replaceThunder($(ele));
    });
    console.timeEnd('testForEach');

    //替换原来的迅雷链接
    function replaceThunder($ele){        
        let links = [];        
        $ele.parents('.media-list').find('a[thunderrestitle]:visible').each(function (_i,a){
            let _a = $(a);
            links.push(a.attributes[6].value);
            _a.before('<a href="'+a.attributes[6].value+'">迅雷</a>');
            _a.remove();
        });
        let all = $('<a style="color: #fff;" >复制全部迅雷链接</a>').on('click',function (e){
            e.preventDefault(); 
            GM_setClipboard(links.join('\n'), { type: 'text', mimetype: 'text/plain'});            
        });
        $ele.append(all);
    }
})();
