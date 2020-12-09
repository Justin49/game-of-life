// Création du contexte
var canvas = document.getElementById('grille');
let contexte = canvas.getContext("2d");

// Création des constantes
const PIXEL = 5;// taille d'un pixel
const LIGNE = canvas.width/PIXEL;// ligne de la grille
const COLONNE = canvas.height/PIXEL;// colonne de la grille

// fonction qui va créer un tableau en 2D
function creerTableau2D() {

    // Création de la grille du jeu
    const grille = new Array(LIGNE);// Je crée un tableau pour construire la grille remplit de pixel

    // pour chaque élément de ma grille 
    for(var i = 0; i < grille.length; i++) {
        // chaque indice de ma grille deviendra un pixel
        grille[i] = new Array(COLONNE);
        
    }

    return grille;

}

let grille = creerTableau2D();

// fonction qui va remplir de manière aléatoire vivante ou morte un pixel de la grille
function remplirTableauAleatoire(grille) {

    // parcourrir le tableau à 2 dimension, donc boucle for imbriqué
    for(var i = 0; i < grille.length; i++) {

        for(var j = 0; j < grille[i].length; j++) {

            // j'affecte à chaque indice un nombre aléatoire entre 0 et 1
            grille[i][j] = Math.floor(Math.random() * (2 - 0) + 0);

        }
    }

    return grille;

}

grille = remplirTableauAleatoire(grille);
console.table(grille);

// fonction qui va dessiner le tableau en 2D
function dessinerTableau2D(grille) {

    // parcourrir le tableau à 2 dimension, donc boucle for imbriqué
    for(var i = 0; i < grille.length; i++) {

        for(var j = 0; j < grille[i].length; j++) {

            // je conditionne pour dire si ma cellule est morte ou vivante
            if(grille[i][j] === 0) {

                contexte.beginPath();
                contexte.fillStyle = 'black';
                contexte.rect(i*PIXEL, j*PIXEL, PIXEL, PIXEL);
                contexte.stroke();
                contexte.fill();

            }

            else if(grille[i][j] === 1) {

                contexte.beginPath();
                contexte.fillStyle = 'white';
                contexte.rect(i*PIXEL, j*PIXEL, PIXEL, PIXEL);
                contexte.stroke();
                contexte.fill();
            }

        }
    }
    
}

dessinerTableau2D(grille);

