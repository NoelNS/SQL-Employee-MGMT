const inquirer = require('inquirer');

var prompt = inquirer.createPromptModule();

const init = async () =>{

    
    let task = await prompt([
        {
            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles,', 'view all employees', 'add a department','add a role', 'add an employee', 'update an employee role']
        }
    ]);

    console.log(task);
    
}
    

init();

