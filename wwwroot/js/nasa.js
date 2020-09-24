function search(q) {
    $.ajax({
        
        url: "https://images-api.nasa.gov/search?q=" + q, 
        success: function (whatyougot) {
            document.getElementById("img").innerHTML = "<img src=" + whatyougot.collection.items[0].links[0].href + " />";
        }

    })
}