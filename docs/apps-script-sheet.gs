/**
 * VirtuoSolve — Receptor de solicitudes del formulario web.
 *
 * Pasos:
 * 1. Crea una Google Sheet nueva (ej. "Solicitudes VirtuoSolve").
 * 2. En la fila 1, pon estas cabeceras (en este orden) en las columnas A-G:
 *      Fecha | Nombre | Empresa | Email | Presupuesto | Descripción | Origen
 * 3. Menú "Extensiones" → "Apps Script". Borra el código por defecto y pega
 *    este archivo entero. Guarda con Cmd+S.
 * 4. Botón azul "Implementar" → "Nueva implementación" → tipo "Aplicación web".
 *      - Ejecutar como: "Yo (tu_email@gmail.com)"
 *      - Quién tiene acceso: "Cualquiera"  ←  importante
 *    Pulsa "Implementar" y autoriza los permisos. Copia la URL que termina en
 *    /exec — pégala en components/sections/contact.tsx (constante SCRIPT_URL).
 *
 * Para actualizar el script más adelante: "Implementar" → "Gestionar
 * implementaciones" → editar la existente → "Versión: Nueva" → Implementar.
 * Así NO cambia la URL.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var body = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      body.nombre || "",
      body.empresa || "",
      body.email || "",
      body.presupuesto || "",
      body.descripcion || "",
      body.origen || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Útil para comprobar que el script está vivo: abre la /exec en el navegador.
function doGet() {
  return ContentService
    .createTextOutput("OK · VirtuoSolve receiver")
    .setMimeType(ContentService.MimeType.TEXT);
}
