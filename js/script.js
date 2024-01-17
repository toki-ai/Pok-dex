function searchBy (){
    const form = document.getElementById("searchBar");
    form.addEventListener("submit", function(event){
        event.preventDefault(); 
        const input = document.getElementById("searchBar_input").value;
        console.log(input); 
    })
}

searchBy();