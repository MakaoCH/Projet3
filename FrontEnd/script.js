 
 //Ajout des filtres//

fetch ('http://localhost:5678/api/categories')
.then(reponse => reponse.json())
.then(body => {
  
    const categories = body;

    const boutonTous = document.querySelector(".tous");
    boutonTous.addEventListener ("click", function () {
      const filtresTous = categories.filter(nom => nom.id !== 0)
      console.log(filtresTous);        
    });   
    const boutonObjet = document.querySelector(".objets");
    boutonObjet.addEventListener ("click", function () {
      const filtresObjets = categories.filter(nom => nom.id === 1)
      console.log(filtresObjets); 
             
    });
    const boutonAppt = document.querySelector(".appartements");
    boutonAppt.addEventListener ("click", function () {
      const filtresAppt = categories.filter(nom => nom.id === 2)
      console.log(filtresAppt);        
    });
    const boutonHotelResto = document.querySelector(".hotelresto");
    boutonHotelResto.addEventListener ("click", function () {
      const filtresHotelResto = categories.filter(nom => nom.id === 3)
      console.log(filtresHotelResto);        
    });
  });

 //Ajout des travaux//
 
 fetch ('http://localhost:5678/api/works')
  .then(reponse => reponse.json())
  .then(body => {

    
    for (let i = 0; i < body.length; i++) {

    const works = body[i];

    const fiche = document.createElement("figure");

    const images = document.createElement ("img");
    images.src = works.imageUrl;

    const titre = document.createElement("p");
    titre.innerText = works.title;

    const mesProjets =  document.querySelector (".gallery");
   
    mesProjets.appendChild(fiche);

    fiche.appendChild(images);
    fiche.appendChild(titre);
    }
  });

