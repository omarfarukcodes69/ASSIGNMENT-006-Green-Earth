// all container call
const categorContainer = document.getElementById("category-container");
const cardsContainers = document.getElementById("cards-container");
const yourCardsContainers = document.getElementById("add-container");

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
cardsContainers.addEventListener("click", (e) => {
    if (e.target.localName === 'button') {
        console.log(e.target)
        const totalPrice = document.getElementById("total-price").innerText;
        const plantsName = e.target.parentNode.children[0].innerText;
        const plantsPrice = e.target.parentNode.children[2].children[1].children[1].innerText;
        const currenPrice = Number(totalPrice) + Number(plantsPrice);
        document.getElementById("total-price").innerText = currenPrice;
        console.log()

        yourCardsContainers.innerHTML += `
                    <div  class=" bg-[#F0FDF4] px-4 py-2 rounded-md flex justify-between items-center my-3 ">
                        <div class="title space-y-2">
                        <h1 class="text-xl font-bold">${plantsName}</h1>
                        <p class="text-md text-gray-400 "><span>৳</span><span> ${plantsPrice}</span></p>
                    </div>
                    <div class=" cursor-pointer"><i class="fa-solid fa-xmark"></i></div>
                </div>

        `
        // console.log(plantsName, plantsPrice)

    }

})
// ........ display or showing data into UI ....
const showingCatagory = (categories) => {
    categories.forEach(category => {
        // console.log()
        categorContainer.innerHTML += `
            <li id="${category.id}" class="hover:bg-green-500 py-2 px-3 rounded-md btn-category cursor-pointer">${category.category_name}</li>
  `
    });
    // ----- Category btn feature -------
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

const showcardByCategory = (plants) => {
    cardsContainers.innerHTML = " ";
    plants.forEach(plant => {
        cardsContainers.innerHTML += `
                            <div class="card w-full bg-white shadow-sm px-4 pt-4">
                        <figure class="max-h-50 rounded-md">
                            <img  src="${plant.image}"
                                alt="${plant.name}" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">${plant.name}</h2>
                            <p>${plant.description} </p>
                            <div class=" text-lg flex items-center justify-between">
                                <p class="text-center p-1 bg-[#DCFCE7] text-[#166534] rounded-3xl ">${plant.category}</p>
                                <p class=" font-bold text-right"><span>৳</span><span>${plant.price}</span></p>
                            </div>
                            <button class="btn w-full py-6 bg-[#166534] text-white text-lg rounded-3xl">Add to
                                Cart</button>
                        </div>
                    </div>
        `
    })
}

loadCatagories()
loadAllPlants()