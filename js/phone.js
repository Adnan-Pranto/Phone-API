const phnHunter = async (searchBox = 's', isShowAll) => {
    const data = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchBox}`);
    const jason = await data.json();
    const phone = jason.data;
    // console.log(phone);
    displayPhone(phone, isShowAll);
}


const displayPhone = (phone, isShowAll) => {
    // console.log(phone);

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';


    //    if my search field is more then 12 products 
    const moreOption = document.getElementById('show-container');
    if (phone.length > 12 && !isShowAll) {
        moreOption.classList.remove('hidden');
    }
    else {
        moreOption.classList.add('hidden');
    }
    // console.log('pagla',isShowAll)

    // disply on 1st screen 12 products 
    if (!isShowAll) {
        phone = phone.slice(0, 12);
    }

    phone.forEach(mobile => {
        // console.log(mobile);
        // step 1 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-2 bg-base-100 gap-10 my-10 shadow-xl`;
        // step 3 crate inner HTML 
        phoneCard.innerHTML = `
        <figure><img src="${mobile.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">brand:${mobile.brand}</h2>
            <p> ${mobile.phone_name}</p>
            <p> ${mobile.slug}</p>
            <div class="card-actions justify-center">
            <button onClick="showDetails('${mobile.slug}')" class="btn btn-primary">Show Details </button>
            </div>
        </div>
        </div>
        `;
        // step 4 appendChild 
        phoneContainer.appendChild(phoneCard);

    });
    // hidde toggle spinner 
    toggleDataSpin(false)
}

// show details for different phone..

const showDetails = async (id) => {
    // console.log('fuck mee',id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    showPhoneDetails(data.data);
}

//  Modal function 
const showPhoneDetails = (mobile) =>{
    console.log(mobile);
    // const phnName  = document.getElementById('full-phone-name');
    // phnName.innerText = mobile.name;

    const detailsContainer = document.getElementById('show-details-container');
    detailsContainer.innerHTML = `
    <img src="${mobile?.image}" alt="">
    <h2 class="font-bold text-3xl">${mobile.name} </h2>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, labore.</p>
    <h2><span class="font-extrabold">Storage: </span>${mobile?.mainFeatures?.storage}</h2>
    <h2><span class="font-extrabold">Display Size: </span>${mobile?.mainFeatures?.displaySize}</h2>
    <h2><span class="font-extrabold">Chip Set: </span>${mobile?.mainFeatures?.chipSet}</h2>
    <h2><span class="font-extrabold">Memory: </span>${mobile?.mainFeatures?.memory}</h2>
    <h2><span class="font-extrabold">Slug: </span>${mobile?.slug}</h2>
    <h2><span class="font-extrabold">Release Date: </span>${mobile?.releaseDate}</h2>
    <h2><span class="font-extrabold">Brand: </span>${mobile?.brand}</h2>
    <h2><span class="font-extrabold">GPS: </span>${mobile?.others?.GPS}</h2>

    `
    // modal for daysi ui 
    Details_Phone_modal.showModal()
}

// search button function 

function handelSearch(isShowAll) {
    toggleDataSpin(true)

    const searchField = document.getElementById('search-fild');
    const mySearch = searchField.value;
    phnHunter(mySearch, isShowAll);
}

const toggleDataSpin = (isLoading) => {
    const spinnerData = document.getElementById('load-data');
    if (isLoading) {
        spinnerData.classList.remove('hidden');
    }
    else {
        spinnerData.classList.add('hidden');
    }
}

// hamdel show all / see more 
const seeMore = () => {
    handelSearch(true);
}

phnHunter();