$(function() {
 
 $('#sidebar-call').click(function() {
     $('#call-widget').toggle('slide-down');
 })

 // Automatic tab selection
 var path = window.location.pathname;
 path = path.substring(0, path.length - 1);
 if(path) {
     $('.nav li').removeClass("active");
     $('.nav li a[href="'+ path +'"]').parent().addClass("active")
 }
    
})