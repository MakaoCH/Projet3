
 //Ajout des travaux//

 const works = await fetch ('http://localhost:5678/api/works').then(reponse => reponse.json());


 function genererWorks(works) {
    const mesProjets = document.querySelector (".gallery");
    mesProjets.innerHTML = "";
     for (let i = 0; i < works.length; i++) {
 
     const fiche = document.createElement("figure");
     const images = document.createElement ("img");
     images.src = works[i].imageUrl;
     images.setAttribute("crossorigin", "anonymous");
     const titre = document.createElement("p");
     titre.innerText = works[i].title;
     
         
     mesProjets.appendChild(fiche);
 
     fiche.appendChild(images);
     fiche.appendChild(titre);     
     }
     }
     
// Premier affichage de la page
 genererWorks(works);

   //Ajout des filtres//

const filtres = await fetch ('http://localhost:5678/api/categories').then(reponse => reponse.json());

function genererFiltres(categories) {

  const btnTous = document.createElement("button");
  const nomBtnTous = document.createElement("p");
  nomBtnTous.innerText = "Tous";
  const mesFiltres = document.querySelector(".filtres");
  mesFiltres.appendChild(btnTous);
  btnTous.appendChild(nomBtnTous);

for (let i = 0; i < categories.length; i++) {

  const btnFiltre = document.createElement("button");
  const nomBtn = document.createElement("p")
  nomBtn.innerText = categories[i].name;
  mesFiltres.appendChild(btnFiltre)
       
  btnFiltre.appendChild(nomBtn);  

  btnFiltre.addEventListener("click", function() {
  const categoryId = categories[i].id;
  const filteredWorks = works.filter(work => work.categoryId === categoryId);
  genererWorks(filteredWorks);

  btnTous.addEventListener ("click", function () {
  const filtresTous = works.filter(id => id.categoryId !== 0)
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(filtresTous);  
  });  
  });
}};
genererFiltres(filtres)

    
 
   //changement d'apparence index.html à la connexion

   const changementApparence = document.querySelector(".mode-edition")
   
   if (sessionStorage.getItem("token")) {
      changementApparence.classList.toggle("visible")
      console.log(changementApparence)
   }

   const loginLogout = document.querySelector("#logout")
   
   if (sessionStorage.getItem("token")) {
      loginLogout.classList.toggle("visible-logout")
   }

   const logoutLogin = document.querySelector(".login")
   
   if (sessionStorage.getItem("token")) {
      logoutLogin.classList.toggle("visible-login")
   }

   const btnModifier = document.querySelector(".btn-modifier")
   
   if (sessionStorage.getItem("token")) {
      btnModifier.classList.toggle("visible-btn")
   }

   const btnDeux = document.querySelector("#btn-deux")
   
   if (sessionStorage.getItem("token")) {
      btnDeux.classList.toggle("visible-btn")
   }

   const btnTrois = document.querySelector("#btn-trois")
   
   if (sessionStorage.getItem("token")) {
      btnTrois.classList.toggle("visible-btn")
   }
   const filtresLogin = document.querySelector(".filtres")
   
   if (sessionStorage.getItem("token")) {
      filtresLogin.classList.toggle("visible-filtres")
   }



  //suppression token à la déconnexion
 
  const logout = document.querySelector("#logout");
  logout.addEventListener("click", function () {
  window.sessionStorage.removeItem("token");
  window.location.href = "login.html";
   });
  
  //modal
const openModal = function (e) {
   e.preventDefault()
   const target = document.querySelector(e.target.getAttribute("data-id"))
   target.style.display = null
   target.removeAttribute('aria-hidden')
   target.setAttribute('aria-modal', 'true')
}

  document.querySelectorAll('.btn-modifier').forEach(a => {
   a.addEventListener('click', openModal)
   
  })
  