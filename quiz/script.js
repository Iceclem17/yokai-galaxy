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
    .replace(/['’\s\-]/g, "")
    .toLowerCase();
}

// Initialisation du tableau avec les Yo-kai
function createTable() {
    let tableContent = '<div class="grid-table">';
  
    yokaiList.forEach((name, index) => {
      tableContent += `
        <div class="yokai-cell" data-name="${name}">
          <span class="number">${index + 1}</span>
          <span class="name"></span>
        </div>
      `;
    });
  
    tableContent += '</div>';
    tableauDiv.innerHTML = tableContent;
}
  

input.addEventListener("keyup", function () {
  const guess = input.value.trim().toLowerCase();

  yokaiList.forEach((name, index) => {
    if (normalize(name) === normalize(guess) && !foundYokai.has(name + index)) {
        foundYokai.add(name + index); // Utilisation de l'index pour différencier les doublons
        // Mettre à jour le statut du Yo-kai dans le tableau
        const cell = document.querySelector(`.yokai-cell[data-name="${name}"]`);
        if (cell) {
            const nameSpan = cell.querySelector(".name");
            nameSpan.textContent = name;

            // Réinitialise les couleurs
            document.querySelectorAll(".yokai-cell .name").forEach(n => n.style.color = "black");
            nameSpan.style.color = "green";
        }
      input.value = "";
      counterDiv.textContent = `Nombre de Yo-kai trouvés : ${foundYokai.size} / ${yokaiList.length}`;
    }
  });
});

// Appel de la fonction pour créer le tableau au démarrage
createTable();
counterDiv.textContent = `Nombre de Yo-kai trouvés : 0 / ${yokaiList.length}`;
