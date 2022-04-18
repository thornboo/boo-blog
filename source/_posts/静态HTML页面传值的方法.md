---
title: 静态HTML页面传值的方法
date: 2022-04-17 11:47:47
tags: web前端
---

#### 1、通过url传值

示例如下：

这是A页面：

```
<head>
    <meta charset="UTF-8">
    <title>A page</title>
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
    <script>
        $(document).ready(function () {
            // 拼接跳转url中要传输的数据
            var dataList = [];
            var dataStr;
            dataList.push('name');//name、password为要传递的参数
            dataList.push('password');
            dataStr = window.JSON.stringify(dataList);

            $('#aPage').on('click', function () {
                console.log(dataStr)
                $('#aPage').attr("href", "b.html?data=" + dataStr);
            })
        });
    </script>
</head>
<body>
<a href="b.html" id="aPage">在url里带数据跳转到b页面</a>
</body>
```

注意：JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。

这是B页面：

```
<head>
    <meta charset="UTF-8">
    <title>B page</title>
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
    <script>
        $(document).ready(function () {
            //使用正则表达式获取url中的参数
            function getUrlParam(name) {
                //构造一个含有目标参数的正则表达式对象
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                //匹配目标参数，window.location.search获取页面url
                var r = window.location.search.substr(1).match(reg);
                //返回参数值
                if (r != null) {
                    return unescape(r[2]);
                }
                alert("出错了！");
            }

            var urlData = getUrlParam('data');
            // 将数据填充到input框里面
            $('#getUrlData').val(urlData);
        });
    </script>
</head>
<body>
<input type="text" id="getUrlData">
</body>
```

*注意：*

1. window.location.search.substr(1).match(reg);  
2. location是包含了相关的url的信息，它是windown的一部分。  
3. search是一个可以查询的属性，可以查询？之后的部分。
4. substr(1)是为了去掉第一个？
5. match()是你要匹配的部分 后面可以是正则表达式。
6. return unescpe（r[2]） 返回的值 一个数组。  
7. 这里是开始匹配，找到了返回对应url值，没找到返回null。  

此方法不足之处： 

* URL传递参数长度受限，最大为2K。 
* URL只能传递字符型参数，不能传递中文。 
* 容易导致信息泄露，重要信息需要加密后才能传递。  

#### 2、通过浏览器cookie传值

#### 3、通过form表单传值
