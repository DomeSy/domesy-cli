const { promisify } = require("util");
const download = promisify(require("git-pull-or-clone"));
const ora = require("ora");
const inquirer = require("inquirer");
const { resolve } = require("path");
const fs = require("fs") ;
const { spawn, log } = require("./api"); 

const opt = {
  "安装依赖": "install",
  "运行": "start",
  "退出": "quit",
};

module.exports = async () => {
  const opt = {
    "创建子模块(请确保在V5的当前目录下)": 'create',
    "下载": 'download',
    "退出": "quit",
  }
  const question = [
    {
      type: "rawlist" /* 选择框 */,
      message: "请选择要执行的操作？😎😎😎",
      name: "operation",
      choices: Object.keys(opt),
    }
  ];
  const answer = await inquirer.prompt(question);
  console.log("answer", answer);
  if (answer.operation === "退出") return;
  if (answer.operation === "下载") {
    download()
    return
  };
  await require(`./V5/${opt[answer.operation]}`)();
};

async function downloadFile(){
  console.log("path", resolve("."));
  // 项⽬名称
  const name = await inquirer.prompt([{
    type: 'input',
    message: '设置文件名😎😎😎',
    name: 'name',
    default: "Ant-Design-Pro-V5" // 默认值
  }])
  const repo = 'https://gitee.com/domesy/Ant-Design-Pro.git'
  const desc = resolve(`./${name.name}`);
  console.log("desc", desc);
  const process = ora(` 🚗🚗🚗下载中.....${repo}`);
  process.start();
  try {
    await download(repo, desc);
    process.succeed();

  } catch (e) {
    console.log(e);
    process.fail();
  }
  tool(name, desc)
}

async function tool(name, desc){
  const answer = await inquirer.prompt([{
    type: "rawlist",
    message: "接下来的操作😎😎😎",
    name: "operation",
    choices: Object.keys(opt),
  }]);
  console.log("answer", answer);
  if (answer.operation === "退出") {
    const isFile = fs.existsSync(`${desc}/node_modules`)
    if(isFile){
      log(`
        🚀🚀🚀 初始化完成：快行动吧😎😎😎
        To get Start:
        =============================
          cd ${name.name}
          npm run start
        ===========================
      `)
    }else{
      log(`
        🚀🚀🚀 初始化完成：快行动吧😎😎😎
        To get Start:
        =============================
          cd ${name.name}
          npm install
          npm run start
        ===========================
      `)
    }
    return
  };
  if (answer.operation === "安装依赖"){
    log('🚴🏻🚴🏻🚴🏻安装依赖中，请稍等....')
    await spawn("yarn", ['install'], { cwd: `${name.name}/`})
    log('🚴🏻🚴🏻🚴🏻安装完成')
  };
  if (answer.operation === "运行"){
    const isFile = fs.existsSync(`${desc}/node_modules`)
    if(isFile){
      await spawn("yarn", ['run', 'start'], { cwd: `${name.name}/`})
      return
    }else{
      log('还未安装依赖，请先安装依赖', 'red')
    }
  }
  tool(name, desc)
}