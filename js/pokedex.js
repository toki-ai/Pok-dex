const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let listTypes = [];
let countClick = 0; 

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
    card.addEventListener('click', function() {
        showDetailPage(data);
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

function showDetailPage(data) {
    const main = document.getElementById("main_inner"); 
    main.style.setProperty("display", "none");
    console.log(data.name);
    const element = document.getElementById("main_specific");
    const nameElement = document.createElement('h2');
    nameElement.className = "displayCoi";
    nameElement.textContent = data.name;
    element.appendChild(nameElement);
} 

function createButton(content, color, parent_query, child_className, i){
    const types = document.querySelector(parent_query);
    const buttonType = document.createElement("div");
    buttonType.className = child_className; 
    const id = `${child_className}${i}`; 
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

function displayNotFound(){
    const main = document.getElementById("main");
    const box = document.createElement("div"); 
    box.classList = "removeN notFound";
    box.textContent = "Not Found";
    main.appendChild(box);
}

function removeCard(className){
    const cardDef = document.querySelectorAll(className); 
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

function getListByLocation(){
    getListAPI(1, "region")
        .then()
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
            const divMore = document.getElementById("button--more");
            const moreButton = document.createElement("div");
            moreButton.classList = "button--more remove button";
            moreButton.textContent = "More";
            divMore.appendChild(moreButton);

            let count = 1; 
            renderCard(count);

            moreButton.addEventListener("click", function(event){
                count++;
                event.preventDefault();
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
                createButton(content, color, parent_query, child_className, i);
            }
        })
        .catch(error => {
            console.error("Error fetching API data:", error);
        }); 
}

function searchBy(){
    const form = document.getElementById("searchBar");
    form.addEventListener("submit", function(event){
        event.preventDefault(); 
        const input = document.getElementById("searchBar_input").value; 
        let countFinding = 0;
        removeCard(".remove");
        removeCard(".removeN");
        if (input == ""){
            renderCardByCount();
        }
        else if (!isNaN(input)){
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
                    const max = (Math.ceil(list.count/ 20)) - 1;
                    for (let i = 1; i <= max; i++){
                        getListAPI(i, "all")
                            .then(sub => {
                                for(let n = 0; n <20; n++){
                                    const name = sub.results[n].name;
                                    if(name.includes(input)){
                                        const apiURL = sub.results[n].url;
                                        removeCard(".remove");
                                        removeCard(".removeN");
                                        getDataEachElement(apiURL)
                                        .then(data => {
                                            createCard(data);
                                            countFinding++;
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
                    if(countFinding == 0){
                        displayNotFound();
                    }
                })
                .catch(error => {
                    console.error("Error fetching API data:", error);
                });   
        }
    })
}

function sortEvolve(id){
    var myDiv = document.getElementById(id);
    if (myDiv) {
        myDiv.addEventListener('click', function() {
            const content = `-${(this.innerHTML).toLocaleLowerCase()}`;
            console.log(content)
            getListAPI(1,"all")
                .then(list =>{
                    const max = (Math.ceil(list.count/ 20)) - 1;
                    for (let i = 1; i <= max; i++){
                        getListAPI(i, "all")
                            .then(sub => {
                                for(let n = 0; n <20; n++){
                                    const name = sub.results[n].name;
                                    if(name.includes(content)){
                                        const apiURL = sub.results[n].url;
                                        removeCard(".remove");
                                        removeCard(".removeN");
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
        });
    }
}

function countCommonElements(array1, array2) {
    var commonElements = array1.filter(element => array2.includes(element));
    return commonElements.length;
  }

function filterType(){
    const main = document.getElementById("button--filter"); 
    const button = document.createElement("div"); 
    button.textContent = "Filter"; 
    button.classList = "button--filter button"; 
    button.addEventListener("click", function(event){
        event.preventDefault();
        const leng = listTypes.length; 
        let countR = 0;
        removeCard(".remove");
        removeCard(".removeN");
        getListAPI(1,"all")
        .then(list =>{
            const max = (Math.ceil(list.count/ 20)) - 1;
            for (let i = 1; i <= max; i++){
                getListAPI(i, "all")
                    .then(sub => {
                        removeCard(".removeN");
                        for(let n = 0; n <20; n++){
                            const apiURL = sub.results[n].url;
                            getDataEachElement(apiURL)
                                .then(data => {
                                    let dataTypes = [];
                                    data.types.forEach(e => {
                                        dataTypes.push(e.type.name);
                                    })
                                    const commonCount = countCommonElements(dataTypes, listTypes);
                                    if (commonCount == leng){
                                        countR++;
                                        createCard(data);
                                    } 
                                })
                                .catch(error => {
                                    console.error("Error fetching API data:", error);
                                })        
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching API data:", error);
                    })
            }
            if(countR == 0){
                displayNotFound();
            }
        })
        .catch(error => {
            console.error("Error fetching API data:", error);
        });   
    })
    main.appendChild(button);
}

renderCardByCount();
renderButton("type", "white", ".filter_types", "filter_type");
searchBy();
filterType();
sortEvolve("mega");
sortEvolve("gmax");