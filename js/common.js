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
      return entrys;
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

/*
public class BubbleSortEntrys {  
  static void bubbleSort(loadStoredEntrys()) {  
      int n = entrys.length;  
      int temp = 0;  
       for(int i=0; i < n; i++){  
               for(int j=1; j < (n-i); j++){  
                        if(entrys[j-1] > entrys[j]){  
                               //swap elements  
                               temp = entrys[j-1];  
                               entrys[j-1] = entrys[j];  
                               entrys[j] = temp;  
                       }  
                        
               }  
       }  

  }
}*/