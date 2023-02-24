// Récupération des données des travaux à partir de l'API locale
const works = await fetch ('http://localhost:5678/api/works').then(reponse => reponse.json());

async function genererWorks(works) {

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

// Appel de la fonction "genererWorks" pour afficher les travaux sur la page lors du premier chargement
genererWorks(works);


//----------------------------------------------Ajout des filtres---------------------------------------------//

// Récupération des données des catégories à partir de l'API locale
const filtres = await fetch ('http://localhost:5678/api/categories').then(reponse => reponse.json());

// Fonction pour générer les filtres de catégorie dans la page
function genererFiltres(categories) {

  // Création d'un bouton "Tous" pour afficher tous les travaux
  const btnTous = document.createElement("button");
  const nomBtnTous = document.createElement("p");
  nomBtnTous.innerText = "Tous";

  // Sélection de l'élément HTML où les filtres seront affichés
  const mesFiltres = document.querySelector(".filtres");

  // Ajout du bouton "Tous" à la page
  mesFiltres.appendChild(btnTous);
  btnTous.appendChild(nomBtnTous);

  // Boucle à travers chaque catégorie dans le tableau de catégories récupéré à partir de l'API
  for (let i = 0; i < categories.length; i++) {

    const btnFiltre = document.createElement("button");
    const nomBtn = document.createElement("p")
    nomBtn.innerText = categories[i].name;

    mesFiltres.appendChild(btnFiltre)          
    btnFiltre.appendChild(nomBtn);  
    btnFiltre.addEventListener("click", function() {

      // Récupération de l'ID de la catégorie sélectionnée
      const categoryId = categories[i].id;
      const filteredWorks = works.filter(work => work.categoryId === categoryId);

      genererWorks(filteredWorks);

      // Ajout d'un écouteur d'événement sur le bouton "Tous" pour réinitialiser l'affichage de la galerie
      btnTous.addEventListener ("click", function () {

        const filtresTous = works.filter(id => id.categoryId !== 0)
        document.querySelector(".gallery").innerHTML = "";

        genererWorks(filtresTous);  
      });  
    });
  }
}

// Appel de la fonction "genererFiltres" pour afficher les filtres de catégorie sur la page
genererFiltres(filtres)


//changement d'apparence index.html à la connexion

const elements = document.querySelectorAll('.mode-edition, #logout, .login, .btn-modifier, #btn-deux, #btn-trois, .filtres');

  if (sessionStorage.getItem('token')) {
  elements.forEach(element => element.classList.toggle('visible'));
}
  
//suppression token à la déconnexion
 
const logout = document.querySelector("#logout");
  logout.addEventListener("click", function () {
  window.sessionStorage.removeItem("token");
  window.location.href = "login.html";
});
  
//--------------------------Modal1----------------------------------//

let modal = null

// Fonction pour ouvrir la modal
const openModal = function (e) {
   e.preventDefault()  
   const target = document.querySelector(e.target.getAttribute("href")) 
   target.style.display = null 
   target.removeAttribute('aria-hidden')  
   target.setAttribute('aria-modal', 'true') 
   modal = target 
   modal.addEventListener("click", closeModal)  
   modal.querySelector(".js-close-modal").addEventListener("click", closeModal)  
   modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)  
} 

// Fonction pour fermer la modal
const closeModal = function (e) {
   if (modal === null) return  
   e.preventDefault() 
   window.setTimeout(function () {
    modal.style.display = "none"  
    modal = null  
   }, 500) 
   modal.setAttribute('aria-hidden', 'true') 
   modal.removeAttribute('aria-modal')  
   modal.removeEventListener("click", closeModal) 
   modal.querySelector(".js-close-modal").removeEventListener("click", closeModal)  
   modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)   
}

// Fonction pour empêcher la propagation du clic sur la modal
const stopPropagation = function (e) {
  e.stopPropagation()  // Empêcher la propagation du clic sur la modal
}

// Ajouter un événement de clic pour chaque bouton "modifier" dans la page
document.querySelectorAll('.btn-modifier').forEach(a => {
  a.addEventListener('click', openModal) 
})



