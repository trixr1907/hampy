# Anleitung zur Verwaltung der Homepage mit Decap CMS

Diese Anleitung erklärt, wie Sie Ihre Homepage schnell und einfach über eine benutzerfreundliche Oberfläche verwalten können.

## Was ist Decap CMS?

Decap CMS (früher Netlify CMS) ist ein Content-Management-System, das direkt mit Ihrem Git-Repository verbunden ist. Es bietet eine benutzerfreundliche Oberfläche zum Bearbeiten von Inhalten, ohne dass Sie Code direkt bearbeiten müssen.

## Zugriff auf das CMS

1. Gehen Sie zu Ihrer Website und fügen Sie `/admin/` an die URL an:
   ```
   https://hampy-homepage.windsurf.build/admin/
   ```

2. Melden Sie sich mit Ihren Netlify Identity-Anmeldedaten an. Falls Sie noch keine haben, bitten Sie Ihren Administrator, Sie als Benutzer hinzuzufügen.

## Inhalte bearbeiten

### Team-Mitglieder verwalten

1. Klicken Sie im Dashboard auf "Team Members"
2. Hier sehen Sie eine Liste aller Team-Mitglieder
3. Zum Bearbeiten eines Mitglieds klicken Sie auf den entsprechenden Eintrag
4. Zum Hinzufügen eines neuen Mitglieds klicken Sie auf "New Team Members"

Für jedes Team-Mitglied können Sie folgende Informationen bearbeiten:
- Name
- Position
- Foto (Bild hochladen)
- Bio (Kurzbeschreibung)
- Reihenfolge (bestimmt die Anzeigereihenfolge)

### Services/Dienstleistungen verwalten

1. Klicken Sie im Dashboard auf "Services"
2. Hier sehen Sie eine Liste aller Dienstleistungen
3. Zum Bearbeiten einer Dienstleistung klicken Sie auf den entsprechenden Eintrag
4. Zum Hinzufügen einer neuen Dienstleistung klicken Sie auf "New Services"

Für jede Dienstleistung können Sie folgende Informationen bearbeiten:
- Titel
- Icon (Material UI Icon-Name)
- Beschreibung
- Reihenfolge (bestimmt die Anzeigereihenfolge)

### Allgemeine Einstellungen

1. Klicken Sie im Dashboard auf "Site Settings" und dann auf "General Settings"
2. Hier können Sie grundlegende Informationen der Website bearbeiten:
   - Website-Titel
   - Beschreibung
   - Logo
   - Kontakt-E-Mail
   - Kontakt-Telefonnummer

## Änderungen veröffentlichen

Nachdem Sie Ihre Änderungen vorgenommen haben:

1. Klicken Sie auf die Schaltfläche "Save" (Speichern)
2. Ihre Änderungen werden automatisch in Ihr Git-Repository übertragen
3. Netlify erkennt die Änderungen und startet einen neuen Build-Prozess
4. Nach Abschluss des Builds (ca. 1-2 Minuten) sind Ihre Änderungen live

## Tipps zur Verwendung

- **Bilder**: Achten Sie darauf, dass hochgeladene Bilder eine angemessene Größe haben (idealerweise unter 500KB)
- **Icons**: Verwenden Sie für Icons die Namen aus der [Material UI Icon-Bibliothek](https://mui.com/material-ui/material-icons/)
- **Vorschau**: Sie können Ihre Änderungen in der Vorschau ansehen, bevor Sie sie veröffentlichen

## Fehlerbehebung

Falls Probleme auftreten:

1. Stellen Sie sicher, dass Sie mit dem Internet verbunden sind
2. Versuchen Sie, sich ab- und wieder anzumelden
3. Löschen Sie den Browser-Cache und versuchen Sie es erneut
4. Kontaktieren Sie den Administrator, wenn Probleme bestehen bleiben

---

Bei weiteren Fragen wenden Sie sich bitte an Ihren Website-Administrator.
