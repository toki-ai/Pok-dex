const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const apiURL = 'https://pokeapi.co/api/v2/'; 

let countClick = 0; 
let listTypes = [];
let autoLoad = true; 
const sumOfPokemon = 1302;
const sumOfTypes = 20; 

function colorOfCard(color){
    switch(color){
        case"normal":{
            return "rgb(220,220,208)";
        }
        case "fairy": {
            return "rgb(255,176,189)";
        }
        case "water": {
            return "rgb(20,185,236)";
        }
        case "grass": {
            return "rgb(179,239,0)";
        }
        case "electric": {
            return "rgb(255,223,10)";
        }
        case "psychic":{
            return "rgb(242,171,220)"
        }
        case "ice": {
            return "rgb(20,234,208)";
        }
        case "dragon":{
            return "rgb(80,120,220)";
        }
        case "dark": {
            return "rgb(13,148,136)";
        }
        case "steel":{
            return "rgb(170,197,230)";
        }
        case "unknown": {
            return "white";
        }
        case "shadow": {
            return "rgb(119,116,112)";
        }
        case "fire":{
            return "rgb(255,105,0)";
        }
        case "ghost":{
            return "rgb(160,140,255)";
        }
        case "bug":{
            return "rgb(69,199,70)";
        }
        case "rock": {
            return "rgb(180,140,100)";
        }
        case "ground":{
            return "rgb(247,186,71)";
        }
        case "poison":{
            return "rgb(170,200,240)";
        }
        case "flying":{
            return "rgb(118,216,250)";
        }
        case "fighting": {
            return "rgb(209,92,13)";
        }
    }
}

function createCard(data) {
    const container = document.getElementById('main');
    const card = document.createElement('div');
    const color = colorOfCard(data.types[0].type.name);
    const gradien = `linear-gradient(to top,${color} 20%, rgb(5,11,26) 60% )`;
    card.style.setProperty('background', gradien);
    card.classList = "pokemon-card remove";

    card.addEventListener('click', function(){
        renderDetailPage(data);
    });

    const imageBox = document.createElement('div');
    imageBox.className ='image-box';
    card.appendChild(imageBox);
    
    const imageElement = document.createElement('img');
    imageElement.className = 'pokemon-image';
    imageElement.src = data.sprites.front_default;
    imageBox.appendChild(imageElement);
    
    const idElement = document.createElement('h3');
    idElement.textContent = `#${data.id}`;
    card.appendChild(idElement);

    const nameElement = document.createElement('h2');
    nameElement.textContent = data.name;
    nameElement.className = "pokemon-name";
    card.appendChild(nameElement);

    const types = document.createElement('p');
    types.classList = "button--types";
    const leng = data.types.length;
    for (let i = 0; i < leng; i++){
        const type = document.createElement('span');
        type.textContent = data.types[i].type.name;
        const color = colorOfCard(data.types[i].type.name);
        type.classList = "button--type"; 
        type.style.setProperty("background-color", color);
        types.appendChild(type);
    }
    card.appendChild(types);
    container.appendChild(card);
}

function createDetailImg(data){
    const main = document.getElementById("main_specific");
    const specific_main = document.createElement("div");
    specific_main.classList = "specific_main";

    const backButton = document.createElement("div"); 
    backButton.className = "button--back"; 
    backButton.textContent = "🔙";
    backButton.addEventListener("click", function(event){
        event.preventDefault();
        window.location.href = "pokedex.html";
    })
    specific_main.appendChild(backButton);
    main.appendChild(specific_main);

    const imgE = document.createElement('img');
    imgE.className = "specific_img";
    imgE.src = data.sprites.other["official-artwork"].front_default;
    specific_main.appendChild(imgE);

    const idE = document.createElement('div');
    idE.className = "specific_id";
    idE.textContent = `#${data.id}`;
    const color = colorOfCard(data.types[0].type.name);
    idE.style.setProperty("background-color", color);
    specific_main.appendChild(idE);

    const namedE = document.createElement('div');
    namedE.className = "specific_name";
    const name = data.name;
    namedE.textContent = `${name.charAt(0).toUpperCase() + name.slice(1)}`;
    namedE.style.setProperty("background-color", color);
    specific_main.appendChild(namedE);
}

