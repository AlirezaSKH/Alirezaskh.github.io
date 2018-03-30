
$(document).ready(function(){

    $('#img01').css('src','https://www.google.org/assets/static/images/grantees/goodwill-industries/goodwill-industries-hero-2x-5b9f1c5015925c760f10f873b02edc13.jpg')
    // console.log('common');
    $('#find').on('click',(e)=>{
        console.log(e);
        e.preventDefault();

        let movieName=$('#movie-name').val();
        getMovies(movieName);
    })
});

function getMovies(movieName){
    // console.log("clicked");
    $('#movieList').empty();
    axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=585fd5a8&s=${movieName}`).
        then((response)=>{
            console.log(response.data.Search);
            let resultSearch=response.data.Search;
            $.each(resultSearch,function (i,val) {
                $('#movieList').append(
                    '<div '+
                    '<div class="row text-center">'+
                    '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-6">'+
                    '<div class="thumbnail"><img src='+val.Poster+' ' +
                    ' alt="Thumbnail Image 1" class="img-responsive">'+
                    '<div class="caption">'+
                    '<h3>'+val.Title+'</h3>'+


                    '<p><a href="http://www.imdb.com/title/'+val.imdbID+'" target="_blank"' +
                    ' class="btn btn-primary" role="button">' +
                    '<span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">' +
                    '</span>IMDB page</a></p>'+

                    '<p><a onclick="getMovieID(\''+val.imdbID+'\')" ' +
                    'href="client/movieDetail.html"'+
                    'target="_blank" class="btn btn-primary" role="button">' +
                    '<span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">' +
                    '</span> more...</a></p>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'
                );
            })
    }).catch((err)=>{
        console.log(err)
    })
}

function getMovieID(id){
    console.log(id);
    sessionStorage.setItem('imdbID',id);
    window.location='movieDetail.html';
}

function getMovieDetail() {

    let movieID=sessionStorage.getItem('imdbID');

    axios.get(`http://www.omdbapi.com/?i=${movieID}&apikey=585fd5a8`).
    then((response)=>{
        let movieDetails = response.data;
        // alert(movieDetails);
        $('#details').html(`<div id="pic">
           <img id="img" src="${movieDetails.Poster}"/>
           <text>${movieDetails.imdbRating}</text>
            </div>
            <h3>${movieDetails.Title}</h3>
            <h4>${movieDetails.Plot}</h4>
            </div>`
    )
    }).catch((err)=>{
        console.log(err)
    })

}