---
title: Java Web项目搭建并部署Tomcat
date: 2022-04-18 22:28:05
tags:
---

对于刚接触java web的时候，部署tomcat也是一个很常见的问题。

##### 一、首先创建一个java项目，填好项目名称路径，其他什么都不用改直接下一步。

![java web](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-01.77idnqt1j6w0.webp "java web")

![java web](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-02.63lsfc3rwfo0.webp "java web")

![java web](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-03.3gwkl7yjs760.webp "java web")

##### 二、创建完成后，在项目上右键，选择Add Framework support --> java EE 下选择web application，右侧对话框选择版本和创建web.xml文件。

![java web](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-04.9mbb543a5pc.webp "java web")

![java web](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-05.3l4az889dgo0.webp "java web")

##### 三、完成之后，项目结构也会随之变化。

![java web](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-07.6js7cmz45p40.webp "java web")

##### 四、我们需要在WEB-INF下创建classes，lib两个文件夹。

![图片alt](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-08.4yb2xrom6a40.webp "java web")

##### 五、编辑项目结构，按步骤选择填写编译文件输出位置，即WEB-INF下的classes文件夹。

![图片alt](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-09.4lefh8ynv940.webp "java web")

##### 六、添加项目依赖的jar包，jar包放在WEB-INF/lib下。

![图片alt](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-10.10g8uuyoca8w.webp "java web")

![图片alt](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-11.5v0eyrdc9dw0.webp "java web")

![图片alt](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-12.7crto4sbgck0.webp "java web")

![图片alt](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-13.1he4r650xlgg.webp "java web")

##### 七、接下来配置tomcat。

![图片alt](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-14.3i43cjxerjs0.webp "java web")

##### 八、添加本地tomcat，并配置其他选项。

![图片alt](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-15.2uarly4jjn60.webp "java web")

##### 九、配置tomcat基本信息（版本，本地tomcat安装位置，jre等）。

![图片alt](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-16.39i12pmygyy0.webp "java web")

##### 十、部署项目。

![图片alt](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-17.7hxffr8mvkg0.webp "java web")

![图片alt](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-18.12ytzgm7dp1c.webp "java web")

##### 十一、部署后项目发布地址已经自行匹配完成，返回修改tomcat信息剩余信息。

![图片alt](https://cdn.jsdelivr.net/gh/thornboo/blog-image-bed@master/20220419/javaweb-19.2k93wt2g1j60.webp "java web")

##### 十二、最后点击OK就基本上完成创建了。