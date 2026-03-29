/**
 * VIRTUOSOLVE — Google Apps Script para recibir leads del formulario web
 * ─────────────────────────────────────────────────────────────────────
 * INSTRUCCIONES DE INSTALACIÓN (5 minutos):
 *
 *  1. Abra Google Sheets: https://sheets.google.com
 *     Cree una hoja nueva y llámela "Leads Virtuosolve".
 *
 *  2. En el menú superior: Extensiones → Apps Script
 *
 *  3. Borre todo el contenido que aparece y pegue TODO este archivo.
 *
 *  4. Haga clic en el botón "Guardar" (icono de disco).
 *
 *  5. Haga clic en "Implementar" → "Nueva implementación".
 *     - Tipo: Aplicación web
 *     - Ejecutar como: Yo (su cuenta de Google)
 *     - Quién tiene acceso: Cualquier usuario (Anyone)
 *     Haga clic en "Implementar".
 *
 *  6. Copie la URL que aparece ("URL de la aplicación web").
 *
 *  7. Abra index.html y pegue esa URL en la constante SHEET_URL:
 *        const SHEET_URL = 'https://script.google.com/macros/s/...';
 *
 *  8. Guarde y suba a GitHub (git add . && git commit && git push).
 *
 *  Listo. Cada lead del formulario aparecerá como una fila nueva
 *  en su hoja de Google Sheets, con fecha y hora incluidas.
 *  Desde Google Sheets puede exportar a Excel (.xlsx) en cualquier momento:
 *  Archivo → Descargar → Microsoft Excel.
 * ─────────────────────────────────────────────────────────────────────
 */

const HEADERS = ['Fecha', 'Hora', 'Nombre', 'Clínica', 'Email', 'Teléfono', 'Presupuesto'];

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Crear cabeceras si la hoja está vacía
    if (sheet.getLastRow() === 0) {
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setValues([HEADERS]);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1a1a2e');
      headerRange.setFontColor('#ffffff');
      sheet.setFrozenRows(1);

      // Ajustar ancho de columnas
      sheet.setColumnWidth(1, 110); // Fecha
      sheet.setColumnWidth(2, 80);  // Hora
      sheet.setColumnWidth(3, 180); // Nombre
      sheet.setColumnWidth(4, 200); // Clínica
      sheet.setColumnWidth(5, 220); // Email
      sheet.setColumnWidth(6, 140); // Teléfono
      sheet.setColumnWidth(7, 200); // Presupuesto
    }

    const data  = JSON.parse(e.postData.contents);
    const now   = new Date();
    const fecha = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy');
    const hora  = Utilities.formatDate(now, Session.getScriptTimeZone(), 'HH:mm:ss');

    const newRow = [
      fecha,
      hora,
      data.nombre      || '',
      data.clinica     || '',
      data.email       || '',
      data.telefono    || '',
      data.presupuesto || '',
    ];

    sheet.appendRow(newRow);

    // Alternar color de filas para mejor legibilidad
    const lastRow = sheet.getLastRow();
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, HEADERS.length).setBackground('#f8f9ff');
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función de prueba — ejecute esto manualmente desde Apps Script para verificar
function testInsert() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log('Hoja activa: ' + sheet.getName());
  Logger.log('Filas actuales: ' + sheet.getLastRow());
}
