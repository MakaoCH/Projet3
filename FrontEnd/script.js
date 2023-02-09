
 //Ajout des travaux//

 const works = await fetch ('http://localhost:5678/api/works').then(reponse => reponse.json());


 function genererWorks(works) {
     for (let i = 0; i < works.length; i++) {
 
     const fiche = document.createElement("figure");
     const images = document.createElement ("img");
     images.src = works[i].imageUrl;
     images.setAttribute("crossorigin", "anonymous");
     const titre = document.createElement("p");
     titre.innerText = works[i].title;
     const mesProjets =  document.querySelector (".gallery");
    
     mesProjets.appendChild(fiche);
 
     fiche.appendChild(images);
     fiche.appendChild(titre);
     }
     }
 // Premier affichage de la page
 genererWorks(works);
   
  //Ajout des filtres//
 
  
   const boutonTous = document.querySelector("#btn-tous");
     boutonTous.addEventListener ("click", function () {
     const filtresTous = works.filter(id => id.categoryId !== 0)
     
     document.querySelector(".gallery").innerHTML = "";
     genererWorks(filtresTous);  
 
   });  
 
   const boutonObjet = document.querySelector("#btn-objets");
     boutonObjet.addEventListener ("click", function () {
     const filtresObjets = works.filter(id => id.categoryId === 1)   
 
     document.querySelector(".gallery").innerHTML = "";
     genererWorks(filtresObjets);
   });
 
 
   const boutonAppt = document.querySelector("#btn-appartements");
     boutonAppt.addEventListener ("click", function () {
     const filtresAppt = works.filter(id => id.categoryId === 2)
    
     document.querySelector(".gallery").innerHTML = "";
     genererWorks(filtresAppt);       
   });
 
   const boutonHotelResto = document.querySelector("#btn-hotelresto");
     boutonHotelResto.addEventListener ("click", function () {
     const filtresHotelResto = works.filter(id => id.categoryId === 3)
   
     document.querySelector(".gallery").innerHTML = "";
     genererWorks(filtresHotelResto);       
   });

   //changement d'apparence index.html à la connexion

   const changementApparence = document.querySelector(".changements")
   
   if (localStorage.getItem("token")) {
      changementApparence.classList.toggle("visible")
      console.log(changementApparence)
   }

   const loginLogout = document.querySelector("#logout")
   
   if (localStorage.getItem("token")) {
      loginLogout.classList.toggle("visible-logout")
   }

   const logoutLogin = document.querySelector(".login")
   
   if (localStorage.getItem("token")) {
      logoutLogin.classList.toggle("visible-login")
   }


  //suppression token à la déconnexion
 
  const logout = document.querySelector("#logout");
  logout.addEventListener("click", function () {
  window.localStorage.removeItem("token");
  window.location.href = "login.html";
   });
  
  
  