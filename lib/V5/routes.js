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

  // å
  const start = `export default`

  if(isFile){
    fs.readFile(toFileName, 'utf8', async (err, data) => {
      try{
        const arr = JSON.parse(data.substring(14, data.length).trim())
        const routerArr = await routerConfig(nameFile)
        const res = [...arr, ...routerArr]

        fs.writeFile(toFileName, `${start} ${JSON.stringify(res)}`, (err) => {
          log('ðððè·¯ç±åå»ºæå')
        })
         
      }catch{
        log('ææ¬æ ¼å¼ä¸å¯¹ï¼è¯·æ¥çæ ¼å¼')
      }
    })
  }else{
    const routerArr = await routerConfig(nameFile)
    // å¦ææ²¡æ
    fs.writeFile(toFileName, `${start} ${JSON.stringify(routerArr)}`, (err) => {
      log('ðððè·¯ç±åå»ºæå')
    })
  }
}

async function routerConfig(nameFile){
  const name = await inquirer.prompt([{
    type: 'input',
    message: 'è¯·è®¾ç½®è·¯ç±åç§°',
    name: 'name',
  }])
  console.log("answer", name.name);
  const icon = await inquirer.prompt([{
    type: 'input',
    message: 'è¯·è®¾ç½®iconåç§°',
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
