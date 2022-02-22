const inquirer = require("inquirer");
const { resolve } = require("path");
const fs = require("fs") ;
const { log } = require("../api"); 

const filePath = 'src/pages'

module.exports = async () => {
  console.log("path", resolve("."));
  create()
};

async function create(){
  // 项⽬名称
  const name = await inquirer.prompt([{
    type: 'input',
    message: '设置文件名😎😎😎',
    name: 'name',
  }])
  const desc = resolve(`./${filePath}/${name.name}`);
  log(desc)

  // 判断是否存在该文件，若存在则不提示
  const isFile = fs.existsSync(desc)
  if(isFile){
    deleteFile(desc)
    return
  }else{
    await require(`./routes`)(name.name);
    createFile(desc)
    return
  }
}

async function createFile(desc){
  try{
    // 新建文件夹
    fs.mkdirSync(desc)

    const fileModule = resolve(__dirname, '../../module')
    const files = fs.readdirSync(fileModule).filter((v) => ![".git"].includes(v));

    // 遍历所需要的文件，执行复制
    files.map(async (item) => {
      const fromFileName = resolve(__dirname, `../../module/${item}`);
      const toFileName = resolve(__dirname, `${desc}/${item}`);
      fs.copyFile(fromFileName, toFileName, 0, () => {})
    })

  } catch {
    log('创建失败', 'red')
  }
}

async function deleteFile(desc){
  log(desc)
  try{
    // 是否选择删除后重新建立
    const answer = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: '当前文件已有此文件，是否选择删除后重新建立？',
      default: false
    }])
    console.log("answer", answer);
    if(answer.confirm){
       // 删除模块，需要先删除文件，在删除目录
      const files = fs.readdirSync(desc)
      files.map((item) => {
        fs.unlinkSync(`${desc}/${item}`)
      })
      fs.rmdirSync(desc)
      await require(`./routes`)(answer.name);
      createFile(desc)
    }else{
      create()
    }
  } catch {
    log('发生错误', 'red')
  }
}
