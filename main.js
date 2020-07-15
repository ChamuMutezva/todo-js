const addTodo = document.querySelector(".addTodo"); // input text for adding todo item
const form = document.querySelector("form");
const editTodo = document.querySelector("#editTodo");
const todoList = document.querySelector(".todoList")
let todoValue = ""
console.log(addTodo);
console.log(form)

const addTemplate = (elementValue, htmlTag) => {
    const todoTemplate = `                     
                <div>
                    <input type="checkbox" id="todo${localStorage.length}"/>
                    <label for="todo${localStorage.length}">${elementValue}</label>
                    <div class="update">
                        <input type="button" value="Edit" class="editTodo">
                        <input type="button" value="Delete" class="deleteTodo">
                    </div>
                </div> `
    htmlTag.innerHTML = todoTemplate
}


const populateLi = () => {
    //get allitems in localStorage
    const allItems = { ...localStorage }
    console.log(allItems);
    for (let key in allItems) {
        const li = document.createElement("li");
        console.log(allItems[key]);
        addTemplate(allItems[key], li);
        todoList.appendChild(li);
    }

}
populateLi()


//Elements of the todo template
//const checkboxID =

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
    todoValue = addTodo.value

    // li.innerHTML = todoTemplate
    addTemplate(addTodo.value, li);
    todoList.appendChild(li);

})


//if (typeof(editTodo) != "undefined" && editTodo != null){
    editTodo.addEventListener("click", () => {
        const childName = localStorage.getItem("todo1");
        console.log(childName);
    })
//}