//------------------ Galeries modal suprression---------------------//

const worksUrl = 'http://localhost:5678/api/works';
const token = sessionStorage.getItem('token');

const deleteImage = async (id) => {
  const response = await fetch(`${worksUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('La réponse du réseau n\'était pas correcte');
  }
};

const worksModal = await fetch(worksUrl).then((response) => response.json());
console.log(worksModal)

const modalParent = document.querySelector('.modal');
modalParent.addEventListener('click', () => {
});

async function genererWorksModal(worksModal) {
  const mesProjetsModal = document.querySelector('.gallery-modal');
  mesProjetsModal.innerHTML = '';

  for (let i = 0; i < worksModal.length; i++) {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');

    const image = document.createElement('img');
    image.src = worksModal[i].imageUrl;
    image.setAttribute('crossorigin', 'anonymous');

    const titre = document.createElement('p');
    titre.innerText = 'éditer';

    if(i === 0) {
    const fourArrow = document.createElement('button-arrow');
    fourArrow .innerHTML = '<i class="fa fa-thin fa-arrows-up-down-left-right"></i>';
    fourArrow.classList.add('fourArrow');
    imageWrapper.appendChild(fourArrow)
    }

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can fa-xs"></i>';
    deleteButton.classList.add('delete-button');

    deleteButton.addEventListener('click', async () => {
      try {
        const index = worksModal.findIndex((element) => element.id === worksModal[i].id);
        if (index !== -1) {
          await deleteImage(worksModal[i].id);
          worksModal.splice(index, 1);
          imageWrapper.remove();
          alert('L\'image a été supprimée avec succès')
          // Récupération des données mises à jour
          const updatedWorks = await fetch('http://localhost:5678/api/works').then(reponse => reponse.json());

           // Mise à jour de l'affichage avec les données mises à jour
          genererWorks(updatedWorks);          
          }
      } catch (error) {
        console.error('Erreur suppression image :', error);
      }
    });

    const deleteGalleryButton = document.getElementById('delete-gallery');
    deleteGalleryButton.addEventListener('click', async () => {
      try {
        const imageWrappers = document.querySelectorAll('.image-wrapper');
        for (let j = 0; j < imageWrappers.length; j++) {
          const id = worksModal[j].id;
          await deleteImage(id);
          imageWrappers[j].remove();
        }
      } catch (error) {
        console.error('Erreur suppression de toutes les images:', error);
      }
    });

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(deleteButton);
    imageWrapper.appendChild(titre);
    mesProjetsModal.appendChild(imageWrapper);
  }
}

genererWorksModal(worksModal);


//----------------------------modal2-------------------------------//
let modalAjout = null

const openModalDeux = function (e) {
   e.preventDefault()
   const target = document.querySelector(e.target.getAttribute("href"))
   target.style.display = null
   target.removeAttribute('aria-hidden')
   target.setAttribute('aria-modal', 'true')
   modalAjout = target
   modalAjout.addEventListener("click", closeModalDeux)
   modalAjout.querySelector(".js-close-modal2").addEventListener("click", closeModalDeux) 
   modalAjout.querySelector(".js-going-back").addEventListener("click", closeModalDeux) 
   modalAjout.querySelector(".js-modal-stop").addEventListener("click", stopPropagationDeux) 
}

const closeModalDeux = function (e) {
   if (modalAjout === null) return
   e.preventDefault()
   window.setTimeout(function () {
    modalAjout.style.display = "none"
    modalAjout = null
   }, 500)
   modalAjout.setAttribute('aria-hidden', 'true')
   modalAjout.removeAttribute('aria-modal')
   modalAjout.removeEventListener("click", closeModalDeux)
   modalAjout.querySelector(".js-close-modal2").removeEventListener("click", closeModalDeux) 
   modalAjout.querySelector(".js-going-back").removeEventListener("click", closeModalDeux) 
   modalAjout.querySelector(".js-modal-stop").removeEventListener("click", stopPropagationDeux) 

   form.reset();
   imagePreviewModal.style.display = 'none';
   textAjoutPhoto.style.display = 'flex';
}

const stopPropagationDeux = function (e) {
   e.stopPropagation()
}

document.querySelectorAll('#ajout-photo').forEach(a => {
   a.addEventListener('click', openModalDeux) 
})

// sélectionner la croix de la deuxième modale
const closeTwoModal = document.querySelector('#modal2 .js-close-modal2');

// ajouter un événement de clic
closeTwoModal.addEventListener('click', function() {
// fermer les deux modales
const modal1 = document.querySelector('#modal1');
const modal2 = document.querySelector('#modal2');
modal1.style.display = 'none';
modal2.style.display = 'none';
});


//---------------------galeries modal ajout--------------------------------------//

// Récupération de la modal
const modal2 = document.querySelector('#modal2');

// Création du formulaire
const form = modal2.querySelector('form');

// Récupération de l'id de l'utilisateur
const userId = 1;

// Récupération des catégories via l'API
const getCategories = async () => {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    // Création du choix en liste des catégories
    const select = form.querySelector('select[name="category"]');
    categories.forEach(category => {
      const option = document.createElement('option');
      option.setAttribute('value', category.id);
      option.textContent = category.name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
};
getCategories();


// Soumission du formulaire en utilisant la méthode POST avec l'API
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  
  // Validation des données
  const image = formData.get('image');
  const title = formData.get('title');
  const category = formData.get('category');
  if (!image || !title || !category) {
    alert('Veuillez remplir tous les champs requis');
    return;   
  }
  try {
    const data = await createWork(title, image, category);
    alert('L\'image a été chargée avec succès')
    console.log(data);
    
    // Réinitialisation du formulaire
    form.reset();
    imagePreviewModal.style.display = 'none';
    textAjoutPhoto.style.display = 'flex';
    buttonValider.style.backgroundColor = '#aaa';
    
  } catch (error) {
    console.error(error);
    alert('Échec de l\'enregistrement du travail');
  }
});

// Sélection de l'élément input pour l'image
const imageInput = document.getElementById('image');
const imagePreviewModal = document.getElementById('image-modal-preview')
const textAjoutPhoto = document.getElementById('text-ajout-photo')
const buttonValider = document.getElementById('button-valider')


// Écouteur d'événements pour l'image
imageInput.addEventListener('change', previewPicture);

// Fonction pour prévisualiser l'image sélectionnée
function previewPicture(event) {
  const reader = new FileReader();
  reader.onload = function(){
    const output = document.getElementById('image-modal-preview');
    imagePreviewModal.style.display = 'block';
    textAjoutPhoto.style.display = 'none';
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};
//backgroundColor bouton valider lorsque l'image et le titre sont renseignés//
function updateButtonValider() {
  const title = form.querySelector('input[name="title"]').value;
  const imageSelected = imageInput.files.length > 0;
  
  if (title && imageSelected) {
    buttonValider.style.backgroundColor = '#1D6154';
  } else {
    buttonValider.style.backgroundColor = '#aaa';
  }
}

form.querySelector('input[name="title"]').addEventListener('input', updateButtonValider);
//---------------Création de l'image dans le DOM-------//
const createWork = async (title, imageUrl, categoryId) => {
  
  const formData = new FormData();
  formData.append('title', title);
  formData.append('image', imageUrl);
  formData.append('category', categoryId);
  formData.append('userId', userId);

  try {
    const response = await fetch(`http://localhost:5678/api/works/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
      
    });
    if (!response.ok) {
      throw new Error('Échec de l\'enregistrement du travail');
      
    }
    const data = await response.json();
    const updatedWorksUpload = await fetch('http://localhost:5678/api/works').then(reponse => reponse.json());
    genererWorks(updatedWorksUpload); 
    genererWorksModal(updatedWorksUpload);
    return data;
    
  } catch (error) {
    console.error(error);
    throw new Error('Échec de l\'enregistrement du travail');
  }
  
};
 


  
