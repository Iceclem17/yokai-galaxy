const yokaiList = [
  "Woko", "Pagno", "Alfoncéo", "Toumou", "Lamlam'mou", "Samoumourai", "Sumochi", "Mochimacho", "Heaumer", "Bushidos",
  "Amiral", "Feulion", "Vibrilion", "Siro", "Bonneto", "Sabri", "Padelou", "Orox", "Benkei", "B3-NK1",
  "Sushiyama", "Kapunki", "Scatcheur", "Scarmouche", "Scarnage", "Zerberker", "Fouétar", "Morvobec", "Matchou", "Chaipô",
  "Gagalurin", "Papa Ress", "Ralbouc", "Bastata", "Marra", "Violette", "Toutouïe", "Babalance", "Mémétal", "Cupistol",
  "Donjouant", "Nonjuan", "Padrézo", "Emettor", "Dynamo", "Télémir", "Nuiroir", "Hiblusion", "Hibrouille", "Hibourling",
  "Espi", "Etassivillia", "Tengu", "Tengurou", "Kyubi", "Barakabo", "Darabajoie", "Darumastar", "Goruma", "Nanpart",
  "Passpa", "Granpart", "Hauber", "Pachycoul", "Persévéfant", "Boulapic", "Bouldacier", "Lama Laya", "Etna Magma", "Loubarbare",
  "Racaïd", "Frérosse", "Coléroptère", "Rhinolimit", "Corniaque", "Castelius III", "Castelius II", "Castelius I", "Castelius Max", "Robonyan",
  "Oronyan", "Misterre", "Ressak", "Squarlett", "Margoth", "Squelèbelle", "Cigalopin", "Cigaillard", "Cigazouille", "Chihuaglagla",
  "Froahuahua", "Cho-cho", "Jibanyan", "Epinyan", "Bandinyan", "Kappacap", "Appak", "Kappaloha", "Komasan", "Komaous",
  "Komajiro", "Komistigri", "Baku", "Tapur", "Pitou", "Choubidou", "Satandre", "Angélik", "Blizzaria", "Damona",
  "Noripop", "Wakapoeira", "Salsalga", "Amoiz", "Pikor", "Granpapéti", "Puissanfon", "Grainpère", "Nomoné", "Noproblemo",
  "Papiltation", "Papiltension", "Hyprapillon", "Vitapillon", "Jojojoyeux", "Paradoxa", "Potaumorose", "Ratatam", "Supernoël", "Dédé",
  "Dédestin", "Tontonerre", "Omnitonton", "Tata Aura", "Tata Câlin", "Egaroni", "Onisoi", "Tortico", "Tendino", "Contracto",
  "Nihilistik", "Emousstik", "Grattoptère", "Marcognito", "Ninjamévu", "Nihilo", "Chauvekipeut", "Chauv'coucou", "Vampiloc", "Suspicioni",
  "Ragioni", "Contrarioni", "Tengubre", "Bibliotengu", "Nimpégase", "Hennimi", "Timidémon", "Belzel", "Dente", "Vénaldo",
  "Maltesse", "Malmidal", "Ecchinose", "Chiperpiou", "Pioubidou", "Flamente", "Volibrius", "Volatriste", "Corniot", "Bicorniot",
  "Cerbébert", "Humidon", "Délujien", "Fryzeur", "Kongel", "Hémorhino", "Blablara", "Umilie", "Lulugubre", "Pégaz",
  "Méphito", "Misterbide", "Flopito", "Cenridion", "Jouvencia", "Eterna", "Insomnelle", "Morféa", "Noko", "Nénunoko",
  "Pandanoko", "Anghihihille", "Méroubadour", "Urnaconda", "Murhaine", "Saumhonni", "Vexturgeon", "Dracounet", "Sire Dragon", "Dragô",
  "Bababou", "Tourneboul", "Croquin", "Inisquale", "Claquille", "Cocpille", "Jacquasseur", "Bananar", "Vipètesec", "Vipérâle",
  "Vipairflay", "Octorgone", "Octorgombre", "Shogunyan", "Komashura", "Cabotin", "Camaïeul", "Gorgouille", "Saphinyan", "Emeranyan",
  "Rubinyan", "Topanyan", "Diamanyan", "Triptyk", "Crocho", "Carpitaine", "Ombraptor", "Sabroclair", "Inamygal", "Dr Jobard",
  "McKraken", "McKraken", "Volteface", "Didgeai", "Hydreux", "Porcinator", "Styx VI", "Nébulor", "Pr Létripe", "Hagacurée", "Rancornet",
  "Potofeu", "Gargaros", "Ogralos", "Orqanos"
];

