const addTodo = document.querySelector(".addTodo"); // input text for adding todo item
const form = document.querySelector("form");
const editTodo = document.querySelector("#editTodo");
console.log(addTodo);
console.log(form)

/*form.submit = (event) => {
    event.preventDefault()
    console.log(event)
}*/// this code does not work with preventDefault !!!
form.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(event)
    console.log(addTodo.value);
    console.log("Localstotage " , localStorage.length)
    localStorage.setItem("todo" + localStorage.length , addTodo.value);
})

editTodo.addEventListener("click", () => {
    const childName = localStorage.getItem("todo1");
    console.log(childName);
})