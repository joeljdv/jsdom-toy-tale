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
    for (const toy of data){
        const divTags = document.createElement("div")
        divTags.classList.add("card");
        divTags.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class= toy-avatar>
        <p class="likes">${toy.likes} Likes</p>
        `
        const likeBtn = document.createElement('button')
        likeBtn.classList.add("like-btn")
        likeBtn.innerText = "Like"
        collection.appendChild(divTags)
        divTags.appendChild(likeBtn)
        let a = `${toy.id}`;
          let b = parseInt(toy.likes)
        likeBtn.addEventListener("click",()=>{
          let c = b++
          fetch(toysURL+`/${a}`,{
            method: "PATCH",
            body:JSON.stringify({
              likes: `${c}`
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          })
          .then(res => res.json())
          .then(data => {
            console.log(data.likes)
            const pTags = document.getElementsByClassName("likes")
            pTags.innerText= `${data.likes} Likes`
            
            }
          )
        })
      }
  })
}

 



function addAToy(e){
  e.preventDefault()
  let x = document.querySelectorAll(".input-text")
  const toys = {
    name: x[0].value,
    image: x[1].value,
    "likes": 0
  }
  fetch(toysURL, {
    
    method: "POST",
    headers:{
      "Content-type": 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(toys)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    x[0].value=""
    x[1].value=""
    const collection = document.querySelector("#toy-collection")
    const divTags = document.createElement("div")
    divTags.classList.add("card");
    divTags.innerHTML = `
   <h2>${data.name}</h2>
   <img src=${data.image} class= toy-avatar>
    <p>${data.likes} Likes</p>`
    collection.appendChild(divTags)

  })

}
