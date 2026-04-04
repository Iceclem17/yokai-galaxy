#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Générateur de pages QR-Codes (Y-Pièces) - Yo-kai Galaxy
=========================================================
Aucune dépendance externe. Python 3.6+ suffit.

Usage :
  1. Place ce script dans ton dossier de travail.
  2. Place aussi un fichier "tableau-ypieces.html" contenant les <div class="item">.
  3. Lance : python generer_ypieces.py
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
    """'y-pièce-momonyan' → 'y-piece-momonyan'"""
    sans = retirer_accents(dossier)
    return re.sub(r"[^a-zA-Z0-9\-]", "", sans)


# ──────────────────────────────────────────────────────────────
# Parsing HTML – comptage de profondeur (robuste)
# ──────────────────────────────────────────────────────────────

def extraire_blocs_item(html: str):
    """
    Extrait le contenu intérieur de chaque <div class="item">
    en comptant l'imbrication des <div>, indépendamment de la
    structure environnante (td, tr, etc.).
    """
    blocs = []
    ouverture = re.compile(r'<div\s+class=["\']item["\']>', re.IGNORECASE)

    for m in ouverture.finditer(html):
        debut      = m.end()
        profondeur = 1
        pos        = debut

        while pos < len(html) and profondeur > 0:
            prochaine_ouv  = html.find('<div', pos)
            prochain_ferm  = html.find('</div>', pos)

            if prochain_ferm == -1:
                break  # HTML malformé

            if prochaine_ouv != -1 and prochaine_ouv < prochain_ferm:
                profondeur += 1
                pos = prochaine_ouv + 4
            else:
                profondeur -= 1
                if profondeur == 0:
                    blocs.append(html[debut:prochain_ferm])
                else:
                    pos = prochain_ferm + 6

    return blocs


def extraire_items(html: str):
    """
    Pour chaque bloc <div class="item"> :
      - récupère l'icône (première <img src>)
      - récupère tous les <a href> non vides dans div.text
        → un item par lien
    """
    items = []

    for bloc in extraire_blocs_item(html):
        # Icône : première <img src="..."> du bloc
        m_img = re.search(r'<img\s[^>]*src=["\']([^"\']+)["\']', bloc)
        icone = m_img.group(1).split("/")[-1] if m_img else ""

        # Zone div.text
        m_text = re.search(r'<div\s+class=["\']text["\']>(.*?)</div', bloc, re.DOTALL)
        if not m_text:
            continue

        # Tous les liens avec href non vide
        liens = re.findall(
            r'<a\s+href=["\']([^"\']+)["\'][^>]*>([^<]+)</a>',
            m_text.group(1),
            re.DOTALL,
        )

        for href, nom_brut in liens:
            href = href.strip()
            nom  = nom_brut.strip()
            if not href:
                continue

            dossier = href.rstrip("/").split("/")[-1]
            if not dossier:
                continue

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
    lignes  = []
    for i in range(1, nb_qr + 1):
        src = f"../../../../images/qr-codes/blasters-2/{dossier}/qr-{prefixe}-{i}.png"
        lignes.append(f'              <img src="{src}">')
    return TEMPLATE.format(
        nom=nom, jeu=jeu, icone=icone,
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
    print("  Générateur Y-Pièces – Yo-kai Galaxy")
    print("=" * 54)
    print()

    source = demander("Fichier HTML source (tableau)", "tableau.html")
    if not os.path.isfile(source):
        print(f"\n❌  Fichier introuvable : {source}")
        sys.exit(1)

    with open(source, encoding="utf-8") as f:
        html = f.read()

    items = extraire_items(html)

    if not items:
        print('\n⚠️  Aucun item trouvé.')
        sys.exit(1)

    print(f"\n✅  {len(items)} y-pièces détectées.\n")

    jeu       = demander("Nom du jeu dans le <title>", "Yo-kai Watch Blasters 2")
    nb_str    = demander("Nombre de QR codes par défaut", "100")
    nb_defaut = int(nb_str) if nb_str.isdigit() else 100
    sortie    = demander("Dossier de sortie", ".")

    print()
    print("-" * 54)

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