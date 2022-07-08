# Groupomania
Pour installer ce projet, vous devez d'abord installer
-Node.js
-MySQL

## Installation de la BDD
1. Ouvrir la console MySQL et créer un compte ou se connecter si vous en avez déjà un
2- Créer une base de données nommée "groupomania"
3- Importer le fichier "Groupomania_DB.sql" se trouvant dans le repo du projet

## Installation du backend
1. Dans le terminal, se placer dans le dossier /backend/
2. Installer npm en exécutant la commande => *npm install --save-dev*
3. Installer nodemon en exécutant la commande => *npm install -g nodemon*
3. Modifier le fichier config.json qui se situe dans le dossier /config/ avec les informations de votre compte MySQL :
    - "username": "VOTRE_NOM_UTILISATEUR_MYSQL"
    - "password": "VOTRE_MOT_DE_PASSE_MYSQL"
4. Lancer le serveur de développement avec la commande => *nodemon server*

## Installation du frontend
1. Dans le terminal, se placer dans le dossier /Frontend/
2. Installer npm en exécutant la commande => *npm install --save-dev*
3. Lancer la construction du Frontend avec la commande => *npm start*

