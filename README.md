# AREA Project

## Contributors

### Frontend
| [<img src="https://github.com/Chasfory.png?size=85" width=85><br><sub>Laetitia bousch</sub>](https://github.com/Chasfory) | [<img src="https://github.com/leo-l-huillier.png?size=85" width=85><br><sub>Leo L'huillier</sub>](https://github.com/leo-l-huillier) | [<img src="https://github.com/parosa47.png?size=85" width=85><br><sub>Pier-Alexandre Rosa</sub>](https://github.com/parosa47)
| :---: | :---: | :---: |

### Backend
| [<img src="https://github.com/chuipagro.png?size=85" width=85><br><sub>Pablo Levy</sub>](https://github.com/pablo0675) | [<img src="https://github.com/steci.png?size=85" width=85><br><sub>Léa guillemard</sub>](https://github.com/steci)
|:----------------------------------------------------------------------------------------------------------------------:| :---: |

### devops
| [<img src="https://github.com/steci.png?size=85" width=85><br><sub>Léa guillemard</sub>](https://github.com/steci)
| :---: |

## Introduction
Bienvenue sur le dépôt du projet AREA. AREA signifie Action-REAction et est inspiré par le service populaire IFTTT.

## Fonctionnalités
- **Automatisation des tâches** : Configurez des actions conditionnelles pour automatiser les tâches entre différents services web.
- **Intégrations** : AREA supporte de nombreuses intégrations avec des services populaires comme GitHub, Twilio, et plus.
- **Personnalisation** : Les utilisateurs peuvent créer des applets personnalisés qui correspondent à leurs besoins spécifiques.

## Commencer
Pour commencer à utiliser AREA, suivez ces étapes :

1. **Clonez le dépôt** : `git clone https://github.com/pablo0675/area`
2. **Installez les dépendances** : `npm install` (assurez-vous d'avoir Node.js installé)
3. **Lancez le web** : `cd web/ && PORT=8081 npm start`
4. **Lancez le backend** : `cd backend/ && npm start`
5. **Lancez le bot** : `cd discord_bot/ && npm start`

Ou utilisez docker-compose :

1. **Clonez le dépôt** : `git clone https://github.com/pablo0675/area`
2. **build l'image** : `sudo docker-compose build`
3. **Lancez l'application** : `sudo docker-compose up`

## Configuration
Avant de lancer l'application, vous devez configurer les clés API nécessaires pour les services intégrés. Creez les fichiers .env en vous basant sur les fichiers .env.example et ajoutez les clés API nécessaires.

## Documentation

Backend : https://localhost:8080/documentation (swagger)

## Services intégrés
- **GitHub**
- **Spotify**
- **clock**
- **weather**
- **nasa**
- **riot**
- **steam**
- **discord**
- **google**
- **minecraft**
- **microsoft**



