const addTodo = document.querySelector(".addTodo"); // input text for adding todo item
const form = document.querySelector("form");
const gotoEditTodo = document.querySelector("#gotoEditTodo");
const updateRecords = document.querySelector(".updateRecords");


//edit section variables
const editTodo = document.querySelector(".editedTodo");
const saveTodo = document.querySelector(".saveTodo");
const cancelEdit = document.querySelector(".cancelEdit");
let storageKey = "";
console.log(editTodo)

//end edit section
const todoList = document.querySelector(".todoList")
let todoValue = ""
console.log(addTodo);
console.log(form)

const addTemplate = (elementValue, htmlTag, indexed) => {
    const todoTemplate = `          
                                   
                    <label> 
                         <input type="checkbox" id="${indexed}"/> <span>${elementValue}</span>
                    </label>
                    <div class="update">
                        <input type="button" value="Edit" class="gotoEditTodo ${indexed}">
                        <input type="button" value="Delete" class="deleteTodo ${indexed}">
                    </div>
                 `
    htmlTag.innerHTML = todoTemplate
}


const populateLi = () => {
    //get allitems in localStorage
    let count = 0
    const allItems = { ...localStorage }
    console.log(allItems);
    for (let key in allItems) {
        const li = document.createElement("li");
        console.log(count)
        console.log(allItems[key], key);
        addTemplate(allItems[key], li, key);
        todoList.appendChild(li);
        count = count + 1;
    }

}
populateLi()


/* form submission - adding a totoItem
form.submit = (event) => {
    event.preventDefault()
    console.log(event)
}*/// this code does not work with preventDefault !!!
form.addEventListener("submit", (event) => {
    const li = document.createElement("li");
    event.preventDefault()
    console.log(event)
    console.log(addTodo.value);
    console.log("Localstotage ", localStorage.length)
    localStorage.setItem("todo" + localStorage.length, addTodo.value);
    // todoValue = todo + addTodo.value

    // li.innerHTML = todoTemplate
    addTemplate(addTodo.value, li, "todo" + localStorage.length);
    todoList.appendChild(li);

})


/*if (typeof(gotoEditTodo) != "undefined" && gotoEditTodo != null){
    gotoEditTodo.addEventListener("click", () => {
        const childName = localStorage.getItem("todo1");
        console.log(childName);
    })
//}
*/

todoList.addEventListener("click", (event) => {

    const clickTarget = event.target
    console.log(clickTarget);
    if (clickTarget.classList.contains("gotoEditTodo")) {
        console.log("Edit button detected");
        //location.reload() ;    
        rewriteTodo(clickTarget.classList[1]);
        updateRecords.classList.toggle("showUpdateRecords");
    } else if (clickTarget.classList.contains("deleteTodo")) {      
        deleteRecords(clickTarget.classList[1]);
        console.log("Delete the contains of this tag");
        //clickTarget.closest("li") to find nearest li tag - in this case parent
        console.log(clickTarget.closest("li"));
        todoList.removeChild(clickTarget.closest("li"));
    }
})

// edit records
let rewriteTodo = (keyTarget) => {
    const textMsg = document.querySelector(".textMsg");
    const allItems = { ...localStorage }  
    for (let key in allItems) {
        console.log(allItems[key], key);
        if (key == keyTarget) {
            console.log(("Item to  edit is"), allItems[key]);
            console.log("The key is ", key);
            textMsg.innerHTML = `Edit ${allItems[key]} record`
            editTodo.value = allItems[key];
            storageKey = key;
        }

    }
}

//update records
const newUpdatedRecords = () => {
    localStorage.setItem(storageKey, editTodo.value);
    updateRecords.classList.toggle("showUpdateRecords");
    //change the text in the span 
    const spanLabel = document.getElementById(storageKey);
    const nextSpan = spanLabel.nextElementSibling
    nextSpan.innerHTML = editTodo.value;
    console.log(nextSpan);
}

saveTodo.addEventListener("click", newUpdatedRecords)

// return without updating records
const cancelUpdate = () => {
   // editTodo.value = "";
    updateRecords.classList.toggle("showUpdateRecords");
}

cancelEdit.addEventListener("click", cancelUpdate)

//delete records

const deleteRecords = (keyTarget) => {
      const allItems = { ...localStorage }       
        for (let key in allItems) {
            console.log(allItems[key], key);
            if (key == keyTarget) {
                console.log(key);
                localStorage.removeItem(key);
            }

        }
}