const yokaiList = [
  "Woko", "Pagno", "Alfoncéo", "Toumou", "Lamlam'mou", "Samoumouraï", "Samoussrai", "Ronimpec",
  "Roupilion", "Rugis", "Trépigno", "Zerberker", "Fouétar", "Sumochi", "Mochimacho", "Sale de bain",
  "Agonigri", "Onigrix", "Heaumer", "Bushidos", "Âmiral", "Bouh", "Coach Antonic", "Feulion",
  "Vibrilion", "Siro", "Bonneto", "Sabri", "Padelou", "Orox", "Benkei", "B3-NK1",
  "Sushiyama", "Kapunki", "Scatcheur", "Scarmouche", "Scarnage", "Démophage", "Vampéric", "Pleurapluie",
  "Gastong", "Morvobec", "Matchou", "Papa Ress", "Ralbouc", "Bastata", "Chaipô", "Mémogre",
  "Gagalurin", "Ovide", "Marra", "Violette", "Toutouïe", "Babalance", "Mémétal", "Cupistol",
  "Donjouant", "Nonjuan", "Trodésolé", "Pardomino", "Brumette", "Brumella", "Padrézo", "Emettor",
  "Dynamo", "Maître Oden", "Mythovni", "Apélicain", "Télémir", "Triptic-tac", "Nuiroir", "Hiblusion",
  "Hibrouille", "Hibourling", "Espi", "Etassivilia", "Valetino", "Tengu", "Tengurou", "Kyubi",
  "Barakabo", "Chymère", "Chyper", "Potache", "Darabajoie", "Darumastar", "Goruma", "Jalouseriz",
  "Fanfanfaron", "Egare-dare", "Charivari", "Nanpart", "Passpa", "Granpart", "Loubarbare", "Racaïd",
  "Frérosse", "Hauber", "Humainequin", "Boulapic", "Bouldacier", "Pachycoul", "Persévéfant", "Pachypipi",
  "Antonnerre", "Parantonn", "Suinthan", "Lama Laya", "Etna Magma", "Castelius III", "Castelius II", "Castelius I",
  "Castelius Max", "Coléroptère", "Rhinolimit", "Corniaque", "Robonyan", "Oronyan", "Misterre", "Ressak",
  "Crapop", "Geeko", "Gambeth", "Squarlett", "Margoth", "Squelèbelle", "Cigalopin", "Cigaillard",
  "Cigazouille", "Chihuaglagla", "Froahuahua", "Cho-cho", "Traviolette", "Yokoeil", "Jibanyan", "Épinyan",
  "Bandinyan", "Buchinyan", "Kappacap", "Appak", "Kappaloha", "Komasan", "Komaous", "Komajiro",
  "Komistigri", "Baku", "Bakuku", "Tapur", "Sabruine", "Vito", "Pitou", "Choubidou",
  "Satandre", "Timours", "Angélik", "Blizzaria", "Damona", "Faux Kappa", "Kappadissi", "Maitre Nyada",
  "Amoiz", "Pikor", "Noripop", "Algacarena", "Wakapoeira", "Salsalga", "Granpapéti", "Puissanfon",
  "Grainpère", "Papilla", "Mme Papilla", "Felipaix", "Monsieur Felipaix", "Parasolal", "Scarasol", "Nomoné",
  "Ivanupieds", "Noproblemo", "Lulutin", "Grégrigry", "Papiltation", "Papiltension", "Hyprapillon", "Vitapillon",
  "Métaureaulog", "Tauracle", "Donchan", "Sabrille", "Jojojoyeux", "Paradoxa", "Potaumorose", "Ratatam",
  "Supernoël", "Dédé", "Dédestin", "Tontonerre", "Omnitonton", "Tata Aura", "Tata Câlin", "Kyryn",
  "Kyrycorne", "Égaroni", "Onisoi", "Tortico", "Tendino", "Contracto", "Couchtar", "Noctambill",
  "Herbert", "Carnanova", "Nihilistik", "Émousstik", "Grattoptère", "Marcognito", "Ninjamévu", "Nihilo",
  "Suspicioni", "Ragioni", "Contrarioni", "Chauvekipeut", "Chauv'coucou", "Vampiloc", "Gloups", "Chip-Chope",
  "Hâtila", "Amédélègue", "Comte Zapzap", "Raltesse", "Tengubre", "Bibliotengu", "Snobéa", "Triptyk",
  "Dracunyan", "Nimpégase", "Hennimi", "Timidémon", "Belzel", "Dente", "Millyeux", "Précyeux",
  "Vénaldo", "Maltesse", "Potofeu", "Malmidal", "Écchinose", "Humidon", "Délujien", "Fryzeur",
  "Kongel", "Hémorhino", "Chiperpiou", "Rapiaf", "Pioubidou", "Zikafon", "Babarouf", "Flamente",
  "Volibrius", "Volatriste", "Corniot", "Bicorniot", "Cerbébert", "Poilux", "Poil-Émile", "Non-non",
  "Lulugubre", "Blablara", "Umilie", "Pépésbrouf", "Adolfo Jeton", "Pégaz", "Méphito", "Ornella",
  "Sornella", "Crocho", "Misterbide", "Flopito", "Cenridion", "Jouvencia", "Éterna", "Insomnelle",
  "Morféa", "Arachnus", "Arachnia", "Crampaud", "Noko", "Nénunoko", "Pandanoko", "Maudieuse",
  "Jérémya", "Anghihihille", "Méroubadour", "Urnaconda", "Murhaine", "Saumhonni", "Vexturgeon", "Yvantouse",
  "Ed Mémoire", "Scoltine", "Scolérique", "Dracounet", "Sire Dragon", "Dragô", "Sirénée", "Sirènité",
  "Sireine-mère", "Mlle Coucou", "Bababou", "Tourneboul", "Croquin", "Inisquale", "Claquille", "Cocpille",
  "Jacquasseur", "Bananar", "Draconfus", "Carpitaine", "Vipètesec", "Vipérâle", "Vipairflay", "Octorgone",
  "Octorgombre", "Shogunyan", "Komashura", "Gorgouille", "Déballerine", "Camaïeul", "Savantard", "Cabotin",
  "Slurpent", "Saphinyan", "Émeranyan", "Rubinyan", "Topanyan", "Diamanyan", "Melonyan", "Oranyan",
  "Kiwinyan", "Vigninyan", "Maranyan", "Pastènyan", "Robocap", "Robokoma", "Robopapéti", "Robocorniot",
  "Robonoko", "Robodracou", "Boucanyan", "Robonyan F", "Sailornyan", "Maskonyan", "Hovernyan", "Darknyan",
  "Jibakoma", "Jetnyan", "Injustin", "Fielippine", "Cyrustre", "Maudicko", "Ronéan", "Gale de bain",
  "Mabouhl", "Fumella", "Fou Kappa", "Pariasolal", "Fatalutin", "Métaréaulog", "Poulux", "Sinisrénée",
  "Mlle Courroux", "Mélobê", "Geigneau", "Bon-huili", "Verrascible", "Petit panja", "Panja-san", "Samuren",
  "Barrakéda", "Poulpatouch", "Poulpater", "Avallée", "Mont merci", "Sumodon", "Soupotori", "Pfffuji",
  "Krakatouaaah", "Lacanne", "Canastelle", "Grolos", "Méganyan", "Barbefrousse", "Tourboeillon", "Laure",
  "Marge", "Lady Perpétua", "Lady Démona", "Triptyk", "Hydreux", "Crocho", "Porcinator", "Carpitaine",
  "Styx VI", "Ombraptor", "Nébulor", "Sabroclair", "Hagacurée", "Inamygal", "Dr Jobard", "Pr Létripe",
  "McKraken", "McKraken", "Rancornet", "Volteface", "Didgeai", "Potofeu", "Firmain", "Tromploeil",
  "Taprice", "Barbebluff", "Mariotte", "Maribass", "Lady Maggie", "Filomène", "Blingos", "Bogos",
  "Maximain", "Cycloptique", "Gargaros", "Ogralos", "Orqanos", "Narinos", "Ultramax N", "Ultramax K",
  "Jibanyan S", "Komasan S", "Komajiro S", "Obskyurbi", "Luminoct", "Gargaros", "Ogralos", "Orqanos",
  "Jiganyan", "Komak", "Domniscian", "Ambronzio", "Thénuki", "Infiniris", "Chomino", "Extrabuki"
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
  const saved = getCookie("yokaiWatch2FoundYokai");
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
      setCookie("yokaiWatch2FoundYokai", Array.from(foundYokai).join(','), 7);
    }
  });
});

// Appel de la fonction pour créer le tableau au démarrage
createTable();
counterDiv.textContent = `Nombre de Yo-kai trouvés : 0 / ${yokaiList.length}`;
restoreFromCookie();


document.getElementById("reset-progress").addEventListener("click", function () {
  document.cookie = "yokaiWatch2FoundYokai=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  foundYokai.clear();
  createTable();
  counterDiv.textContent = `Nombre de Yo-kai trouvés : 0 / ${yokaiList.length}`;
});