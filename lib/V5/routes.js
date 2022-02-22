const inquirer = require("inquirer");
const { resolve } = require("path");
const fs = require("fs") ;
const { log } = require("../api"); 

const filePath = 'config/routesChildren.ts'


module.exports = async (name) => {
  console.log("path", resolve("."));
  create(name)
};

async function create(nameFile){
  const desc = resolve(`./${filePath}`);
  const isFile = fs.existsSync(desc)
  const toFileName = resolve(__dirname, desc);

  // 写
  const start = `export default`

  if(isFile){
    fs.readFile(toFileName, 'utf8', async (err, data) => {
      try{
        const arr = JSON.parse(data.substring(14, data.length).trim())
        const routerArr = await routerConfig(nameFile)
        const res = [...arr, ...routerArr]

        fs.writeFile(toFileName, `${start} ${JSON.stringify(res)}`, (err) => {
          log('🚗🚗🚗路由创建成功')
        })
         
      }catch{
        log('文本格式不对，请查看格式')
      }
    })
  }else{
    const routerArr = await routerConfig(nameFile)
    // 如果没有
    fs.writeFile(toFileName, `${start} ${JSON.stringify(routerArr)}`, (err) => {
      log('🚗🚗🚗路由创建成功')
    })
  }
}

async function routerConfig(nameFile){
  const name = await inquirer.prompt([{
    type: 'input',
    message: '请设置路由名称',
    name: 'name',
  }])
  console.log("answer", name.name);
  const icon = await inquirer.prompt([{
    type: 'input',
    message: '请设置icon名称',
    name: 'name',
    default: 'FireOutlined'
  }])
  console.log("answer", icon.name);

  return [
    {
      path: `/${nameFile}`,
      name: name.name,
      icon: icon.name,
      component: `./${nameFile}`,
    }
  ]
}
