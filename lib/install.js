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
    message: '请输入要进入的文件',
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
  console.log("desc", desc);
  log('🚴🏻🚴🏻🚴🏻安装依赖中，请稍等....')
  await spawn("yarn", ['install'], { cwd: desc})
  log('🚴🏻🚴🏻🚴🏻安装完成')
  const confirm = await inquirer.prompt([{
    type: 'confirm',
    message: '是否运行',
    name: 'confirm',
    default: "Y" 
  }])
  if(confirm.confirm){
    console.log('🚀🚀🚀项目启动中...') 
    await spawn("yarn", ['run', 'start'], { cwd: desc})
    return
  }else{
    console.log('使用愉快😎😎😎') 
  }
}
