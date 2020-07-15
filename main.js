const addTodo = document.querySelector(".addTodo"); // input text for adding todo item
const form = document.querySelector("form");
const editTodo = document.querySelector("#editTodo");
const todoList = document.querySelector(".todoList")
let todoValue = ""
console.log(addTodo);
console.log(form)

const addTemplate = (elementValue, htmlTag, index) => {
    const todoTemplate = `               
                
                    <input type="checkbox" id="${index}"/>
                    <label for="${index}">${elementValue}</label>
                    <div class="update">
                        <input type="button" value="Edit" class="editTodo">
                        <input type="button" value="Delete" class="deleteTodo">
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
        addTemplate(allItems[key], li , key);
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
    addTemplate(addTodo.value, li,"todo" + localStorage.length);
    todoList.appendChild(li);

})


/*if (typeof(editTodo) != "undefined" && editTodo != null){
    editTodo.addEventListener("click", () => {
        const childName = localStorage.getItem("todo1");
        console.log(childName);
    })
//}
*/

todoList.addEventListener("click", (event) => {
    const clickTarget = event.target
    console.log(clickTarget);
    if(clickTarget.classList.contains("editTodo")) {
        console.log("Edit button detected")
    } else if(clickTarget.classList.contains("deleteTodo")) {
        console.log("Delete the contains of this tag");
        //clickTarget.closest("li") to find nearest li tag - in this case parent
        console.log(clickTarget.closest("li"));
        todoList.removeChild(clickTarget.closest("li"));
    }
})