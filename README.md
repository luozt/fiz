# FIZ

## summary

FIZ整合了fis3和众多fis3插件，使开发者无需逐一安装多个fis3插件即可投身于开发中。FIZ包括有以下的组件fis3、fis-parser-coffee-react、fis-parser-less、fis-optimizer-htmlmin等，具体可查看package.json。

FIZ集合了众多插件，可用于编译LESS, coffee, jade等预编译语言/模板语言。

## usage

### 全局安装使用

全局安装使用：`npm i -g fiz`

1、用作替代fis3的命令：`fiz release -w`

2、用以快速初始化开发项目：

* `fiz get web`：快速构建FIZ定制的PC或者mobile开发目录。加参数`-n`则不新建文件夹

### 本地安装使用

本地安装：`npm i fiz --save-dev`

结合package.json的scripts来使用，比如：

```json
{
  //...
  "scripts": {
    "watch": "fiz server start && fiz release -w",
    "build": "fiz release pr",
    "clean": "fiz server stop && fiz server clean",
    "stop": "fiz server stop"
  }
}
```

使用命令：`npm run watch`即可

> 使用npm run的方便之处在于，npm会自动把node_modules/.bin加入$PATH，这样你可以直接运行依赖程序和开发依赖程序，不用全局安装了。只要npm上的包提供命令行接口，你就可以直接使用它们，方便吧？

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

## 其他功能

**mvDirContent: 移动文件夹内容**

满足发布内容后需要对发布文件夹的文件进行移动的需求。

```shell
fiz mvDirContent --src ../lc/src --to ./ --clear ../lc
```

上述命令意思为：把文件夹`../lc/src`中的所有内容移动到当前目录`./`下，并且将`../lc/src`文件夹删除，并且完成后再删除`../lc`文件夹

