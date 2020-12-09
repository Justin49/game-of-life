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

            // si elle est morte alors on dessine la cellule en noire
            if(grille[i][j] === 0) {

                contexte.beginPath();
                contexte.fillStyle = 'black';
                contexte.rect(i*PIXEL, j*PIXEL, PIXEL, PIXEL);
                contexte.stroke();
                contexte.fill();

            }

            // si elle est vivante on dessine la cellule en blanc
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

// fonction qui va créer la logique du jeu
function logiqueDuJeu(grille) {

    // je créer un nouveau tableau qui va être la génération suivante
    const nouveauTableau = creerTableau2D();

    // je parcours mon nouveau tableau
    for(var i = 0; i < grille.length; i++) {

        for(var j = 0; j < grille[i].length; j++) {

            // j'affecte ma grille dans mon nouveau tableau créer précedemment
            nouveauTableau[i][j] = grille[i][j];

        }
    }

    // je parcours mon nouveau tableau à 2 dimensions, pour selectionner mon pixel
    for(var i = 0; i < nouveauTableau.length; i++) {

        for(var j = 0; j < nouveauTableau[i].length; j++) {

            let nombreDeVoisin = 0;

            // pour chaque indice de mon tableau à 2 dimensions, il faut que je compte combien une cellule à de voisines vivante
            for(var k = -1; k <= 1; k++) {

                for(var l = -1; l <= 1; l++) {

                    // on  vérifie si l'indice qu'on vérifie n'est pas son propre voisin, si il l'est il s'arrête ici sinon il continue
                    if(k === 0 && l === 0) {

                        continue;
                    }

                    // constante qui servent à savoir si la cellule est en dehors du caneva (zone que l'on ne parcours pas)
                    const x_cell = k + i;
                    const y_cell = l + j;

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < LIGNE && y_cell < COLONNE) {

                        // j'incrémente le nombre de voisin de la cellule
                        nombreDeVoisin++;
                    }
                }
            }

            // par rapport au nombre de voisin, on décide si une cellule va vivre ou mourrir

            // si la cellule du tableau est morte et qu'elle à 3 voisins
            if(nouveauTableau[k][l] === 0 && nombreDeVoisin === 3) {

                // la cellule va vivre
                nouveauTableau[k][l] = 1;
            }

            // si la cellule du tableau est vivante et qu'elle à strictement moins de 2 voisins
            else if(nouveauTableau[k][l] === 1 && nombreDeVoisin < 2) {

                // la cellule va mourrir
                nouveauTableau[k][l] = 0;
            }

            // si la cellule du tableau est vivante et qu'elle à strictement plus de 3 voisins
            else if(nouveauTableau[k][l] === 1 && nombreDeVoisin > 3) {

                // la cellule va mourrir
                nouveauTableau[k][l] = 0;
            }

        }

    }

    return nouveauTableau;

}

// création de la boucle principale du jeu
requestAnimationFrame(bouclePrincipale);

function bouclePrincipale() {

    // dessine mon tableau
    dessinerTableau2D(grille);

    // j'appelle la fonction qui va contenir la logique du jeu et donc la nouvelle grille
    grille = logiqueDuJeu(grille);
 
  requestAnimationFrame(bouclePrincipale);
  console.log("je passe par ici");
}





