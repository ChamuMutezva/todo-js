const addTodo = document.querySelector(".addTodo"); // input text for adding todo item
const form = document.querySelector("form");
const gotoEditTodo = document.querySelector("#gotoEditTodo");
const updateRecords = document.querySelector(".updateRecords");
const clearAllRecordsBtn = document.querySelector(".clearAllRecordsBtn");
const clearAllRecordsDiv = document.querySelector(".clearAllRecordsDiv");
const switchCtl = document.querySelector(".slider");


let validateEntries = true;
const todoList = document.querySelector(".todoList")
let todoValue = ""

//edit section variables
const editTodo = document.querySelector(".editedTodo");
const saveTodo = document.querySelector(".saveTodo");
const cancelEdit = document.querySelector(".cancelEdit");
let count = 0;
let storageKey = "";
//end edit section

// switch/slider control
switchCtl.addEventListener("click", () => {
    const formCtrl = document.querySelector(".formCtrl");
    const container = document.querySelector(".container");
    const themeTextCtl = document.querySelector(".themeTextCtl");
    console.log(container)
    formCtrl.classList.toggle("toggleForm")
    container.classList.toggle("toggleContainer")
    console.log("Slider on and off")

    if (themeTextCtl.innerHTML == "Switch to Edit") {
        themeTextCtl.innerHTML = "Switch to Add"
    } else {
        themeTextCtl.innerHTML = "Switch to Edit"
    }
})

const addTemplate = (elementValue, htmlTag, indexed) => {
    const todoTemplate = `          
                                   
                    <label> 
                         <input type="checkbox"  class="completed" id="${indexed}"/> <span>${elementValue}</span>
                    </label>
                    <div class="update">                        
                        <input type="button" value="Edit" class="gotoEditTodo ${indexed}">                        
                        <input type="button" value="Delete" class="deleteTodo ${indexed}">
                    </div>
                 `
    htmlTag.innerHTML = todoTemplate
}

const completedTasks = () => {
    let countCompletedTasks = 0;
    const completed = Array.from(document.querySelectorAll(".completed"))
    const completedTitle = document.querySelector(".completedTitle");
    console.log(completed)
    // set checked for some items
    completed.forEach((element, index) => {
        if (index % 2 === 0){
            element.checked = true;
        }
    })
    completed.forEach(element => {
        console.log(element)
        if (element.checked) {
            console.log("This has been done")
            countCompletedTasks++;
        } else {
            console.log("not done yet")
        }
    })
    console.log(`${countCompletedTasks} tasks has been completed`)
    completedTitle.innerHTML = `${countCompletedTasks} tasks has been completed`
}

const populateLi = () => {
    //get allitems in localStorage
    const title = document.querySelector(".title");
    title.innerHTML = localStorage.length == 0 ? "No Tasks yet" : localStorage.length == 1
        ? "1 task to be done" : `${localStorage.length} tasks in total`
    const allItems = { ...localStorage }
    console.log(allItems);
    console.log(localStorage.length)
    for (let key in allItems) {
        const li = document.createElement("li");
        console.log(allItems[key], key);
        addTemplate(allItems[key], li, key);
        todoList.appendChild(li);
        //count = count + 1
    }

    const checkedItems = Array.from(document.querySelectorAll("input[type=checkbox]"));
    console.log(checkedItems);

    completedTasks();
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
    validateEmpty(addTodo.value);
    if (validateEntries == false) {
        return;
    }

    if (count == 0) {
        count = localStorage.length + 1;
    }
    let keyCount = "todo" + count;
    console.log(`Key count is ${keyCount}`);

    // check if there is a similar key,  udpate count until no match is found
    do {
        count = count + 1;
        keyCount = "todo" + count;
    } while ((keyCount in { ...localStorage }));


    // (Object.values(localStorage).includes(addTodo.value)) 
    //verify if element is not already in localstorage
    validateDuplicate();
    console.log(validateDuplicate())
    if (validateDuplicate()) {
        const errorMsg = document.querySelector(".addTodoItem");
        alert("This todo is already on your list");
        errorMsg.innerHTML = "This todo is already on your list";
    } else {

        localStorage.setItem(keyCount, addTodo.value); //changed localStorage.length to count        
        addTemplate(addTodo.value, li, "todo" + count); //changed localStorage.length to count
        todoList.appendChild(li);

        const title = document.querySelector(".title");
        title.innerHTML = localStorage.length == 0 ? "No Tasks yet" : localStorage.length == 1
            ? "1 task to be done" : `${localStorage.length} tasks to be done`

        addTodo.value = "";
        count = count + 1; //set new key value
    }
})

todoList.addEventListener("click", (event) => {

    const clickTarget = event.target
    console.log(clickTarget);
    if (clickTarget.classList.contains("gotoEditTodo")) {
        const todoWrapper = document.querySelector(".todoWrapper");
        todoWrapper.classList.add("hideTodos");
        console.log("Edit button detected");
        rewriteTodo(clickTarget.classList[1]);
        updateRecords.classList.toggle("showUpdateRecords");
    } else if (clickTarget.classList.contains("deleteTodo")) {
        deleteRecord(clickTarget.classList[1]);
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
    const todoWrapper = document.querySelector(".todoWrapper");
    todoWrapper.classList.remove("hideTodos");
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
    const todoWrapper = document.querySelector(".todoWrapper");
    todoWrapper.classList.remove("hideTodos");
    updateRecords.classList.toggle("showUpdateRecords");
}

cancelEdit.addEventListener("click", cancelUpdate)

//delete a single record
const deleteRecord = (keyTarget) => {
    const allItems = { ...localStorage }
    for (let key in allItems) {
        console.log(allItems[key], key);
        if (key == keyTarget) {
            console.log(key);
            localStorage.removeItem(key);
        }

    }
    const title = document.querySelector(".title");
    title.innerHTML = localStorage.length == 0 ? "No Tasks yet" : localStorage.length == 1
        ? "1 task to be done" : `${localStorage.length} tasks to be done`
}

//delete all Records
const deleteAllRecords = () => {
    localStorage.clear() //remove all data in the localStorage
    //remove all elements that are populated using localStorage data
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
    const title = document.querySelector(".title");
    title.innerHTML = localStorage.length == 0 ? "No Tasks yet" : localStorage.length == 1
        ? "1 task to be done" : `${localStorage.length} tasks to be done`


}
clearAllRecordsBtn.addEventListener("click", deleteAllRecords);

//validate empty entries
const validateEmpty = (valueTag) => {
    const errorMsg = document.querySelector(".addTodoItem");
    console.log(errorMsg)
    if (valueTag.trim() == "") {
        alert("Enter a todo item");
        errorMsg.innerHTML = "Enter a todo item, invalid entry"
        validateEntries = false;
    } else if (valueTag.trim().length < 2) {
        alert("A todo item has to have at least 2 letters");
        errorMsg.innerHTML = "A todo item has to have at least 2 letters";
        validateEntries = false
    } else {
        errorMsg.innerHTML = "Enter a todo item"
        validateEntries = true
    }
}

const validateDuplicate = () => {
    //check for elements that are already in the list and reject addition
    const exists = Object.values({ ...localStorage });
    const existsLowerCase = exists.map(element => element.toLowerCase().trim())
    console.log(Object.values(existsLowerCase));
    if (existsLowerCase.includes(addTodo.value.toLowerCase().trim())) {
        return true;
    } else {
        return false
    }

    return false
}

