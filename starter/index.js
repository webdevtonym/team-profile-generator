const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: "What is the team manager's managers name?",
        validate: function(value){
            if (value.length > 0) {
                return true;
            } else {
                return 'Please enter a name.'
            }
        }
        
    },

    {
        type: 'input',
        name: 'id',
        message: "What is the team manager's ID?",
        validate: function(value){
            if(!NaN(value && value.length > 0)) {
                return true;
            } else {
                return 'Please enter a valid ID';
            }
        }
    },

    {
        type: 'input',
        name: 'email',
        message: "What is the team manager's email address?",
        validate: function(value) {
            if (/\S+@\S+\. \S+/.test(value)){
                return true;
            } else {
                return 'Please enter a valid email address';
            }
        }
    },

    {
        type: 'input',
        name: 'officeNumber',
        message: "What is the team manager's office number?",
        validate: function(value) {
            if(!isNaN(value && value.length > 0)) {
                return true;
            } else {
                return 'Please enter a valid office number.';
            }
        }

    }

]

);
