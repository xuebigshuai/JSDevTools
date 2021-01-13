#!/usr/bin/env node

const program = require('commander');
const download = require('download-git-repo');
const inquirer = require('inquirer');
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
          download('https://github.com:xuebigshuai/template.git#master', name, {clone: true},err => {
            console.log(err ? console.log(err) : 'Success')
        })
        })
       });
var argvs =  program.parse(process.argv);
//console.log(argvs);
