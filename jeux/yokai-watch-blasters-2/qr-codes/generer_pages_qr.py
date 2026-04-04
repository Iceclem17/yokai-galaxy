#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Générateur de pages QR-Codes - Yo-kai Galaxy
=============================================
Aucune dépendance externe. Python 3.6+ suffit.

Usage :
  1. Place ce script dans ton dossier de travail.
  2. Place aussi un fichier "tableau.html" contenant les <div class="item">.
  3. Lance : python generer_pages_qr.py
"""

import os
import re
import sys
import unicodedata


# ──────────────────────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────────────────────

def retirer_accents(texte: str) -> str:
    nfkd = unicodedata.normalize("NFKD", texte)
    return "".join(c for c in nfkd if not unicodedata.combining(c))


def prefixe_image(dossier: str) -> str:
    """'pièce-rouge' → 'piece-rouge'  (sans accents, sans points, sans espaces)"""
    sans = retirer_accents(dossier)
    return re.sub(r"[^a-zA-Z0-9\-]", "", sans)


# ──────────────────────────────────────────────────────────────
# Parsing HTML (stdlib uniquement)
# ──────────────────────────────────────────────────────────────

def extraire_items(html: str):
    """
    Cherche tous les blocs  <div class="item">...</div>
    et en extrait : dossier, icone, nom.
    """
    items = []

    # On récupère chaque bloc <div class="item">
    blocs = re.findall(
        r'<div\s+class=["\']item["\']>(.*?)</div\s*>\s*</div',
        html,
        re.DOTALL | re.IGNORECASE,
    )

    for bloc in blocs:
        # ── dossier : dernier segment du premier href trouvé
        m_href = re.search(r'href=["\']([^"\']+)["\']', bloc)
        if not m_href:
            continue
        dossier = m_href.group(1).rstrip("/").split("/")[-1]
        if not dossier:
            continue

        # ── icone : nom de fichier de la première img (src)
        m_img = re.search(r'<img\s[^>]*src=["\']([^"\']+)["\']', bloc)
        icone = m_img.group(1).split("/")[-1] if m_img else ""

        # ── nom : texte du dernier <a>...</a> (celui dans div.text)
        liens_texte = re.findall(r'<a\s[^>]*>([^<]+)</a>', bloc)
        nom = liens_texte[-1].strip() if liens_texte else dossier

        items.append({"dossier": dossier, "icone": icone, "nom": nom})

    return items


# ──────────────────────────────────────────────────────────────
# Génération HTML
# ──────────────────────────────────────────────────────────────

TEMPLATE = """\
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{nom} - Qr-Codes - {jeu} - Yo-kai Galaxy</title>
    <link rel="icon" type="image/png" href="../../../../images/icon.png" />
    <link href="../../../../style.css" rel="stylesheet">
    <link href="../../../../styles/style-qr.css" rel="stylesheet">
</head>
<body>
    <header>
      <script src="../script-nav-qr.js"></script>
      <div id="navbar"></div>
          <div class="principal">
            <div class="titre">
              <h2>Qr-Codes pour {nom} <img src="../../../../images/icones/{icone}"></h2>
            </div>
            <div class="pieces">
{images}
            </div>
          </div>
    </header>
</body>
</html>
"""


def generer_html(nom: str, dossier: str, icone: str, nb_qr: int, jeu: str) -> str:
    prefixe = prefixe_image(dossier)
    lignes = []
    for i in range(1, nb_qr + 1):
        src = f"../../../../images/qr-codes/blasters/{dossier}/qr-{prefixe}-{i}.png"
        lignes.append(f'              <img src="{src}">')
    return TEMPLATE.format(
        nom=nom,
        jeu=jeu,
        icone=icone,
        images="\n".join(lignes),
    )


# ──────────────────────────────────────────────────────────────
# Programme principal
# ──────────────────────────────────────────────────────────────

def demander(question: str, defaut: str) -> str:
    rep = input(f"{question} (défaut : {defaut}) : ").strip()
    return rep if rep else defaut


def main():
    print("=" * 54)
    print("  Générateur QR-Codes – Yo-kai Galaxy")
    print("=" * 54)
    print()

    # Fichier source
    source = demander("Fichier HTML source (tableau)", "tableau.html")
    if not os.path.isfile(source):
        print(f"\n❌  Fichier introuvable : {source}")
        sys.exit(1)

    with open(source, encoding="utf-8") as f:
        html = f.read()

    items = extraire_items(html)

    if not items:
        print('\n⚠️  Aucun <div class="item"> trouvé dans le fichier.')
        print("    Vérifie que le HTML contient bien ces balises.")
        sys.exit(1)

    print(f"\n✅  {len(items)} éléments détectés.\n")

    # Paramètres globaux
    jeu      = demander("Nom du jeu dans le <title>", "Yo-kai Watch Blasters 2")
    nb_str   = demander("Nombre de QR codes par défaut", "99")
    nb_defaut = int(nb_str) if nb_str.isdigit() else 99
    sortie   = demander("Dossier de sortie", ".")

    print()
    print("-" * 54)

    # Création
    for item in items:
        dossier = item["dossier"]
        icone   = item["icone"]
        nom     = item["nom"]

        print(f"\n📁  {dossier}  |  {nom}  |  {icone}")
        nb_str = input(f"   Nb QR codes (défaut : {nb_defaut}) : ").strip()
        nb_qr  = int(nb_str) if nb_str.isdigit() else nb_defaut

        chemin = os.path.join(sortie, dossier)
        os.makedirs(chemin, exist_ok=True)

        contenu = generer_html(nom, dossier, icone, nb_qr, jeu)
        dest    = os.path.join(chemin, "index.html")
        with open(dest, "w", encoding="utf-8") as f:
            f.write(contenu)

        print(f"   ✅  {dest}")

    print()
    print("=" * 54)
    print(f"  {len(items)} page(s) générée(s) !")
    print("=" * 54)


if __name__ == "__main__":
    main()
