/**
 * Load stored entrys from local storage, if some are stored there.
 *
 * @returns {*[]|any} Stored entrys from local storage or empty entrysay, if no entrys were present.
 */
 function loadStoredEntrys() {
  var storedEntrysJson = localStorage.getItem("entrys");
  if (storedEntrysJson) {
      var entrys = JSON.parse(storedEntrysJson);
      console.debug(`Count of loaded entrys: ${entrys.length}`);
      var storedEntrys = bblSort(entrys)
      return storedEntrys;
  }
  

  return [];
}

/**
* Store entrys in the local storage.
*
* @param entrys Entrys to store.
*/
function storeEntrys(entrys) {
  if (entrys) {
      localStorage.setItem("entrys", JSON.stringify(entrys));
      console.debug(`Count of stored entrys: ${entrys.length}`);
  } else {
      console.error("No entrys to store");
  }
}



// Bubble sort Implementation using Javascript
 
 
// Creating the bblSort function
function bblSort(entrys){
    
  for(var i = 0; i < entrys.length; i++){
     
    // Last i elements are already in place 
    for(var j = 0; j < ( entrys.length - i -1 ); j++){
       
      // Checking if the item at present iteration
      // is greater than the next iteration
      if(entrys[j].date > entrys[j+1].date){
         
        // If the condition is true then swap them
        var temp = entrys[j]
        entrys[j] = entrys[j + 1]
        entrys[j+1] = temp
      }
    }
  }
  // Print the sorted entrysay
  console.log(entrys);
 }
  