function createDetailStats(data){
    const main = document.getElementById("main_specific");
    const specific_stats = document.createElement("div"); 
    specific_stats.classList = "specific_stats";

    const inforTabale = document.createElement("div"); 
    inforTabale.classList = 'base_infomation';
    const baseI = document.createElement("div"); 
    baseI.classList = 'baseI';

    const heightInfor =document.createElement("p"); 
    heightInfor.innerHTML = `<span class = "nameInfor">Height</span></br><span class = "infor">${data.height}"</span>`;
    baseI.appendChild(heightInfor);

    const weightInfor =document.createElement("p"); 
    weightInfor.innerHTML = `<span class = "nameInfor">Weight</span></br><span class = "infor">${data.weight} lbs</span>`;
    baseI.appendChild(weightInfor);

    inforTabale.appendChild(baseI);
    const abiInfor = document.createElement("p");
    abiInfor.classList = 'abilities';
    abiInfor.innerHTML = `<span class = "nameInfor">Ability</span></br>`;
    const len = data.abilities.length;
    for (let i = 0; i < len; i++){
        const abi = document.createElement('span');
        const content = data.abilities[i].ability.name;
        abi.textContent = `${content.charAt(0).toUpperCase() + content.slice(1)}`;
        abi.classList = "ability"; 
        abiInfor.appendChild(abi);
    }
    inforTabale.appendChild(abiInfor);

    specific_stats.appendChild(inforTabale);

    const types = document.createElement("div");
    types.classList = `baseInfor_types`;
    const leng = data.types.length;
    for (let i = 0; i < leng; i++){
        const type = document.createElement('span');
        type.textContent = data.types[i].type.name;
        const color = colorOfCard(data.types[i].type.name);
        type.classList = "baseInfor_type"; 
        type.style.setProperty("background-color", color);
        types.appendChild(type);
    }
    specific_stats.appendChild(types);
    main.appendChild(specific_stats);
}

function createTypesButton(content, color){
    const child_className = 'filter_type';
    const parent_query = '.filter_types';

    const types = document.querySelector(parent_query);
    const buttonType = document.createElement("div");
    buttonType.className = child_className; 
    buttonType.textContent = content;
    const boder = `2px solid ${color}`;
    const shadow = `0 0 2px ${color}`
    buttonType.style.setProperty("border", boder);
    buttonType.style.setProperty("box-shadow", shadow); 
    buttonType.style.setProperty("color", color); 

    let isClicked = false; 
    buttonType.addEventListener("click", function(event){
        event.preventDefault(); 
        const maxClick = 2;
        if (!isClicked) {
            if (countClick < maxClick){
                this.style.setProperty("background-color", `${color}`);
                this.style.setProperty("color", 'black');
                countClick++; 
                listTypes.push(this.textContent);
                isClicked = !isClicked;
            } 
            else{
                alert(`${maxClick} is maximum!`);
            }
        } else {
            for (let i = 0; i < listTypes.length; i++){
                if (listTypes[i] == (this.textContent)){
                    this.style.setProperty("background-color", "transparent");
                    this.style.setProperty("color", `${color}`);
                    listTypes.splice(i, 1);
                    countClick--;
                    isClicked = !isClicked;
                }
            }
        }
    })
    types.appendChild(buttonType);
}

function displayNotFound(content = "Loading..."){
    const main = document.getElementById("main");
    const box = document.createElement("div"); 
    box.classList = "remove notFound";
    box.textContent = content;
    main.appendChild(box);
}

function removeCard(className){
    const card = document.querySelectorAll(className); 
    card.forEach(element => {
        element.style.setProperty("display", "none"); 
    });
}

