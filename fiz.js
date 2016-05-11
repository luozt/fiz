#!/usr/bin/env node
// vi fiz/bin/fiz.js
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

  // 移动文件夹，不支持文件
  if("mvDirContent" == command[0]){
    var childProcess, exec, dest, folder, child, cwd;

    cwd = process.cwd();
    folder = argv["src"];
    dest = argv["to"];

    if(!dest || "string" != typeof dest){
      console.log("dest: "+dest+", operate destination required!");
      return false;
    }

    if(!folder || "string" !== typeof folder){
      folder = cwd;
    }

    childProcess = require("child_process");
    exec = childProcess.exec;

    if(!fs.existsSync(folder)){
      console.log("source: "+folder+", not such a source Foler!");
      return;
    }

    if("/" === folder.slice(-1)){
      folder = folder.slice(0,-1);
    }

    console.log("source folder: "+folder);
    console.log("destination folder: "+dest);

    child = exec("mv -f "+folder+"/** "+dest, function(err, stdout){
      var child2;

      if(err){
        console.log(err);
        console.log("mv "+folder+" folder content error when execing: "+"mv -f "+folder+"/** "+dest);
        return;
      }

      child2 = exec("rm -rf "+folder, function(err, stdout){
        var child3, clearFolder;

        if(err){
          console.log(err);
          console.log("rm "+folder+" folder error");
          return;
        }

        // 检测是否还有要删除的文件夹
        clearFolder = argv["clear"];
        if(clearFolder){
          child3 = exec("rm -rf "+clearFolder, function(err, stdout){
            if(err){
              console.log(err);
              console.log("rm "+clearFolder+" folder error");
              return;
            }
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

