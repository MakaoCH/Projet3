
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
  
 //--------------------------Modal1----------------------------------//

let modal = null

const openModal = function (e) {
   e.preventDefault()
   const target = document.querySelector(e.target.getAttribute("data-id"))
   target.style.display = null
   target.removeAttribute('aria-hidden')
   target.setAttribute('aria-modal', 'true')
   modal = target
   modal.addEventListener("click", closeModal)
   modal.querySelector(".js-close-modal").addEventListener("click", closeModal) 
   modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
} 


const closeModal = function (e) {
   e.preventDefault()
   if (modal === null) return
   modal.style.display = "none"
   modal.setAttribute('aria-hidden', 'true')
   modal.removeAttribute('aria-modal')
   modal.removeEventListener("click", closeModal)
   modal.querySelector(".js-close-modal").removeEventListener("click", closeModal) 
   modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation) 
   
   modal = null
}

const stopPropagation = function (e) {
   e.stopPropagation()
}

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

    const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fa-solid fa-trash-can fa-xs"></i>';
      deleteButton.classList.add('delete-button');

      deleteButton.addEventListener('click', async (event) => {
      event.stopPropagation();
      try {
        const index = worksModal.findIndex((element) => element.id === worksModal[i].id);
        if (index !== -1) {
          await deleteImage(worksModal[i].id);
          worksModal.splice(index, 1);
          imageWrapper.remove();
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
   e.preventDefault()
   if (modalAjout === null) return
   modalAjout.style.display = "none"
   modalAjout.setAttribute('aria-hidden', 'true')
   modalAjout.removeAttribute('aria-modal')
   modalAjout.removeEventListener("click", closeModalDeux)
   modalAjout.querySelector(".js-close-modal2").removeEventListener("click", closeModalDeux) 
   modalAjout.querySelector(".js-going-back").removeEventListener("click", closeModalDeux) 
   modalAjout.querySelector(".js-modal-stop").removeEventListener("click", stopPropagationDeux) 
   modalAjout = null
}

const stopPropagationDeux = function (e) {
   e.stopPropagation()
}

document.querySelectorAll('#ajout-photo').forEach(a => {
   a.addEventListener('click', openModalDeux) 
})


//---------------------galeries moadl ajout--------------------------------------//

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


// Sélection de l'élément input pour l'image
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('image-modal-preview')
const textAjoutPhoto = document.getElementById('text-ajout-photo')
// Écouteur d'événements pour l'image
imageInput.addEventListener('change', previewPicture);

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
    console.log(data);
  } catch (error) {
    console.error(error);
    alert('Échec de l\'enregistrement du travail');
  }
});

// Fonction pour prévisualiser l'image sélectionnée
function previewPicture(event) {
  const reader = new FileReader();
  reader.onload = function(){
    const output = document.getElementById('image-modal-preview');
    imagePreview.style.display = 'block';
    textAjoutPhoto.style.display = 'none';
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};

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
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Échec de l\'enregistrement du travail');
  }
};