const foundYokai = new Set();
const input = document.getElementById("input");
const counterDiv = document.getElementById("counter");
const tableauDiv = document.getElementById("tableau");

function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’\s\-\.]/g, "")
    .toLowerCase();
}

// Fonction pour récupérer les indices des doublons
function getDuplicateIndices(name) {
  return yokaiList
    .map((n, index) => normalize(n) === normalize(name) ? index : -1)
    .filter(index => index !== -1);
}

// Initialisation du tableau avec les Yo-kai (avec noms cachés)
function createTable() {
  let tableContent = '<div class="grid-table">';

  yokaiList.forEach((name, index) => {
    tableContent += `
      <div class="yokai-cell" data-name="${name}">
        <span class="number">${index + 1}</span>
        <span class="name" style="visibility: hidden;">${name}</span> <!-- Nom caché -->
      </div>
    `;
  });

  tableContent += '</div>';
  tableauDiv.innerHTML = tableContent;
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

function getCookie(name) {
  const decoded = decodeURIComponent(document.cookie);
  const cookies = decoded.split(';');
  for (let c of cookies) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name + "=") === 0) {
      return c.substring(name.length + 1, c.length);
    }
  }
  return "";
}

function restoreFromCookie() {
  const saved = getCookie("yokaiWatch1FoundYokai");
  if (saved) {
    const ids = saved.split(',');
    ids.forEach(entry => {
      foundYokai.add(entry);
      const index = parseInt(entry.match(/\d+$/)[0]);
      const name = yokaiList[index];
      const cells = document.querySelectorAll(`.yokai-cell[data-name="${name}"]`);
      cells.forEach(cell => {
        const nameSpan = cell.querySelector(".name");
        nameSpan.style.visibility = "visible";
        nameSpan.style.color = "black";
      });
    });
    counterDiv.textContent = `Nombre de Yo-kai trouvés : ${foundYokai.size} / ${yokaiList.length}`;
  }
}


input.addEventListener("keyup", function () {
  const guess = input.value.trim().toLowerCase();

  // Réinitialisation des couleurs
  document.querySelectorAll(".yokai-cell .name").forEach(n => n.style.color = "black");

  // Si le Yo-kai est trouvé, marque toutes ses occurrences
  yokaiList.forEach((name, index) => {
    if (normalize(name) === normalize(guess) && !foundYokai.has(name + index)) {
      const duplicateIndices = getDuplicateIndices(name);
      duplicateIndices.forEach(duplicateIndex => {
        foundYokai.add(name + duplicateIndex); // Marquer tous les doublons comme trouvés

        // Mettre à jour le statut du Yo-kai dans le tableau
        const cells = document.querySelectorAll(`.yokai-cell[data-name="${name}"]`);
        cells.forEach(cell => {
          const nameSpan = cell.querySelector(".name");
          nameSpan.style.visibility = "visible";
          nameSpan.style.color = "green";
        });
      });
      input.value = "";
      counterDiv.textContent = `Nombre de Yo-kai trouvés : ${foundYokai.size} / ${yokaiList.length}`;
      // Sauvegarde dans le cookie (liste séparée par des virgules)
      setCookie("yokaiWatch1FoundYokai", Array.from(foundYokai).join(','), 7);
    }
  });
});

// Appel de la fonction pour créer le tableau au démarrage
createTable();
counterDiv.textContent = `Nombre de Yo-kai trouvés : 0 / ${yokaiList.length}`;
restoreFromCookie();


document.getElementById("reset-progress").addEventListener("click", function () {
  document.cookie = "yokaiWatch1FoundYokai=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  foundYokai.clear();
  createTable();
  counterDiv.textContent = `Nombre de Yo-kai trouvés : 0 / ${yokaiList.length}`;
});