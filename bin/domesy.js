#!/usr/bin/env node

const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const inquirer = require("inquirer");
const package = require('../package.json')
const { log } = require("../lib/api"); 

const opt = {
  "Ant-Design-Pro-V5（PC端）": "V5",
  "react-mobile(移动端)": "mobile",
  '安装依赖': 'install',
  "运行程序": 'start',
  "当前版本": 'version',
  "退出": "quit",
};

const question = [
  {
    type: "rawlist" /* 选择框 */,
    message: "请选择要执行的操作？😎😎😎",
    name: "operation",
    choices: Object.keys(opt),
  }
];

clear();

log(
  figlet.textSync("DOMESY !", {
    horizontalLayout: "Isometric1",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  }), 'blue'
)

query();

async function query(){
  const answer = await inquirer.prompt(question);
  console.log("answer", answer);
  if (answer.operation === "退出") return;
  if (answer.operation === "当前版本"){
    log(`当前版本号：${package.version}`)
    return
  }
  await require(`../lib/${opt[answer.operation]}`)();
  return
}