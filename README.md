<<<<<<< HEAD
readme
=======
# PharmaTrack Burkina Faso 🇧🇫

Ce dépôt contient le code de **PharmaTrack Burkina**, une petite application que nous avons conçue pour aider les petites pharmacies et dépôts pharmaceutiques, notamment en zone rurale au Burkina Faso. L'idée est de proposer un outil de gestion simple, moderne et agréable à utiliser pour suivre les stocks, éviter les ruptures et voir l'historique des ventes.

## 🌟 Ce qui rend cette application spéciale

-   **Interface simple et directe :** On a fait une refonte complète pour que l'interface soit épurée et facile à utiliser, même sans être un expert en informatique.
-   **Rapide et réactive :** L'application utilise les dernières nouveautés d'Angular (Standalone, Signaux) pour être la plus fluide possible.
-   **Logique "intelligente" :** Le système a quelques garde-fous pour éviter les erreurs, comme par exemple empêcher de vendre un produit qui n'est plus en stock.
-   **Code propre :** On a essayé de garder le code modulaire et facile à maintenir, pour que d'autres puissent le reprendre ou le faire évoluer sans s'arracher les cheveux.
-   **Prête pour un vrai backend :** Pour l'instant, l'application tourne avec un faux backend (`json-server`), mais elle est prête à être branchée sur une vraie API sans avoir à tout réécrire.

## ✨ Les Fonctionnalités

Voici ce que l'on peut faire avec l'application :

-   **Gérer l'inventaire :**
    -   Voir la liste de tous les médicaments, avec la possibilité de trier et rechercher.
    -   Ajouter, modifier ou supprimer un produit via un formulaire simple.
    -   Garder un œil sur le prix, la quantité et la date d'expiration.

-   **Suivre les stocks :**
    -   Le tableau de bord vous alerte directement si un produit passe sous le seuil de **5 unités**.
    -   Des couleurs sur les badges de quantité vous aident à voir rapidement ce qui est urgent.

-   **Gérer les ventes :**
    -   Enregistrer une vente en quelques clics.
    -   Le stock se met à jour tout seul après chaque vente.

-   **Tableau de bord :**
    -   Un aperçu rapide du chiffre d'affaires et du nombre de ventes de la journée.
    -   Un graphique simple pour voir la tendance des ventes.

## 🛠️ Nos choix techniques

Pour les curieux, voici la stack technique et pourquoi on l'a choisie :

-   **Angular (v20+) :** On a utilisé la dernière version pour profiter de toutes les nouveautés.
-   **Architecture Standalone :** On n'utilise plus de `NgModules`. Chaque composant est indépendant. C'est plus simple à gérer et l'application se charge plus vite.
-   **Signaux Angular :** Pour gérer l'état des composants (savoir ce qui est affiché, ce qui est sélectionné, etc.), on utilise uniquement les signaux. C'est très performant et ça simplifie beaucoup le code.
-   **Nouveau "Control Flow" (`@if`, `@for`) :** C'est une nouvelle façon d'écrire les conditions et les boucles dans les templates HTML, c'est plus propre et plus rapide.
-   **SCSS et Design System :** On a défini une palette de couleurs et des variables de style pour que le design soit cohérent et facile à modifier. Les icônes viennent de [Feather Icons](https://feathericons.com/).
-   **Backend Mock avec `json-server` :** Ça nous a permis de développer toute la partie frontend sans avoir besoin d'un vrai backend. C'est très pratique pour prototyper.

### 🤖 Un Mot sur l'Utilisation de l'IA

Pour le développement de ce projet, nous avons utilisé une assistance par Intelligence Artificielle (IA). Cet outil nous a permis d'accélérer considérablement plusieurs phases du développement :

-   **Génération de code :** Pour rapidement mettre en place des composants, des services ou des tests.
-   **Refactoring :** Pour améliorer la structure du code et appliquer de nouvelles conventions de manière uniforme.
-   **Design et Intégration :** Pour proposer et implémenter rapidement un design moderne et cohérent sur toute l'application.
-   **Documentation :** Pour générer et maintenir une documentation claire comme ce `README`.

L'utilisation de l'IA comme un "pair programmer" nous a permis de nous concentrer sur les aspects les plus importants : l'architecture globale, l'expérience utilisateur et la richesse fonctionnelle de l'application, tout en livrant un produit de haute qualité dans un temps réduit.

## 🚀 Comment lancer le projet

Pour faire tourner l'application sur votre machine :

**Prérequis :**
-   Node.js (v18 ou plus)
-   Angular CLI (v20 ou plus)

**1. Installation**
Clonez le projet, puis installez les dépendances :
```bash
git clone <URL_DU_DEPOT>
cd pharma-track-burkina
npm install
```

**2. Lancement**
Il faut lancer **deux commandes** dans **deux terminaux séparés**.

-   **Terminal 1 (pour le faux backend) :**
    ```bash
    npm run json-server
    ```
    *(Le serveur de données tournera sur `http://localhost:3000`)*

-   **Terminal 2 (pour l'application) :**
    ```bash
    npm run start
    ```
    *(L'application sera visible sur `http://localhost:4200`)*

## 📜 Autres Scripts Utiles

| Script        | Description                               |
|---------------|-------------------------------------------|
| `build`       | Compile le projet pour la production.     |
| `watch`       | Recompile dès qu'un fichier est modifié.  |
| `test`        | Lance les tests.                          |

## 🏗️ Déploiement (Build)

Pour créer une version de production de l'application, prête à être déployée, lancez la commande suivante :

```bash
npm run build
```

Cette commande va compiler et optimiser l'application. Les fichiers finaux, statiques (HTML, CSS, JS), seront générés dans le dossier `dist/pharma-track-burkina`. C'est le contenu de ce dossier que vous devez héberger sur votre serveur web.

## 📸 Captures d'Écran

Vous trouverez dans le dossier `/captures` des captures d'écran des différentes pages de l'application. Cela vous donnera un aperçu rapide de l'interface et de l'expérience utilisateur.

>>>>>>> master
