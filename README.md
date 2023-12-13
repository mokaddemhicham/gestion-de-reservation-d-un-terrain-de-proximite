# Gestion de réservation d'un terrain de proximité

## Description

Le projet de Réservation de Terrains est une application web conçue pour simplifier le processus de réservation de terrains de sport ( football ). L'application vise à offrir une plateforme conviviale où les utilisateurs peuvent consulter la disponibilité des terrains, effectuer des réservations et faciliter le suivi des paiements associés.

## Fonctionnalités Principales

1. **Gestion des Utilisateurs :**
    - Inscription et connexion pour les utilisateurs, avec des rôles distincts tels que Propriétaire de Terrain, Client, et Administrateur.

2. **Gestion des Terrains :**
    - Possibilité pour les propriétaires de terrains d'ajouter, mettre à jour, et supprimer des terrains.
    - Consultation des terrains disponibles par les clients.

3. **Réservations :**
    - Les clients peuvent effectuer des réservations pour les terrains disponibles.
    - Les propriétaires peuvent consulter les réservations effectuées pour leurs terrains.

4. **Paiements :**
    - Intégration avec un processeur de paiement tiers pour traiter les transactions financières liées aux réservations.
    - Suivi des paiements et des statuts de transaction.

5. **Administration :**
    - Interface d'administration pour gérer les utilisateurs, les terrains, et suivre l'activité générale du système.

## Technologies Utilisées

- **Backend :** [JAVA], [Spring Boot], [Spring Security], [Spring Data JPA], [JUnit]
- **Frontend :** [JAVASCRIPT], [Angular], [Bootstrap], [HTML], [CSS]
- **Base de Données :** [MySQL]
- **Outils de Développement :** [Maven], [Git], [GitHub], [Postman], [Swagger]

## Comment Utiliser l'Application

1. **Inscription et Connexion :**
    - Les utilisateurs peuvent s'inscrire avec un rôle spécifique (propriétaire, client, administrateur) en fournissant les informations requises.
    - La connexion se fait en utilisant les identifiants enregistrés.

2. **Gestion des Terrains :**
    - Les propriétaires peuvent gérer leurs terrains via une interface dédiée.
    - Les clients peuvent parcourir les terrains disponibles et visualiser leurs détails.

3. **Réservations :**
    - Les clients peuvent effectuer des réservations en sélectionnant un terrain, une date et une heure spécifiques.
    - Les propriétaires peuvent consulter les détails des réservations effectuées pour leurs terrains.

4. **Paiements :**
    - Les paiements sont traités automatiquement par le processeur de paiement tiers.

5. **Administration :**
    - Les administrateurs ont un accès complet à l'interface d'administration pour gérer les utilisateurs, les terrains, et surveiller l'activité.

## Exécution du Projet

1. Clonez ce référentiel sur votre machine locale.
2. Assurez-vous d'avoir toutes les dépendances requises installées (voir les deux fichiers `package.json` et `pom.xml`).
3. Exécutez l'application en suivant les instructions spécifiques au langage et au framework.

## Perspectives Futures

Le projet pourrait évoluer en intégrant des fonctionnalités telles que la gestion des commentaires, la géolocalisation des terrains, ou encore des options de personnalisation avancées.

