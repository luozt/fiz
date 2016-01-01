#!/usr/bin/env node
// vi fiz.js
var Liftoff = require("liftoff");
var argv = require("minimist")(process.argv.slice(2));
var path = require("path");
var fs = require("fs");
var cli = new Liftoff({
  name: "fiz",
  processTitle: "fiz",
  moduleName: "fiz",
  configName: "fis-conf",

  //only js supported
  extensions: {
    ".js": null
  }
});

//同步生成文件夹
function mkdirsSync(dirpath, mode) {
  if (!fs.existsSync(dirpath)) {
    var pathtmp = "";
    dirpath.split(path.sep).forEach(function(dirname) {
      if (pathtmp) {
        pathtmp = path.join(pathtmp, dirname);
      } else {
        pathtmp = dirname;
      }

      if (!fs.existsSync(pathtmp)) {
        if (!fs.mkdirSync(pathtmp, mode)) {
          return false;
        }
      }
    });
  }
  return true;
}

cli.launch({
  cwd: argv.r || argv.root,
  configPath: argv.f || argv.file
}, function(env){
  //捕获命令行
  var command = argv["_"];

  //fiz get项目
  if("get" == command[0]){
    //提供的服务
    var targetHash = {
      "web": {
        name: "web-template",
        url: "https://github.com/luozt/web-template.git"
      }
    };

    //检测是否存在该服务
    var cmd1 = command[1];
    var targetObj = targetHash[cmd1];
    if(!targetObj){
      console.log("Not such \"" + cmd1 + "\" get-target!");
      return false;
    }

    var noDir = !!argv["n"];
    var folder = targetObj.name;
    var childProcess = require("child_process");
    var exec = childProcess.exec;

    console.log("start get [ " + cmd1 + " ]");

    var child = exec("git clone " + targetObj.url, function(err, stdout, stderr){
      if(err){
        console.log("git clone err: " + err);
        return;
      }

      console.log("get [ " + cmd1 + " ] success");

      var child2 = exec("rm -rf " + folder + "/.git", function(err, stdout){
        if (err){
          console.log("rm "+ folder +"/.git error");
          return;
        }

        if (noDir){
          var child3 = exec("cp -rf " + folder + "/* ./", function(err, stdout){
            if(err){
              console.log("cp " + folder + " folder error");
              return;
            }

            var child4 = exec("rm -rf " + folder, function(err, stdout){
              if (err){
                console.log("rm "+ folder +" folder error")
                return;
              }
            });
          });
        }
      });
    });

  }

  //引用fis
  else{
    var fis;
    if(!env.modulePath){
      fis = require("./");
    }else{
      fis = require(env.modulePath);
    }

    fis.set("system.localNPMFolder", path.join(env.cwd, "node_modules/fiz"));
    //fis.set('system.globalNPMFolder', path.dirname(__dirname));
    fis.cli.run(argv, env);
  }

});

