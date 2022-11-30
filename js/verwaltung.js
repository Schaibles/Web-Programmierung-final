/**
 * Initialize the page. Will load all entries from the local storage and show them.
 */
 function initialize() {
  console.debug("Initializing list page")
  showEntrys(loadStoredEntrys());
}

/**
* Display the given entries in the entry list.
*
* @param entries The entries to show in the entry list.
*/
function showEntrys(entries) {
  if (entries) {  
    var count = 0; 
    var entryHtmlContentRed =`

    <div class="administration-counter-total">
      <img src="img/counter_dark.png"/>
      <p>&nbsp;${entries[0].counter}&nbsp;kWh</p>
    </div>

    <div class="energy-consumption-total">
      ${getImage(entries, count)}
      <div class="p-energy-consumption">
        <p>
        &nbsp;${calcDiffTotal(entries, count)}&nbsp;
      </p>
      <h2>&nbsp;${getDate(entries, count)}</h2>
    </div>
  </div>
  `;
        var entryLi = document.createElement("list");
          entryLi.innerHTML = entryHtmlContentRed;
          appendById("entries", entryLi);
  
      for (var entry of entries) {
        
        console.log(count);
          var entryHtmlContent = `
          
          <div class="administration-date">
              <img src="img/calendar.png"/>
              <p>${formatDate(new Date(entry.date))}</p>
          </div>

          <div class="administration-counter">
              <img src="img/counter_dark.png"/>
              <p>&nbsp;${parseFloat(entry.counter).toFixed(2).replace(`.`,`,`)}&nbsp;kWh</p>
          </div>

          <div class="energy-consumption">
            ${getImage(entries, count)}
            <div class="p-energy-consumption">
              <p>
              &nbsp;${calcDiff(entries, count)}&nbsp;
              </p>
              <h2>&nbsp;${getDate(entries, count)}</h2>
            </div>
          </div>
          
          <div class="administration-delete">
              <img src="img/delete.png" onclick="deleteEntry('${entry.id}')"/>
          </div>
      `;
      count = count+1;
          var entryLi = document.createElement("li");
          entryLi.innerHTML = entryHtmlContent;
          appendById("entries", entryLi);
      }
  } else {
      console.error("No entries provided to be shown")
  }
}


function calcDiff(entries, count){
  if(count == entries.length-1){
    return "";
  
  }
  else{
    return (entries[count].counter-entries[count+1].counter).toFixed(2).replace(`.`,`,`) +` kWh`;
  }
}

function calcDiffTotal(entries, count){
  if(count == entries.length-1){
    return "";
  
  }
  else{
    return (entries[0].counter-entries[count].counter).toFixed(2).replace(`.`,`,`) +` kWh`;
  }
}

function getImage(entries, count){
  if(count == entries.length-1){
    return "";
  
  }
  else{
    return `<img src="img/energy-consumption_dark.png">`;
  }
}

function getDate(entries, count){
  if(count == entries.length-1){
    return "";
  }
  else{
    return formatDate(new Date(entries[count+1].date)) 
    + `-` 
    +formatDate(new Date(entries[count].date));
  }
}

function getDateTotal(entries, count){
  if(count == entries.length-1){
    return "";
  }
  else{
    return formatDate(new Date(entries[count-entries.length].date)) 
    + `-` 
    +formatDate(new Date(entries[count].date));
  }
}
/**
* Safely append a new element to an element identified by its ID.
* @param id The ID of the parent element.
* @param elementToAppend The new element to append.
*/
function appendById(id, elementToAppend) {
  var element = document.getElementById(id);
  if (element) {
      element.append(elementToAppend);
  } else {
      console.error(`Element with ID not found: ${id}`);
  }
}

/**
* Delete the entry with the given ID.
*
* @param id The ID of the entry to delete.
*/
function deleteEntry(id) {
  console.debug(`Attempting to delete entry with ID: ${id}`);

  var entries = loadStoredEntrys();
  if (entries && id) {
      for (var i = 0; i < entries.length; i++) {
          if (entries[i].id === id) {
              entries.splice(i, 1);
              storeEntrys(entries);
              cleanEntryList();
              showEntrys(entries);

              console.info(`Deleted entry with ID: ${id}`);

              break;
          }
      }
  } else {
      console.error("Invalid arguments to remove entry");
  }
}

/**
* Remove all entries from the entry list.
*/
function cleanEntryList() {

  var entryList = document.getElementById("entries");
  if (entryList) {
      entryList.innerHTML = "";
      console.debug("Cleared entry list");
  } else {
      console.error("Entry list not found");
  }
}

/**
* Properly format a date to be displayed.
*
* @param date The date to format.
* @returns {string} The formatted date.
*/
function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  if (day < 10) {
      day = '0' + day;
  }
  if (month < 10) {
      month = '0' + month;
  }

  var formattedDate = `${day}.${month}.${year}`;
  console.debug(`Formatted date is: ${formattedDate}`);
  return formattedDate;
}