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
});

const toyCollection = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")

fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(addCardsToCollection)

function addCardsToCollection(data){
  data.forEach(element => {
    addOneSingleCard(element)
  });
}

function addOneSingleCard(cardDataObj) {
  const card = document.createElement("div")
  const name = document.createElement("h2")
  const image = document.createElement("img")
  const likes = document.createElement("p")
  const button = document.createElement("button")
  card.className = "card"
  name.textContent = cardDataObj.name
  image.src = cardDataObj.image
  image.style.width = "220px"
  image.style.margin = "10px"
  likes.textContent = `${cardDataObj.likes} likes`
  button.textContent = "Like"
  button.className = "like-btn"
  button.id = "[toy_id]"
  card.append(name,image,likes,button)
  toyCollection.append(card)
  likeButton(cardDataObj,button,likes)
}

function likeButton(cardDataObj,button,likes){
  button.addEventListener("click", () => {
    likes.textContent = `${cardDataObj.likes += 1} likes` 

    const PATCH_OPTIONS ={
      method: "PATCH",
        
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },

      body: JSON.stringify({
        "likes": cardDataObj.likes
      })
    }

    fetch(`http://localhost:3000/toys/${cardDataObj.id}`,PATCH_OPTIONS)
  })
}

toyForm.addEventListener("submit", event => {
    event.preventDefault()
    const toyNameInput = event.target['name'].value
    const toyUrlInput = event.target['image'].value

    const POST_OPTIONS = {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },

      body: JSON.stringify({
        "name": toyNameInput,
        "image": toyUrlInput,
        "likes": 0
      })
    }

    fetch("http://localhost:3000/toys",POST_OPTIONS)
    .then(response => response.json())
    .then(addOneSingleCard)

    toyForm.reset()
})

