#!/usr/bin/env node
//https://github.com/lin-xin/blog/issues/27
// https://my.oschina.net/u/4312704/blog/3681968
//可以自动的解析命令和参数，用于处理用户输入的命令
const program = require('commander');
//下载并提取 git 仓库，用于下载项目模板
const download = require('download-git-repo');
//通用的命令行用户界面集合，用于和用户进行交互
const inquirer = require('inquirer');
const fs = require('fs');
// 模板引擎，将用户提交的信息动态填充到文件中
const handlebars = require('handlebars');
//视觉美化
const ora = require('ora');
// 在信息前面加上 √ 或 × 等的图标
const symbols = require('log-symbols');
// chalk 来为打印信息加上样式
const chalk = require('chalk');
program.version('1.0.0', '-v', '--version')
       .command('init <name>')
       .action((name) => {
        inquirer.prompt([
          {
            type: 'input',
            name: 'author',
            message: '请输入作者名称'
          },
          {
            name: 'description',
            message:'请输入项目描述'
          }
        ]).then((answers) => {
          const spinner = ora('正在下载模板....');
          spinner.start();
          download('https://github.com:xuebigshuai/template#main', name, {clone: true},err => {
          if(err) {
            spinner.fail();
            console.log(symbols.error,chalk.red(err))
          } else {
            const fileName = `${name}/package.json`;
            const meta = {
              name,
              description: answers.description,
              author: answers.author
            } 
            if(fs.existsSync(fileName)) {
              const content = fs.readFileSync(fileName).toString();
              const result = handlebars.compile(content)(meta);
              fs.writeFileSync(fileName, result);
            }
            console.log(symbols.success, chalk.green('项目初始化完成')); 
            spinner.succeed('下载完成');
          }
          
          
        })
        })
       });
var argvs =  program.parse(process.argv);
//console.log(argvs);
