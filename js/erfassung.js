/**
 * Initialize the page. Will provide a form to create a new task, if no ID is provided as query parameter. If
 * an ID is provided as query parameter, an edit form will be shown.
 */
 function initialize() {
  console.debug("Initializing create and edit page")

  var taskId = new URLSearchParams(location.search).get("id");
  if (taskId) {
      console.debug(`Page loaded in edit mode for task with ID: ${taskId}`);
      var task = getEntryById(loadStoredEntrys(), taskId);
      if (task) {
          setValueById("date", task.date);
          setValueById("counter", task.counter);

          //setTextContentById("page-title", "Aufgabe bearbeiten");
          setTextContentById("save-button", "Speichern");
          setAttributeById("save-button", "onclick", `save('${taskId}')`);
      } else {
          console.error("Entry not found for ID: " + taskId);
      }
  } else {
      console.debug("Page loaded in create mode");
  }
}

/**
* Safely set the value of an element identified by its ID.
*
* @param id The ID of the element to search for.
* @param value The value to set.
*/
function setValueById(id, value) {
  var element = document.getElementById(id);
  if (element) {
      element.value = value;
  } else {
      console.error(`Element with ID does not exist: ${id}`);
  }
}

/**
* Safely set the text content of an element identified by its ID.
*
* @param id The ID of the element to search for.
* @param value The text content to set.
*/
function setTextContentById(id, value) {
  var element = document.getElementById(id);
  if (element) {
      element.textContent = value;
  } else {
      console.error(`Element with ID does not exist: ${id}`);
  }
}

/**
* Safely set an attribute value of an element identified by its ID.
*
* @param id The ID of the element to search for.
* @param attributeName The name of the attribute to set.
* @param attributeValue The value of the attribute to set.
*/
function setAttributeById(id, attributeName, attributeValue) {
  var element = document.getElementById(id);
  if (element) {
      element.setAttribute(attributeName, attributeValue);
  } else {
      console.error(`Element with ID does not exist: ${id}`);
  }
}

/**
* Searches for a task contained in the local storage.
*
* @param tasks The list of tasks to search in.
* @param id The ID of the task to search for.
* @returns {any|undefined} The task, if it was found.
*/
function getEntryById(tasks, id) {
  for (var task of tasks) {
      if (task.id === id) {
          return task;
      }
  }
  return undefined;
}

/**
* Save the data contained in the form.
*
* @param id The ID of the task, if a task should be updated.
*/
function save(id) {
  var tasks = loadStoredEntrys();
  var task = createEntryFromInput(id);

  if (id) {
      replaceEntry(tasks, id, task);
  } else {
      tasks.push(createEntryFromInput());
  }
  storeEntrys(tasks);
  console.debug("Entry saved");
}

/**
* Replace a task with a specific ID in a task array.
*
* @param tasks The array in which the task should be replaced.
* @param idToReplace The ID of the task to replace.
* @param updatedEntry The task object replacing the task with the given ID.
*/
function replaceEntry(tasks, idToReplace, updatedEntry) {
  if (tasks && idToReplace && updatedEntry) {
      for (var i = 0; i < tasks.length; i++) {
          if (tasks[i].id === idToReplace) {
              tasks[i] = updatedEntry
              return;
          }
      }
  } else {
      console.error("Invalid arguments to replace task");
  }
  console.error(`Element with ID not known: ${idToReplace}`);
}

/**
* Create a task object from the values of the form input fields related to a task.
*
* @param id An existing ID, if it is known. If not provided, a new ID will be generated.
* @returns {{date: (*|undefined), counter: (*|undefined), id: string}} Entry object.
*/
function createEntryFromInput(id) {
  var date = getInputValueById("date");
  var counter = getInputValueById("counter");


  // If no ID is provided, we create one
  if (!id) {
      id = crypto.randomUUID();
  }

  return {
      id: id,
      date: date,
      counter: counter,
      
  }
}

/**
* Search for an HTML input element by its ID and return the value.
*
* @param id The ID of the HTML input element.
* @returns {undefined|*} The value of the HTML input element, if one with the given ID exists.
*/
function getInputValueById(id) {
  if (id) {
      var input = document.getElementById(id);
      if (input) {
          return input.value;
      } else {
          console.error(`Input with ID not found: ${id}`);
          return undefined;
      }
  }

  console.error("No ID provided");
  return undefined;
}
