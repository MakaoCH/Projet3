 //Ajout des travaux//

const works = await fetch ('http://localhost:5678/api/works').then(reponse => reponse.json());

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
  
 //Ajout des filtres//
  
 
  const boutonTous = document.querySelector("#btn-tous");
    boutonTous.addEventListener ("click", function () {
    const filtresTous = works.filter(nom => nom.categoryId !== 0)
    console.log(filtresTous);        
  });   
  const boutonObjet = document.querySelector("#btn-objets");
    boutonObjet.addEventListener ("click", function () {
    const filtresObjets = works.filter(nom => nom.categoryId === 1)
    console.log(filtresObjets);      
  });
  const boutonAppt = document.querySelector("#btn-appartements");
    boutonAppt.addEventListener ("click", function () {
    const filtresAppt = works.filter(nom => nom.categoryId === 2)
    console.log(filtresAppt);        
  });
  const boutonHotelResto = document.querySelector("#btn-hotelresto");
    boutonHotelResto.addEventListener ("click", function () {
    const filtresHotelResto = works.filter(nom => nom.categoryId === 3)
    console.log(filtresHotelResto);        
  });
    
   
//const filtres = fetch ('http://localhost:5678/api/categories')//
 //.then(reponse => reponse.json())//
  //.then(body => {//