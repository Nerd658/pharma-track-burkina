
# PharmaTrack Burkina: Documentation du Projet

## Introduction

PharmaTrack Burkina est une application web conçue pour aider les petites pharmacies et dépôts pharmaceutiques, en particulier dans les zones rurales du Burkina Faso, à gérer numériquement leurs stocks, leurs ventes et à obtenir des statistiques de base. L'objectif est de fournir un outil simple, moderne et efficace pour éviter les ruptures de stock et centraliser les informations.

## Fonctionnalités

L'application est dotée des fonctionnalités suivantes :

### 1. Gestion des Médicaments (CRUD)

Cette fonctionnalité permet de gérer l'inventaire des médicaments.

- **Lister les médicaments**: Affiche la liste complète des médicaments avec leur nom, catégorie, prix, quantité en stock et date d'expiration.
- **Ajouter un médicament**: Un formulaire réactif permet d'ajouter un nouveau médicament à la base de données.
- **Modifier un médicament**: Le même formulaire réactif est utilisé pour modifier les informations d'un médicament existant.
- **Supprimer un médicament**: Possibilité de supprimer un médicament de la liste.
- **Alerte de stock faible**: Les médicaments dont la quantité en stock est inférieure à 10 sont visuellement mis en évidence dans la liste pour une identification rapide.

### 2. Gestion des Ventes

Cette fonctionnalité permet d'enregistrer les ventes et de mettre à jour automatiquement les stocks.

- **Enregistrer une vente**: Un formulaire simple permet de sélectionner un médicament et de spécifier la quantité vendue.
- **Mise à jour automatique du stock**: Après chaque vente, la quantité en stock du médicament concerné est automatiquement décrémentée.
- **Historique des Ventes**: Une page dédiée affiche l'historique complet de toutes les ventes, avec des détails sur le médicament, la quantité, la date et le prix total de chaque transaction.

### 3. Dashboard & Statistiques

Le tableau de bord offre une vue d'ensemble de l'activité de la pharmacie.

- **Chiffre d'affaires du jour**: Affiche le revenu total généré par les ventes de la journée en cours.
- **Nombre de ventes du jour**: Affiche le nombre total de transactions de vente effectuées le jour même.
- **Médicaments en rupture de stock**: Liste les médicaments dont le stock est faible (quantité < 10).
- **Graphique des ventes**: Un graphique à barres simple montre l'évolution des ventes par semaine, offrant un aperçu visuel des performances.

### 4. Authentification & Sécurité

L'application dispose d'un système d'authentification simple pour sécuriser l'accès aux données.

- **Page de connexion**: Une page de connexion permet aux utilisateurs de s'authentifier.
- **Protection des routes**: La page de gestion des médicaments est protégée par un `AuthGuard`. Seuls les utilisateurs authentifiés peuvent y accéder.
- **Intercepteur HTTP**: Un `HttpInterceptor` est mis en place pour ajouter automatiquement un jeton d'authentification (factice) à toutes les requêtes HTTP sortantes, garantissant que les appels à l'API sont sécurisés.

### 5. Recherche Rapide

Une barre de recherche est disponible dans la barre de navigation pour permettre une recherche rapide et en temps réel des médicaments par nom.

## UI/UX Améliorations

- **Bouton de Connexion/Déconnexion Dynamique**: Le bouton dans la barre de navigation change dynamiquement de "Connexion" à "Déconnexion" en fonction de l'état d'authentification de l'utilisateur.
- **Indicateurs de Chargement**: Les formulaires de connexion, d'ajout/modification de médicaments et d'enregistrement des ventes affichent désormais un indicateur de chargement pendant la soumission, offrant un retour visuel clair à l'utilisateur.
- **Tri des Médicaments**: La table des médicaments peut maintenant être triée par nom, prix, quantité et date d'expiration, permettant une meilleure organisation des données.
- **Pagination**: La pagination a été ajoutée à la table des médicaments pour une navigation plus facile à travers de grands ensembles de données.

## Stack Technique

- **Framework Frontend**: Angular (v20+)
- **Architecture**: Composants Standalone
- **Gestion d'état**: Signaux Angular
- **Style**: SCSS
- **API Mock**: json-server
- **Graphiques**: Chart.js

## Démarrage

Pour lancer le projet en local, suivez ces étapes :

1.  **Cloner le dépôt** (si applicable).
2.  **Installer les dépendances**:
    ```bash
    npm install
    ```
3.  **Lancer le serveur mock**:
    Ouvrez un terminal et exécutez :
    ```bash
    npm run json-server
    ```
4.  **Lancer l'application Angular**:
    Ouvrez un second terminal et exécutez :
    ```bash
    ng serve
    ```
5.  **Accéder à l'application**:
    Ouvrez votre navigateur et allez à l'adresse `http://localhost:4200`.
