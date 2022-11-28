/**
 * Load stored tasks from local storage, if some are stored there.
 *
 * @returns {*[]|any} Stored tasks from local storage or empty array, if no tasks were present.
 */
 function loadStoredEntrys() {
  var storedEntrysJson = localStorage.getItem("tasks");
  if (storedEntrysJson) {
      var tasks = JSON.parse(storedEntrysJson);
      console.debug(`Count of loaded tasks: ${tasks.length}`);
      return tasks;
  }

  return [];
}

/**
* Store tasks in the local storage.
*
* @param tasks Entrys to store.
*/
function storeEntrys(tasks) {
  if (tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.debug(`Count of stored tasks: ${tasks.length}`);
  } else {
      console.error("No tasks to store");
  }
}