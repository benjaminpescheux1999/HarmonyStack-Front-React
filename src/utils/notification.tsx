// Activer la notification
export function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            sendNotification("Nouvelle Notification", "Notification activé.");
            // TODO: Activer les notifications dans la base de données
        }
    });
}

// export function deactivateNotification() {
//     Notification.requestPermission().then(permission => {
//         if (permission === "granted") {
//             sendNotification("Nouvelle Notification", "Notification désactivé.");
//             // TODO: Désactiver les notifications dans la base de données
//         }
//     });
// }

// validate notification
function sendNotification(title: string, body: string) {
    const notification = new Notification(title, {
        body: body,
        icon: "/path/to/icon.png"
    });

    notification.onclick = () => {
        console.log('Notification cliquée');
    };
}