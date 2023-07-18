---
title: Java Web项目搭建并部署Tomcat
date: 2022-04-18 22:28:05
tags:
---

对于刚接触java web的时候，部署tomcat也是一个很常见的问题。

##### 一、首先创建一个java项目，填好项目名称路径，其他什么都不用改直接下一步。

![java web](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-01.77idnqt1j6w0.webp "java web -1")

![java web](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-02.63lsfc3rwfo0.webp "java web -2")

![java web](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-03.3gwkl7yjs760.webp "java web -3")

##### 二、创建完成后，在项目上右键，选择Add Framework support --> java EE 下选择web application，右侧对话框选择版本和创建web.xml文件。

![java web](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-04.9mbb543a5pc.webp "java web -4")

![java web](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-05.3l4az889dgo0.webp "java web -5")

##### 三、完成之后，项目结构也会随之变化。

![java web](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-07.6js7cmz45p40.webp "java web -7")

##### 四、我们需要在WEB-INF下创建classes，lib两个文件夹。

![图片alt](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-08.4yb2xrom6a40.webp "java web -8")

##### 五、编辑项目结构，按步骤选择填写编译文件输出位置，即WEB-INF下的classes文件夹。

![图片alt](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-09.4lefh8ynv940.webp "java web -9")

##### 六、添加项目依赖的jar包，jar包放在WEB-INF/lib下。

![图片alt](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-10.10g8uuyoca8w.webp "java web -10")

![图片alt](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-11.5v0eyrdc9dw0.webp "java web -11")

![图片alt](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-12.7crto4sbgck0.webp "java web -12")

![图片alt](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-13.1he4r650xlgg.webp "java web -13")

##### 七、接下来配置tomcat。

![图片alt](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-14.3i43cjxerjs0.webp "java web -14")

##### 八、添加本地tomcat，并配置其他选项。

![图片alt](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-15.2uarly4jjn60.webp "java web -15")

##### 九、配置tomcat基本信息（版本，本地tomcat安装位置，jre等）。

![图片alt](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-16.39i12pmygyy0.webp "java web -16")

##### 十、部署项目。

![图片alt](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-17.7hxffr8mvkg0.webp "java web -17")

![图片alt](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-18.12ytzgm7dp1c.webp "java web -18")

##### 十一、部署后项目发布地址已经自行匹配完成，返回修改tomcat信息剩余信息。

![图片alt](https://cdn.staticaly.com/gh/thornboo/blog-image-bed@master/java-web-creation/javaweb-19.2k93wt2g1j60.webp "java web -19")

##### 十二、最后点击OK就基本上完成创建了。