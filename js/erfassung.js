/**
 * Initialize the page. Will provide a form to create a new entry, if no ID is provided as query parameter. If
 * an ID is provided as query parameter, an edit form will be shown.
 */
 function initialize() {
  console.debug("Initializing create and edit page")

  var entryId = new URLSearchParams(location.search).get("id");
  if (entryId) {
      console.debug(`Page loaded in edit mode for entry with ID: ${entryId}`);
      var entry = getEntryById(loadStoredEntrys(), entryId);
      if (entry) {
          setValueById("date", entry.date);
          setValueById("counter", entry.counter);

          //setTextContentById("page-title", "Aufgabe bearbeiten");
          setTextContentById("save-button", "Speichern");
          setAttributeById("save-button", "onclick", `save('${entryId}')`);
      } else {
          console.error("Entry not found for ID: " + entryId);
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
* Searches for a entry contained in the local storage.
*
* @param entries The list of entries to search in.
* @param id The ID of the entry to search for.
* @returns {any|undefined} The entry, if it was found.
*/
function getEntryById(entries, id) {
  for (var entry of entries) {
      if (entry.id === id) {
          return entry;
      }
  }
  return undefined;
}

/**
* Save the data contained in the form.
*
* @param id The ID of the entry, if a entry should be updated.
*/
function save(id) {
  var entries = loadStoredEntrys();
  var entry = createEntryFromInput(id);

  if (id) {
      replaceEntry(entries, id, entry);
  } else {
      entries.push(createEntryFromInput());
  }
  storeEntrys(entries);
  console.debug("Entry saved");
}

/**
* Replace a entry with a specific ID in a entry array.
*
* @param entries The array in which the entry should be replaced.
* @param idToReplace The ID of the entry to replace.
* @param updatedEntry The entry object replacing the entry with the given ID.
*/
function replaceEntry(entries, idToReplace, updatedEntry) {
  if (entries && idToReplace && updatedEntry) {
      for (var i = 0; i < entries.length; i++) {
          if (entries[i].id === idToReplace) {
              entries[i] = updatedEntry
              return;
          }
      }
  } else {
      console.error("Invalid arguments to replace entry");
  }
  console.error(`Element with ID not known: ${idToReplace}`);
}

/**
* Create a entry object from the values of the form input fields related to a entry.
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
