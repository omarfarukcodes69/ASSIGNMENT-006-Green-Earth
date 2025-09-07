// all container call
const categorContainer = document.getElementById("category-container");
const cardsContainers = document.getElementById("cards-container");

// ..... all api data load function .......
const loadAllPlants = () => {
    fetch(`https://openapi.programming-hero.com/api/plants`)
        .then(res => res.json())
        .then(cardsData => showcardByCategory(cardsData.plants))
        .catch(err => console.log(err))
}

const loadCatagories = () => {
    const catagoriesAPI = `https://openapi.programming-hero.com/api/categories`
    fetch(catagoriesAPI)
        .then(res => res.json())
        .then(cat => {
            showingCatagory(cat.categories)
        })
}

