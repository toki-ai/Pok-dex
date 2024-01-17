const regionAPI = `https://pokeapi.co/api/v2/region/`;
const typeAPI = `https://pokeapi.co/api/v2/type/`;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

//display-------------------------------------------------------------
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
    card.classList = "pokemon-card remove";

    const imageBox = document.createElement('div');
    imageBox.className ='image-box';
    if(data.types.length == 1){
        const color = colorOfCard(data.types[0].type.name);
        imageBox.style.setProperty('background-color', color);
    }else{
        const color = colorOfCard(data.types[0].type.name);
        const color2 = colorOfCard(data.types[1].type.name);
        const gradien = `linear-gradient(45deg, ${color} 10%, ${color2}) 90%`;
        imageBox.style.setProperty('background', gradien);
    }
    card.appendChild(imageBox);
    
    const imageElement = document.createElement('img');
    imageElement.className = 'pokemon-image';
    imageElement.src = data.sprites.front_default;
    imageBox.appendChild(imageElement);
    
    const idElement = document.createElement('h3');
    idElement.textContent = data.id;
    card.appendChild(idElement);

    const nameElement = document.createElement('h2');
    nameElement.textContent = data.name;
    card.appendChild(nameElement);
    const typesElement = document.createElement('p');
    typesElement.textContent = 'Types: ' + data.types.map(type => type.type.name).join(', ');
    card.appendChild(typesElement);

    container.appendChild(card);
}

function createButton(content, color, parent_query, child_className){
    const types = document.querySelector(parent_query);
    const buttonType = document.createElement("button");
    buttonType.className = child_className; 

    buttonType.textContent = content;
    const boder = `2px solid ${color}`;
    const shadow = `0 0 2px ${color}`
    buttonType.style.setProperty("border", boder);
    buttonType.style.setProperty("box-shadow", shadow); 
    buttonType.style.setProperty("color", color); 

    types.appendChild(buttonType);
}

function displayNotFound(){
    const main = document.getElementById("main");
    const box = document.createElement("div"); 
    box.className = "remove";
    box.textContent = "NotFound";
    main.appendChild(box);
}

function removeCard(){
    const cardDef = document.querySelectorAll(".remove"); 
        cardDef.forEach(element => {
            element.style.setProperty("display", "none"); 
        });
}

//fetch API---------------------------------------------------------------------
function getListAPI(count = 1, option){
    let apiUrl;
    if (option == "all"){
        if (count > 0){
            count = count - 1;
            count = count * 20;
        } 
        apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${count}&limit=20`;}
    else if (option == "type"){
        apiUrl = `https://pokeapi.co/api/v2/type/`;
    }
    else if (option == "region"){
        apiUrl = `https://pokeapi.co/api/v2/region/`;
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

//Render------------------------------------------------------------------------
function renderCard(count) {
    getListAPI(count, "all")
        .then(list => {
            const results = list.results;
            (async () => {
                for (let i = 0; i < results.length; i++) {
                    try {
                        const APIurl = results[i].url;
                        getDataEachElement(APIurl)
                            .then(data => {
                                createCard(data);
                            });
                        await delay(100);
                    } catch (error) {
                        console.error(`Error fetching Pokemon ID ${i + 1}: ${error.message}`);
                    }
                }
            })();
        })
        .catch(error => {
            console.error(`Error fetching API data: ${error.message}`);
        });
}

function renderCardByCount() {
    getListAPI(1, "all")
        .then(list => {
            const maxCount = Math.ceil(list.count/ 20);
            const divMore = document.getElementById("more_button");
            const moreButton = document.createElement("div");
            moreButton.classList = "moreButton remove";
            moreButton.textContent = "More";
            divMore.appendChild(moreButton);

            let count = 1; 
            renderCard(count);

            moreButton.addEventListener("click", function(){
                count++;
                if (count <= maxCount){
                    renderCard(count);
                }
            }) 
        })
        .catch(error => {
            console.error("Error fetching API data:", error);
        });   
}

function renderButton(type, color, parent_query, child_className){
    getListAPI(1, type)
        .then(data => {
            const count = data.count; 
            for (let i = 0; i <= count; i++){
                const content = data.results[i].name; 
                if(type == "type"){
                    color = colorOfCard(content);
                }
                createButton(content, color, parent_query, child_className);
            }
        })
}

function searchBy(){
    const form = document.getElementById("searchBar");
    form.addEventListener("submit", function(event){
        event.preventDefault(); 
        const input = document.getElementById("searchBar_input").value;
        removeCard();
        if (!isNaN(input)){
            const id = input; 
            const apiURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
                        getDataEachElement(apiURL)
                            .then(data => {
                                createCard(data);
                            })
                            .catch(error => {
                                console.error("Not Found");
                                displayNotFound();
                            })       
        } else{
            getListAPI(1,"all")
                .then(list =>{
                    const max = Math.ceil(list.count/ 20);
                    for (let i = 1; i <= max; i++){
                        getListAPI(i, "all")
                            .then(sub => {
                                for(let n = 0; n <20; n++){
                                    const name = sub.results[n].name;
                                    if(name.includes(input)){
                                        const apiURL = sub.results[n].url;
                                        getDataEachElement(apiURL)
                                        .then(data => {
                                            createCard(data);
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
                })
                .catch(error => {
                    console.error("Error fetching API data:", error);
                });   
        }
    })
}

//call--------------------------------------------------------------------------
renderCardByCount();
renderButton("type", "white", ".filter_types", "filter_type");
renderButton("region", "white", ".filter_places", "filter_place");
searchBy();




