$(document).ready(function (){
    //api key pentru youtube
    var API_KEY = "AIzaSyDRGX2tdXnF8ZRou4wX3RGiuGiHxkZ8BpI"

    var video = ''

    

    $("#form").submit(function (event){

        event.preventDefault()


        
        var search = $("#search").val()

        videoSearch(API_KEY,search,10)

    })

    function videoSearch(key, search, maxResults) {


        //link de cautat pe youtube, key =api key si maxResults = numarul de video-uri care se afiseaza pe pagina
        $.get("https://www.googleapis.com/youtube/v3/search?&key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function (data) {
            console.log(data)

            data.items.forEach(item => {

                video = `
                <iframe width="420" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder ="0" class="border border-secondary" allowfullscreen></iframe>`

                $("#videos").append(video)
            })
        })

   
    }


})