function getListAPI(count = 1, option = 'all'){
    let apiUrl; 
    if (option == "all"){
        if (count > 0){
            count = count - 1;
            count = count * 20;
        } 
        apiUrl = `${apiURL}pokemon/?offset=${count}&limit=20`;
    }else if (option == "type"){
        apiUrl = `https://pokeapi.co/api/v2/type/`;
    }
    return fetch(apiUrl)
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

function getDataEachElement(apiURL){
    return fetch(apiURL)
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

function renderListCard(count = 1) {
    getListAPI(count, "all")
        .then(list => {
            const results = list.results;
            for (let i = 0; i < results.length; i++) {
                try {
                    const APIurl = results[i].url;
                    getDataEachElement(APIurl)
                        .then(data => {
                            createCard(data);
                        })
                } catch (error) {
                    console.error(`Error fetching Pokemon ID ${i + 1}: ${error.message}`);
                }
            }
        })
        .catch(error => {
            console.error(`Error fetching API data: ${error.message}`);
        });
}

function renderAll(){
    let index = 1;
    let isLoading = false; 
    let max = Math.floor(sumOfPokemon/20); 
    renderListCard(1);
    window.addEventListener("scroll", async function(event) {
        event.preventDefault();
        if(autoLoad == true){
            if (!isLoading && index <= max && window.scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
                isLoading = true; 
                index++;
                renderListCard(index);
                isLoading = false; 
            }
        }
    })  
}

function renderTypesButton(type){
    let color; 
    getListAPI(1, type)
        .then(data => {
            const count = data.count; 
            for (let i = 0; i <= count; i++){
                const content = data.results[i].name; 
                color = colorOfCard(content);
                createTypesButton(content, color);
            }
        })
        .catch(error => {
            console.error("Error fetching API data:", error);
        }); 
}

function renderDetailPage(data) {
    const cards = document.getElementById("main_inner"); 
    cards.style.setProperty("display", "none");
    createDetailImg(data); 
    createDetailStats(data);
} 

function searchID(input){
    removeCard(".remove");
    autoLoad = false; 
    const APIurl = `${apiURL}pokemon/${input}/`; 
            getDataEachElement(APIurl)
                .then(data => {
                    createCard(data);
                })
                .catch(e => {
                    console.error("Not Found", e);
                    displayNotFound("Not Found");
                }) 
}

function searchName(input){
    removeCard(".remove");
    autoLoad = false; 
    let count = 0; 
    let max = Math.floor(sumOfPokemon/20); 
    for (let i = 1; i <= max; i++){
        getListAPI(i, "all")
            .then(list => {
                for(let n = 0; n < list.results.length; n++){
                    const name = list.results[n].name;
                    if(name.includes(input)){
                        removeCard(".remove"); 
                        const APIurl = list.results[n].url;
                        getDataEachElement(APIurl)
                            .then(data => {
                                createCard(data);
                                count++;
                            })
                            .catch(error => {
                                console.error("Error fetching API data:", error);
                            })          
                    }
                }
            })
            .catch(error => {
                console.error("Error fetching API data:", error);
            }); 
    }
    if(count == 0){
        displayNotFound("Not Found");
    }
}

function searchBy(){
        const input = document.getElementById("searchBar_input").value; 
        if (input == ""){
            window.location.href = "pokedex.html";
        }else if(!isNaN(input)){
            searchID(input);
        }else{
            searchName(input);
        }
}

function sortEvolve(id){
    const divEvolve = document.getElementById(id);
    divEvolve.addEventListener('click', function() {
    const content = `-${(this.innerHTML).toLocaleLowerCase()}`;
    searchName(content);
    })
}

function countCommonElements(array1, array2) {
    var commonElements = array1.filter(element => array2.includes(element));
    return commonElements.length;
}

function filterType() {
    const leng = listTypes.length;
    let countR = 0;
    removeCard(".remove");
    autoLoad = false; 
    const max = Math.ceil(sumOfPokemon/ 20);
    for (let i = 1; i <= max; i++ ) {
        getListAPI(i, "all")
            .then(list => {
                for (let n = 0; n < list.results.length; n++) {
                    const APIurl = list.results[n].url;
                    getDataEachElement(APIurl)
                        .then(data => {
                            let dataTypes = [];
                            data.types.forEach(e => {
                                dataTypes.push(e.type.name);
                            });
                            const commonCount = countCommonElements(dataTypes, listTypes);
                            if (commonCount == leng) {
                                removeCard(".notFound");
                                countR++;
                                createCard(data);
                            }
                        })
                        .catch(error => {
                            console.error("Error fetching API data:", error);
                        });
                }
            })
            .catch(error => {
                console.error("Error fetching API data:", error);
            });
    }   
    if (countR == 0) {
        displayNotFound("Not Found");
    }
}

const search = document.getElementById("searchBar_submit");
    search.addEventListener("click", function(event){
        event.preventDefault();  
        searchBy();
})

const main = document.getElementById("button--filter"); 
const button = document.createElement("div"); 
button.textContent = "Filter"; 
button.classList = "button--filter button"; 
button.addEventListener("click", function(event){
    event.preventDefault(); 
    filterType();
})
main.appendChild(button);

renderAll();
renderTypesButton("type");
sortEvolve("mega");
sortEvolve("gmax");