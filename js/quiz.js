function getDataEachElement(){
    const id = Math.floor(Math.random() * 600) + 1;
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    return fetch(apiURL)
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

function changeContent(data){
    const contain = document.getElementById("ne"); 
    const imgne = document.createElement("img"); 
    imgne.classList = "img--random";
    imgne.src = data.sprites.other["official-artwork"].front_default;
    contain.appendChild(imgne);
}

function render(){
    getDataEachElement()
        .then(data => {
            changeContent(data);
            const name = data.name;
            const form = document.getElementById("quiz");
            form.addEventListener("submit", function(event){
                event.preventDefault(); 
                const input = (document.getElementById("quiz_input").value).toLowerCase(); 
                if (input == name){
                    const title = document.getElementById("title");
                    title.textContent = "Dum oi, doi qua!";
                    setTimeout(function(){
                        window.location.href = "index.html";
                    }, 1500);
                }
                else{
                    const title = document.getElementById("title");
                    title.textContent = "Sai roai!!!!";
                }
            })
            const hint = document.getElementById("hint");
            hint.addEventListener("click", function(event){
                event.preventDefault();
                const descibe = document.getElementById("descibe");
                descibe.textContent = `Hint ne: ${name.charAt(0).toUpperCase() + name.slice(1)}`;
            })
            const next = document.getElementById("next"); 
            next.addEventListener("click", function(event){ 
                event.preventDefault();
                window.location.href = "index.html";
            })
        })
        .catch(error => {
            console.error("Error fetching API data:", error);
        });   
}

render();