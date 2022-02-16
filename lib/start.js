const inquirer = require("inquirer");
const { resolve } = require("path");
const fs = require("fs") ;
const { spawn, log } = require("./api"); 

const opt = {
  "当前目录": "list",
  "当前文件夹": "file",
  "自定义文件夹": "set",
  "退出": "quit",
};

module.exports = async () => {
  const answer = await inquirer.prompt([{
    type: "rawlist",
    message: "请选择目录😎😎😎",
    name: "operation",
    choices: Object.keys(opt),
  }]);
  console.log("answer", answer);
  if(answer.operation === "退出") return;
  if(answer.operation === "当前目录"){
    toolInstall(`./`)
    return
  }
  if(answer.operation === "当前文件夹"){
    toolList()
    return
  }
  if(answer.operation === "自定义文件夹"){
    const name = await inquirer.prompt([{
      type: 'input',
      message: '请输入要进入的文件😎😎😎',
      name: 'name',
      default: "project" 
    }])
    toolInstall(name.name.trim())
    return
  }
};
async function toolList(){
  const name = await inquirer.prompt([{
    type: 'input',
    message: '请输入要进入的文件😎😎😎',
    name: 'name',
    default: "project" 
  }])
  const desc = resolve(`./${name.name}`);
  const isFile = fs.existsSync(desc)
  if(isFile){
    toolInstall(desc)
  }else{
    log('没有此文件件，请重新输入')
    toolList()
  }
}

async function toolInstall(desc){ 
  log('请确保程序以安装依赖，开始启动😎😎😎')
  console.log("desc", desc);
  await spawn("yarn", ['run', 'start'], { cwd: desc})
}
