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
const loadCardApiByCetagoryId = (cetagoryID) => {
    fetch(`https://openapi.programming-hero.com/api/category/${cetagoryID}`)
        .then(res => res.json())
        .then(cardsDetails => showcardByCategory(cardsDetails.
            plants))
}

//  -------- cal add to card button ---------
const addCartBtn = ()=>{
    console.log(" add to card btn clicked");
    console.log(cardsContainers)
}
// ........ display or showing data into UI ....
const showingCatagory = (categories) => {
    categories.forEach(category => {
        // console.log()
        categorContainer.innerHTML += `
            <li id="${category.id}" class="hover:bg-green-500 py-2 px-3 rounded-md btn-category cursor-pointer">${category.category_name}</li>
  `
    });
    categorContainer.addEventListener("click", (e) => {
        const caterogyList = document.querySelectorAll('li');
        caterogyList.forEach(li => {
            li.classList.remove("bg-green-500")
        })
        if (e.target.localName === 'li') {
            e.target.classList.add("bg-green-500")
            loadCardApiByCetagoryId(e.target.id)
        }
    })

}


