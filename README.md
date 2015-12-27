# FIZ

## summary

FIZ整合了fis3和众多fis3插件，使开发者无需逐一安装多个fis3插件即可投身于开发中。FIZ包括有以下的组件fis3、fis-parser-coffee-react、fis-parser-less、fis-optimizer-htmlmin等，具体可查看package.json。

FIZ集合了众多插件，可用于编译LESS, coffee, jade等预编译语言/模板语言。

## usage

**必须在全局安装FIZ：**`npm i -g fiz`

1、用作替代fis3的命令：`fiz release -w`

2、用以快速初始化开发项目：

* `fiz get web`：快速构建FIZ定制的PC或者mobile开发目录。加参数`-n`则不新建文件夹

## FIZ规范的开发目录

FIZ的开发目录结构：

```
src/           //存放该项目源码
|--js/
|--css/
|--lib/
|--index.html
|
README.md      //说明文档
|
fis-conf.js    //fis配置文件
```
