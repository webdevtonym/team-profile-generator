const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];


function promptMenu() {

      return inquirer
        .prompt([
          {
            type: "list",
            name: "menu",
            message: "What would you like to do next?",
            choices: [
              "Add an engineer",
              "Add an intern",
              "Finish building the team",
            ],
          },
        ])
        .then(function (menuAnswers) {
          switch (menuAnswers.menu) {
            case "Add an engineer":
              return promptEngineer();
            case "Add an intern":
              return promptIntern();
            case "Finish building the team":
              return finishTeam();
          }
        });
}

function promptEngineer() {
  
      return inquirer
        .prompt([
          {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
            validate: function (value) {
              if (value.length > 0) {
                return true;
              } else {
                return "Please enter a name.";
              }
            },
          },
          {
            type: "input",
            name: "id",
            message: "What is the engineer's ID?",
            validate: function (value) {
              if (!isNaN(value) && value.length > 0) {
                return true;
              } else {
                return "Please enter a valid ID.";
              }
            },
          },
          {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?",
            validate: function (value) {
              if (/\S+@\S+\.\S+/.test(value)) {
                return true;
              } else {
                return "Please enter a valid email address";
              }
            },
          },
          {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?",
            validate: function (value) {
              if (value.length > 0) {
                return true;
              } else {
                return "Please enter a GitHub username";
              }
            },
          },
        ])
        .then(function (engineerAnswers) {
          const engineer = new Engineer(
            engineerAnswers.name,
            engineerAnswers.id,
            engineerAnswers.email,
            engineerAnswers.github
          );
          console.log(
            `Engineer ${engineer.getName()} (${engineer.getRole()}) has been added`
          );
          teamMembers.push(engineer);
          return promptMenu();
        });

}

function promptIntern() {
  

  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the intern's name?",
        validate: function (value) {
          if (value.length > 0) {
            return true;
          } else {
            return "Please enter a name.";
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is the intern's ID?",
        validate: function (value) {
          if (!isNaN(value) && value.length > 0) {
            return true;
          } else {
            return "Please enter a valid ID.";
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the intern's email address?",
        validate: function (value) {
          if (/\S+@\S+\.\S+/.test(value)) {
            return true;
          } else {
            return "Please enter a valid email address";
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "What is the intern's school?",
        validate: function (value) {
          if (value.length > 0) {
            return true;
          } else {
            return "Please enter a school";
          }
        },
      },
    ])
    .then(function (internAnswers) {
      const intern = new Intern(
        internAnswers.name,
        internAnswers.id,
        internAnswers.email,
        internAnswers.school
      );
      console.log(
        `Intern ${intern.getName()} (${intern.getRole()}) has been added`
      );
      teamMembers.push(intern);
      return promptMenu();
    });
}

function finishTeam() {
  const html = render(teamMembers);
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFile(outputPath, html, (err) =>
    err
      ? console.error(err)
      : console.log(`Successfully created team profile page: ${outputPath}`)
  );
}

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "What is the team manager's name?",
      validate: function (value) {
        if (value.length > 0) {
          return true;
        } else {
          return "Please enter a name.";
        }
      },
    },
    {
      type: "input",
      name: "id",
      message: "What is the team manager's ID?",
      validate: function (value) {
        if (!isNaN(value) && value.length > 0) {
          return true;
        } else {
          return "Please enter a valid ID.";
        }
      },
    },
    {
      type: "input",
      name: "email",
      message: "What is the team manager's email address?",
      validate: function (value) {
        if (/\S+@\S+\.\S+/.test(value)) {
          return true;
        } else {
          return "Please enter a valid email address";
        }
      },
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is the team manager's office number?",
      validate: function (value) {
        if (!isNaN(value) && value.length > 0) {
          return true;
        } else {
          return "Please enter a valid office number.";
        }
      },
    },
  ])
  .then(function (answers) {
    const manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNumber
    );
    console.log(
      `Team manager ${manager.getName()} (${manager.getRole()}) has been added.`
    );
    teamMembers.push(manager);
    promptMenu(); // Call the promptMenu function
  })
  .catch(function (error) {
    console.error(error);
  });

  
  



