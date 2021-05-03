# Sport & Co - Back



Repository du projet Sport & Co (Back).

Client : Sofian Maabout

Consultant : Domonkos Denes, Thibault De Ce, Nathan Joubert, Amine Khelifi, Allan Mendjeli


# Commandes Git

## git add

La commande git add peut être utilisée pour ajouter des fichiers à l’index. Par exemple, la commande suivante
ajoutera un fichier nommé temp.txt dans le répertoire local de l’index:

git add temp.txt

## git commit

La commande git commit permet de valider les modifications apportées au HEAD.
Notez que tout commit ne se fera pas dans le dépôt distant.

git commit –m “Description du commit”

## git status

La commande git status affiche la liste des fichiers modifiés ainsi
que les fichiers qui doivent encore être ajoutés ou validés. Usage:
git status

## git pull
Pour fusionner toutes les modifications présentes sur le dépôt distant dans le répertoire de travail local, la commande pull est utilisée. Usage:

git pull


## git push

Git push est une autre commandes GIT de base. Un simple push envoie les modifications
locales apportées à la branche principale associée :

git push origin master


## git checkout

La commande git checkout peut être utilisée pour créer des branches ou pour basculer entre elles. Par exemple nous allons créer une branche:

git checkout -b <nom-branche>

Pour passer simplement d’une branche à une autre, utilisez:

git checkout <nom-branche>


## Branche git
La commande git branch peut être utilisée pour répertorier, créer ou supprimer des branches. Pour répertorier toutes les branches présentes dans le dépôt, utilisez:

git branch

Pour supprimer une branche:

git branch –d <nom-branche>


## Git merge
La commande git merge est utilisée pour fusionner une branche dans la branche active. Usage:

git merge <nom-branche>

## Git diff
La commande git diff permet de lister les conflits. Pour visualiser les conflits d’un fichier, utilisez

git diff --base <nom-fichier>
