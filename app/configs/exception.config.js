// Liste des exceptions (code, status, message)
module.exports = [
    { code: "CLIENT_004", status: 429, message: "Vous avez émis trop de requêtes dans un laps de temps donné. Veuillez réessayer dans un moment." },
    { code: "CLIENT_005", status: 500, message: "Le site a rencontré une erreur interne. Veuillez rafraîchir votre page." },
    { code: "CLIENT_006", status: 403, message: "Vous n'avez pas accès à ce contenu." },
    { code: "CLIENT_007", status: 404, message: "Ressource introuvable." },
    { code: "CLIENT_009", status: 400, message: "Le champ est requis." },
    { code: "CLIENT_010", status: 400, message: "Le champ n'est pas valide." },
    { code: "CLIENT_011", status: 400, message: "Format d'image invalide : sont autorisés les .PNG, .JPEG et .JPG." },
    { code: "CLIENT_012", status: 400, message: "Fichier corrompu." },
    { code: "CLIENT_013", status: 400, message: "Fichier trop lourd : 2Mo maximum." },
    { code: "CLIENT_014", status: 403, message: "Ce lien a expiré ou n'existe pas." },
    { code: "CLIENT_016", status: 403, message: "Votre identifiant ou votre mot de passe est incorrect." },
    { code: "CLIENT_019", status: 403, message: "Le format de l'image n'est pas valide (PNG/JPG)." },
    { code: "CLIENT_020", status: 403, message: "L'image est trop volumineuse (limit : 5 MO)." },
];
