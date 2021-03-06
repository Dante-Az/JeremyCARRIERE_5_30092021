// Utilisation de URL.SearchParams pour recuperer le paramètre "id"
let params = new URL(document.location).searchParams;
let newId = params.get("id");

let productImg = document.createElement("img");
const productName = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");

let colorChoice = document.getElementById("colors");
const quantity = document.getElementById("quantity");

main ()
function main(){
    getArticle();
}

function getArticle() {
    // Recuperation de l'url des différents articles en fonction de leurs id
    fetch(`http://localhost:3000/api/products/${newId}`)
        .then(response => response.json())
        .then(data => {
            let product = data;
            addCard(product);
        })
        .catch((erreur) => {
            console.log("erreur : " + erreur)
            alert("Les produits ne sont pas accessibles actuellement")
        });
        // Fonction pour la création de la page produit
        function addCard(product) {

            // Affichage du titre correspondant au nom de l'article
            document.title = `${product.name}`

            // Affichage de l'image du produit
            
            document.querySelector(".item__img").appendChild(productImg);
            productImg.src = `${product.imageUrl}`;
            productImg.alt = `${product.altTxt}`;
 
            //Affichage du nom
            
            productName.innerHTML += `${product.name}`;

            //Affichage du prix
            
            productPrice.innerHTML += `${product.price}`;

            //Affichage de la description
            
            productDescription.innerHTML += `${product.description}`;

            //Affichage du choix de couleurs
            addColors(product);
    }
    // Fonction pour afficher les différentes couleurs de l'article
    function addColors(product) {
        
        //Boucle pour recuperer les couleurs
        for (let color of product.colors) {
            colorChoice.innerHTML += `<option value="${color}">${color}</option>`
        }   
    }
}    
// Gestion du local storage
const addToCartBtn = document.getElementById("addToCart");
    // Bouton événement pour rajouter la ou les articles
    addToCartBtn.addEventListener("click", (e) => {
         e.preventDefault();
        let productOption = {

        // Récupération des valeurs

            _id : newId,
            name : productName.innerText,
            price : parseInt(productPrice.innerText),
            image : productImg.src,
            quantity : parseInt(quantity.value),
            color : colorChoice.value,
            alt : productImg.alt,
            };
// Déclaration de la variable dans laquelle on met les clés et les valeurs qui sont dans le localstorage
let addedProduct = JSON.parse(localStorage.getItem("produit")) || [];
console.log(addedProduct);
// JSON.parse sert à convertir les données au format JSON qui sont sur le local storage en objet Javacript
                   
// On vérifie s'il y a déja des produits enregistrés dans le localStorage
let isAlreadyPresent = false;
let indexModification;
for (products of addedProduct) {
    if (products.color == productOption.color && products.name == productOption.name) {           
        isAlreadyPresent = true;
        indexModification = addedProduct.indexOf(products);
        }
    }
// Fonction qui va servir à vérifier que les champs couleur et quantité sont renseignés
function invalidInputCheck(){
// Si l'utilisateur a oublié de choisir une couleur
    if (productOption.color == "") {
        new Swal({
            title: "Veuillez choisir une couleur valide",
            icon: "error",
            iconColor: "#3498db",
            showConfirmButton: false,
            timer: 2000,
          });
        //Si l'utilisateur a oublié de choisir une quantité 
        }else if (productOption.quantity == 0 || productOption.quantity == ""){  
            new Swal({
                title: "Veuillez choisir une quantité",
                icon: "error",
                iconColor: "#3498db",
                showConfirmButton: false,
                timer: 2000,
              })
        }else{
            setToCart();
            }      
        };
        //Fonction qui envoie l'objet au LocalStorage
        function setToCart(){    
        //S'il est déjà présent   
        if (isAlreadyPresent) {
            addedProduct[indexModification].quantity += productOption.quantity;
            localStorage.setItem("produit", JSON.stringify(addedProduct));
            console.log(addedProduct);
            console.log(isAlreadyPresent)
            new Swal({
                title: "La quantité désirée a été mise à jour",
                icon: "success",
                iconColor: "#3498db",
                showConfirmButton: false,
                timer: 2000,
              });
            //S'il n'est pas présent
        }else {
            addedProduct.push(productOption);
            localStorage.setItem("produit", JSON.stringify(addedProduct));
            console.log(addedProduct);
            console.log(isAlreadyPresent)
            new Swal({
                title: "Votre produit à bien été ajouté au panier",
                icon: "success",
                iconColor: "#3498db",
                showConfirmButton: false,
                timer: 2000,
              });
            }
        }    
    invalidInputCheck();
})   