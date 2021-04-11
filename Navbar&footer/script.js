const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", navToggle);

function navToggle() {
   navToggler.classList.toggle("active");
   const nav = document.querySelector(".nav-right");
   nav.classList.toggle("open");
   if(nav.classList.contains("open")){
       nav.style.maxHeight = nav.scrollHeight + "px";
   }
   else{
       nav.removeAttribute("style");
   }
} 

const submenuToggler = document.querySelector(".nav-toggler-submenu");
submenuToggler.addEventListener("click", submenuToggle);

function submenuToggle() {
   submenuToggler.classList.toggle("active");
   const submenu = document.querySelector(".sub-menu");
   submenu.classList.toggle("open");
   if(submenu.classList.contains("open")){
       submenu.style.maxHeight = submenu.scrollHeight + "px";
   }
   else{
         submenu.removeAttribute("style");
   }
} 





var menu=document.getElementById("menu-btn");
var xsubmenu=document.getElementById("submenu");
menu.addEventListener("mouseover", function (){const submenu=document.getElementById("submenu");
submenu.style.display="block";
xsubmenu.addEventListener("mouseover", function (){var submenu=document.getElementById("submenu");
submenu.style.display="block";});
xsubmenu.addEventListener("mouseleave", function (){var submenu=document.getElementById("submenu");
submenu.style.display="none";});
menu.addEventListener("mouseleave", function (){var submenu=document.getElementById("submenu");
submenu.style.display="none";
});
});

