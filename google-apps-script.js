/**
 * VIRTUOSOLVE — Google Apps Script para recibir leads del formulario web
 * ─────────────────────────────────────────────────────────────────────
 * INSTRUCCIONES DE INSTALACIÓN:
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
 *     Haga clic en "Implementar" y AUTORICE los permisos que pida.
 *
 *  6. Copie la URL que aparece y péguela en index.html en SHEET_URL.
 *
 *  IMPORTANTE: Si ya tenía una implementación anterior, cree una NUEVA
 *  implementación (no edite la existente) para que los cambios surtan efecto.
 * ─────────────────────────────────────────────────────────────────────
 */

const HEADERS = ['Fecha', 'Hora', 'Nombre', 'Clínica', 'Email', 'Teléfono', 'Presupuesto'];

function doGet(e) {
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
      sheet.setColumnWidth(1, 110);
      sheet.setColumnWidth(2, 80);
      sheet.setColumnWidth(3, 180);
      sheet.setColumnWidth(4, 200);
      sheet.setColumnWidth(5, 220);
      sheet.setColumnWidth(6, 140);
      sheet.setColumnWidth(7, 200);
    }

    const p    = e.parameter;
    const now  = new Date();
    const fecha = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy');
    const hora  = Utilities.formatDate(now, Session.getScriptTimeZone(), 'HH:mm:ss');

    sheet.appendRow([
      fecha,
      hora,
      p.nombre      || '',
      p.clinica     || '',
      p.email       || '',
      p.telefono    || '',
      p.presupuesto || '',
    ]);

    // Alternar color de filas para mejor legibilidad
    const lastRow = sheet.getLastRow();
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, HEADERS.length).setBackground('#f0f4ff');
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función de prueba — ejecútela manualmente desde Apps Script para verificar permisos
function testInsert() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const now   = new Date();
  sheet.appendRow([
    Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy'),
    Utilities.formatDate(now, Session.getScriptTimeZone(), 'HH:mm:ss'),
    'Prueba Nombre',
    'Clínica Test',
    'test@test.com',
    '+34 600 000 000',
    '1.000 € – 3.000 €/mes',
  ]);
  Logger.log('Fila insertada correctamente en fila ' + sheet.getLastRow());
}
