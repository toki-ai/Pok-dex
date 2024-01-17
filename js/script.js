function searchBy (){
    const form = document.getElementById("search_bar");
    form.addEventListener("submit", function(event){
        event.preventDefault(); 
        const input = document.getElementById("search_input").value;
        console.log(input); 
    })
}

searchBy();