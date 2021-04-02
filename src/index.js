let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fecthToys()
  document.querySelector("form").addEventListener("submit", addAToy)
});

const toysURL = "http://localhost:3000/toys"

function fecthToys() {
  fetch(toysURL)
  .then(res => res.json())
  .then((data)=> {
    console.log(data)
    const collection = document.querySelector("#toy-collection")
    data.forEach(toy => { 
      renderToy(toy)    
    })
    attchClick()
  })
}

function attchClick(){
    const btn = document.querySelectorAll(".like-btn")
    btn.forEach(item=>item.addEventListener("click",likeButton))
}


function likeButton(e) {  
    console.log(e)  
    let num = parseInt(e.target.parentElement.querySelector("p").innerText.split(" ")[0])
    num +=1

    fetch(toysURL+`/${e.target.id}`,{
      method: "PATCH",
      body: JSON.stringify({
        likes: `${num}`
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(res => res.json())
    .then(data=>{
      console.log(data.likes)
      e.target.parentElement.querySelector("p").innerText = `${num} Likes`
    })
}

function addAToy(e){
  e.preventDefault()
  let inputs = document.querySelectorAll(".input-text")
  const toy = {
    name: inputs[0].value,
    image: inputs[1].value,
    "likes": 0
  }
  fetch(toysURL, {
    
    method: "POST",
    headers:{
      "Content-type": 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    inputs[0].value=""
    inputs[1].value=""
    
    renderToy(data)
  })

}

function renderToy(toy) {
  const collection = document.querySelector("#toy-collection")
  collection.innerHTML += `
      <div class="card">
      <h2>${toy.name}</h2>
      <img src= ${toy.image} class="toy-avatar" />
      <p class=likes >${toy.likes} Likes</p>
      <button class="like-btn" id=${toy.id}>Like <3</button>
      </div>`  
}