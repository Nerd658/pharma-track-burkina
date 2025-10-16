# Suivi du projet PharmaTrack Burkina

Hello! Here is where I'll be keeping a detailed journal of everything I do to build the application. Think of it as my developer diary. This way, you can follow my progress every step of the way.

## Étape 0 : Préparation de l'environnement

- **15/10/2025**
    - I'm starting by setting up the entire project from scratch.
    - I've installed the Angular CLI, which is the official tool for creating and managing Angular projects.
    - I've created the main project `pharma-track-burkina` with all the modern features requested: standalone components, routing, and SCSS for styling.
    - I've set up the mock backend with `json-server` and created the `db.json` file with some initial data for medicines, sales, and users.
    - I've added a convenient script to `package.json` to easily start this mock server.
    - I'm creating this `suivie.md` file to keep you informed of all my actions.

## Étape 1 : Structure de base

- **15/10/2025**
    - I'm starting to build the basic structure of the application.
    - I've just generated a `LayoutComponent` which will serve as the main container for the application, including the navigation bar and the content area.
    - I've cleaned up the main `AppComponent` to only display this layout.
    - I've created the placeholder components for our main features: `Dashboard`, `Medicines`, and `Sales`.
    - I've set up the main application routing to lazy-load these feature components. This is a great practice for performance, as it only loads the code for a specific page when the user navigates to it.

## Étape 2 : Authentification

- **15/10/2025**
    - I have now implemented the authentication system.
    - I created an `AuthService` to handle user login and logout, and to keep track of the user's authentication state using a signal.
    - I built the `LoginComponent` with a simple form for the user to enter their credentials.
    - I implemented an `AuthGuard` to protect routes that require authentication. For now, it's protecting the 'Medicaments' page.
    - I created an `HttpInterceptor` that automatically adds the authentication token to all outgoing requests, so we don't have to do it manually every time.

## Étape 3 : CRUD des Médicaments

- **15/10/2025**
    - I have implemented the entire feature for managing medicines.
    - I created a `MedicinesService` to handle all the data operations (Create, Read, Update, Delete) for medicines by communicating with our mock API.
    - The `MedicinesComponent` now displays a list of all medicines and allows users to initiate adding, editing, or deleting a medicine.
    - I built a `MedicineFormComponent` using reactive forms to handle the creation and updating of medicines, including input validations to ensure data quality.
    - The form is displayed and hidden directly on the medicines page for a smooth user experience.

## Étape 4 : Gestion des Ventes

- **15/10/2025**
    - I've now set up the sales recording functionality.
    - I created a `SalesService` that handles recording new sales and, importantly, automatically updates the stock of the sold medicine.
    - The `SalesComponent` provides a simple form to select a medicine and enter the quantity sold. This makes recording a sale quick and easy.

## Étape 5 : Dashboard

- **15/10/2025**
    - I've built the dashboard, which is the central hub of the application.
    - It displays key statistics like the total revenue and number of sales for the day. These stats are calculated in real-time using computed signals.
    - It also shows a list of medicines that are low in stock, making it easy to see what needs to be reordered.
    - I've integrated a simple bar chart to visualize the weekly sales evolution, giving a quick overview of the pharmacy's performance.

## Étape 6 : Finalisation

- **15/10/2025**
    - I'm now in the final phase of the project.
    - I've added a quick search bar to the navigation, which allows users to easily find a medicine by name. The search is reactive and filters the list of medicines in real-time.
    - I've also polished the global styles of the application to give it a more modern and clean look and feel.

## Améliorations UI/UX

- **15/10/2025**
    - I've started improving the UI and UX of the application.
    - The login/logout button in the navigation bar is now dynamic and reflects the user's authentication state.
    - I've added loading indicators to the login, medicine, and sales forms to provide better feedback to the user during async operations.
    - The medicines table now supports sorting by name, price, quantity, and expiration date.
    - I've also added pagination to the medicines table to make it easier to navigate through a large number of products.

- **16/10/2025**
    - I have added a Sales History page to the application.
    - This new page displays a detailed history of all sales, including the medicine name, quantity, date, and total price for each sale.
    - I have also updated the navigation to include a dropdown for the sales section, with links to record a new sale and to view the sales history.

## Projet Terminé

- **15/10/2025**
    - The development of the PharmaTrack Burkina application is now complete.
    - All the required features have been implemented, following the best practices for modern Angular development.
    - The application is now ready to be tested.

### Comment lancer l'application

1.  Ouvrez deux terminaux.
2.  Dans le premier terminal, naviguez jusqu'au dossier `pharma-track-burkina` et lancez le serveur mock avec la commande :
    ```bash
    npm run json-server
    ```
3.  Dans le second terminal, naviguez jusqu'au dossier `pharma-track-burkina` et lancez l'application Angular avec la commande :
    ```bash
    ng serve
    ```
4.  Ouvrez votre navigateur et allez à l'adresse `http://localhost:4200`.
