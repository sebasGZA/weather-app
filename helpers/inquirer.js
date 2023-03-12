const inquirer = require("inquirer");
require("colors");

const menuOption = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      {
        value: 1,
        name: `${"1".green}. Search city`,
      },
      {
        value: 2,
        name: `${"2".green}. Records`,
      },
      {
        value: 0,
        name: `${"0".green}. Exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  // console.clear();
  console.log("===================".green);
  console.log("     Weaher app".white);
  console.log("===================".green);

  const { option } = await inquirer.prompt(menuOption);
  return option;
};

const stop = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ${"ENTER".green} to continue:`,
    },
  ];
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length == 0) {
          return "Type a valid value";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: place.id,
      name: `${idx} ${place.name}`,
    };
  });

  choices.unshift({
    value: "0",
    name: `${"0".green}. Cancel`,
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Select a place:",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirm = async (message = "") => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const tasksToFinish = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: task.isCompleted ? true : false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selects",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  stop,
  readInput,
  listPlaces,
  confirm,
  tasksToFinish,
};
