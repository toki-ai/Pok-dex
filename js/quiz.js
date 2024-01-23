const APIurl = 'https://pokeapi.co/api/v2/';
const rightReply = 'Dum roi, doi qua!!'; 
const wrongReply = 'Sai roai...';
const hrefHomePage = 'index.html';

function getDataEachElement(){
    const id = Math.ceil(Math.random() * 600);
    const apiURL = `${APIurl}pokemon/${id}/`;
    return fetch(apiURL)
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

function changeImg(data){
    const contain = document.getElementById("randomImg"); 
    const imgne = document.createElement("img"); 
    imgne.classList = "img--random";
    imgne.src = data.sprites.other["official-artwork"].front_default;
    contain.appendChild(imgne);
}

function getResult(data){
    const name = data.name;
    const form = document.getElementById("quiz");
    form.addEventListener("submit", function(event){
        event.preventDefault(); 
        const input = document.getElementById("quiz_input").value; 
        const check = input.toLowerCase();
        const title = document.getElementById("title");
        if (check == name){
            title.textContent = rightReply;
            setTimeout(function(){
                window.location.href = hrefHomePage;
            }, 1500);
        }
        else{
            title.textContent = wrongReply;
        }
    })
}

function getHint(data){
    const name = data.name;
    const hint = document.getElementById("hint");
    hint.addEventListener("click", function(event){
        event.preventDefault();
        const descibe = document.getElementById("descibe");
        const result = `${name.charAt(0).toUpperCase() + name.slice(1)}`;
        descibe.textContent = `Hint: ${result}`;
    })
    const next = document.getElementById("next"); 
    next.addEventListener("click", function(event){ 
        event.preventDefault();
        window.location.href = hrefHomePage;
    })
}

function renderQuiz(){
    getDataEachElement()
        .then(data => {
            changeImg(data);
            getResult(data);
            getHint(data);
        })
        .catch(error => {
            console.error("Error fetching API data:", error);
        });   
}

renderQuiz();