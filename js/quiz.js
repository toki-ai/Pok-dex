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
    imgne.src = data.sprites.front_default;
    contain.appendChild(imgne);
}

function render(){
    getDataEachElement()
        .then(data => {
            changeContent(data);
        })
        .catch(error => {
            console.error("Error fetching API data:", error);
        });   
}

render();