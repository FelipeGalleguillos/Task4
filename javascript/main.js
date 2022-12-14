const cardCont = document.getElementById('card-container');
const fragment = document.createDocumentFragment();
const checkCont = document.getElementById('chkCont');
const searchBar = document.getElementById('searchSection');
const events = data.events;
const chkCat = categories;
let filteredCat = []

console.log(cardsFiltered(events,filteredCat))
renderCards(textFilter(cardsFiltered(events,filteredCat),searchBar.value.toLowerCase().trim()))
////////////////////////////////////////////////////////////////////////////
chkCat.forEach(element => {
    checkCont.innerHTML += `<div>
                            <input type="checkbox" id="${element}" name="" value="${element}">
                            <label class="checks" for="${element}">${element}</label>
                            </div>
    `
});
////////////////////////////////////////////////////////////////////////////
function addCategory(category){
    filteredCat.push(category)
} 
////////////////////////////////////////////////////////////////////////////
function deleteCategory(category){
    filteredCat.forEach(element =>{
        if (element == category) {
            filteredCat.splice(filteredCat.indexOf(element),1)
        }
    })
}
///////////////////////////////////////////////////////////////////////////
function textFilter(array,text){
    if (text.length == 0) {
        return array
    } else {
        return array.filter(element=>element.name.toLowerCase().includes(text) || element.description.toLowerCase().includes(text))
    }
}
//////////////////////////////////////////////////////////////////////////////

function cardsFiltered(events,categories){ //returns array with objects filtered by category
    if (categories.length == 0) {
        return events
    } else {
        let aux1 = []
        let aux2,aux3
        categories.forEach(category => {
            aux3 = events.filter(element=>element.category == category)
            aux1 = aux1.concat(aux3)
        })
        aux2 = Array.from(new Set(aux1))
        return aux2
    }
}
///////////////////////////////////////////////////////////////////////////////
function renderCards(events){
    console.log(events)
    cardCont.innerHTML=""
    if (events.length == 0) {
        cardCont.innerHTML=`<h3>No events to show....</h3>`
    }else{

        for (let cardInfo of events) {
            const card = document.createElement('div');
            card.classList.add('card', 'text-bg-danger', 'cardAnim');
            card.style.width = '18rem';
            card.style.height = '25rem';
            card.innerHTML = `<img src="${cardInfo.image}"class="card-img-top h-50" alt="..."></img>
                <div class="card-body">
                    <h5 class="card-title">${cardInfo.name}</h5>
                    <p class="card-text">${cardInfo.description}</p>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-between">
                        <p>$${cardInfo.price}</p>
                        <a id="" href="./details.html?id=${cardInfo._id}" class="btn btn-primary">See more</a>
                    </div>
                </div>
                `
            fragment.appendChild(card);
        }        
        cardCont.appendChild(fragment);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////
checkCont.addEventListener("click",(e)=>{
    if(e.target.checked){
        addCategory(e.target.value)
        renderCards(textFilter(cardsFiltered(events,filteredCat),searchBar.value.toLowerCase().trim()))
    }else{
        deleteCategory(e.target.value)
        renderCards(textFilter(cardsFiltered(events,filteredCat),searchBar.value.toLowerCase().trim()))
    }
})
/////////////////////////////////////////////////////////////////////////////////
searchBar.addEventListener("keyup",()=>{
    renderCards(textFilter(cardsFiltered(events,filteredCat),searchBar.value.toLowerCase().trim()))
})

// cardCont.addEventListener("click",(e)=>{

// })



/* <div class="card h-100 text-bg-danger" style="width: 15rem;">
    <img src="./assets/Feria_de_comidas7.jpg" class="card-img-top" alt="..."></img>
        <div class="card-body">
            <h5 class="card-title">Festival of the colectivities</h5>
            <p class="card-text">Enjoy your favorite dishes from different countries in a unique event for the whole family.</p>
        </div>
        <div class="card-footer">
            <div class="d-flex justify-content-between">
                <p>$5</p>
                <a href="#" class="btn btn-primary">See more</a>
            </div>
        </div>
</div> */