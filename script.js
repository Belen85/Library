/* eslint-disable guard-for-in */
import './styles.scss';

import { bds } from './src/data';

import { bds2 } from './src/data1';

const app = document.getElementById('app');

// console.log(app);

// 2. Verifier qu'il s'agit d'un arrey et visualiser l'esctructure
console.log(bds);
console.log(bds2);

// 2.1. Array avec 15 elements -> 15 titres
// 2.2.A l'interieur de l'array les cles auteurs et themes sont des listes

// 4. Creation de une table pour placer tous les elements dans le html

// var tableLivres = "<table>";

// 4.1. Creation de la premier ligne tu tableau
console.log(bds.length);
console.log(bds[0].auteurs.length);

// Come obtenir les keys (https://stackoverflow.com/questions/8763125/get-array-of-objects-keys)
// const keys = Object.keys(bds[0]); // array avec 17 elements
// console.log(keys);

// Voir la taille de tous les objets et prendre celui avec les plus d'info
for (let k = 0; k < bds2.length; k++) {
  console.log(Object.keys(bds2[k]));
}

// Function populateListLivres

function populateListLivres(list = [], selector) {
  let tableLivres = '<table>';
  // Come obtenir les keys (https://stackoverflow.com/questions/8763125/get-array-of-objects-keys)
  const keys = Object.keys(list[0]); // array avec 17 elements
  let premiereLigne = '<tr>';
  let titres = '';
  for (const key of keys) {
    // console.log(key);
    const td = `<td>${key}</td>`;
    titres += td;
  }
  premiereLigne += `${titres}<td></td></tr>`;
  // Comment obtenir les cles et valeurs d'un objet a travers un boucle (https://reedbarger.com/how-to-transform-javascript-objects-the-power-of-objectkeys-values-entries/)
  let contenu = '';
  for (let i = 0; i < list.length; i++) {
    const tr = '<tr>';
    let td = '';
    for (const key in list[i]) {
      // Si la cle est egal a image on met la valeur dans une balise img
      if (key === 'image') {
        td += `<td><img src='images/${list[i][key]}'></td>`;
        // console.log(bds[i][key]);
        // Si la cle est egal a resume on montre que les 30 premiers caracteres
        // et on ajoute un bouton lire la suite
        // https://stackoverflow.com/questions/7708819/keep-only-first-n-characters-in-a-string
      } else if (key === 'resume') {
        td += `<td>${list[i][key].slice(0, 30)}<button class='lirePlus' data-index='${i}' >Lire la suite..</button></td>`;
      } else {
        td += `<td>${list[i][key]}</td>`;
        // console.log(value.includes('.jpj'));
      }
    }
    // Ajouter bouton emprunter a cote de chaque livre
    contenu += `${tr}${td}<td><button class='emprunter' data-index='${i}'>Emprunter</button></tr>`;
  }

  tableLivres += `${premiereLigne + contenu}</table>`;
  selector.innerHTML = tableLivres;
}

// Appel a la fonction populateListLivres

populateListLivres(bds, app);

// Sauvegarde des donnes

localStorage.setItem('itemsLivres', JSON.stringify(bds));

// Creer addEventListener pour le bouton lire la suite...Comment il y aura un autre
// bouton pour emprunter j'ai cree une class à la interieur de chaque td qui contient le resume

// var bouton = document.querySelectorAll('.bouton');

function clickDoneLirePlus(e) {
  if (!e.target.matches('button')) return; // skip this unless it's an input
  if (e.target.className !== 'lirePlus') return; // skip this unless button contains the class 'bouton'
  // if(e.target.className!=='lireMoins') return;
  const el = e.target;
  const { index } = el.dataset;
  console.log(el.parentElement);
  console.log(el.dataset.index);
  console.log(el.outerHTML);
  console.log(el.className);
  el.outerHTML = `${bds[index].resume.slice(30)}<button class='lireMoins' data-index='${index}'>Lire moins</button>`;
}

function clickDoneLireMoins(e) {
  if (!e.target.matches('button')) return; // skip this unless it's an input
  if (e.target.className !== 'lireMoins') return; // skip this unless button contains the class 'bouton'
  const el = e.target;
  // const { index } = el.dataset;
  console.log(el.parentElement);
  console.log(el.dataset.index);
  console.log(el.outerHTML);
  console.log(el.className);
  populateListLivres(bds, app);
}

app.addEventListener('click', clickDoneLirePlus);
app.addEventListener('click', clickDoneLireMoins);

// Creer un panier vide:

const panierList = JSON.parse(localStorage.getItem('items')) || [];

// Voir si ça fonction manuelement
// panierList.push(bds[0]);
// panierList.push(bds[1])
// console.log(panier);
// console.log(panier.length);

// Creer un selector panier

const panier = document.getElementById('panier');

// Function populateListPanier

function populateListPanier(list = [], selector) {
  const titrePanier = '<h5>Panier</h5>';
  let ul = '<ul>';
  for (let i = 0; i < list.length; i++) {
    let li = '';
    for (const key in list[i]) {
      // Si la cle est egal a titre et prix on montre les les cles et les valeurs dans un li
      if (key === 'titre') {
        li += `<li>${key}: ${list[i][key]} - `;
      }
      if (key === 'prix') {
        li += `${key}: ${list[i][key]}</li>`;
      }
    }

    ul += li;
  }

  ul += '</ul>';

  selector.innerHTML = titrePanier + ul;
}

// Appel a la fontion populateListPanier

populateListPanier(panierList, panier);

// Sauvegarde des donnes dans localStorage

localStorage.setItem('items', JSON.stringify(panierList));

// Afficher les elements du panier dans un console.log
// for (var k=0; k<panier.length; k++)
// {
//   console.log(panier[k]);
// }

// function ajouterLivreAuPanier

function ajouterLivreAuPanier(e) {
  if (!e.target.matches('button')) return; // skip this unless it's an input
  if (e.target.className !== 'emprunter') return; // skip this unless button contains the class 'bouton'
  const el = e.target;
  const { index } = el.dataset;
  console.log(el.dataset.index);
  console.log(el.outerHTML);
  console.log(el.className);
  // populate list to update fields -> appeler a cette fonction
  bds[index].emprunt = !bds[index].emprunt;
  panierList.push(bds[index]);
  localStorage.setItem('itemsLivres', JSON.stringify(bds));
  localStorage.setItem('items', JSON.stringify(panierList));
  populateListPanier(panierList, panier);
  populateListLivres(bds, app);
}

// Ajouter les livres au panier quand on fait click sur emprunter
app.addEventListener('click', ajouterLivreAuPanier);

// for (var k=0; k<panierList.length; k++)
// {
//    console.log(panierList[k]);
// }

// populateListPanier

// populateListPanier(panierList, panier);
