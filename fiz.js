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

  //引用fis
  var fis;
  if(!env.modulePath){
    fis = require("./");
  }else{
    fis = require(env.modulePath);
  }

  fis.set("system.localNPMFolder", path.join(env.cwd, "node_modules/fiz"));
  fis.cli.run(argv, env);

});

