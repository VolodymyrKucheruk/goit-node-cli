const contacts = require("./contacts");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContacts = await contacts.listContacts();
      return console.table(listContacts);
    case "get":
      const getContact = await contacts.getContactById(id);
      return console.log(getContact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case "remove":
      const removeContact = await contacts.removeContact(id);
          return console.log(removeContact);
      default: console.log("Unknown action");
  }
};
invokeAction(options);