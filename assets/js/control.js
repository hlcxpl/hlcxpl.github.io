$(window).scroll(function(){
    if($("#nav").offset().top>500){
        $("#nav").addClass("navbar-black");
    }else{
        $("#nav").addClass("navbar-white");
    }  
});