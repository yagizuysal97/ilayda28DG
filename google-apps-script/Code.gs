/**
 * İlayda 28 — Anı Defteri Backend
 * ---------------------------------------------------------
 * Bu dosyayı script.google.com üzerinde yeni bir Apps Script
 * projesine YAPIŞTIR (kopyala-yapıştır). Kurulum adımları için
 * ana README.md dosyasına bak.
 * ---------------------------------------------------------
 */

// js/config.js içindeki SECRET_TOKEN ile BİREBİR AYNI olmalı.
const SECRET_TOKEN = "ilayda28";

// Kullanılacak sheet'in adı (aynı Google E-Tablosu içinde).
const SHEET_NAME = "Mesajlar";

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["timestamp", "name", "message"]);
  }
  return sheet;
}

// Siteden gelen yeni anı defteri mesajını kaydeder.
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = (data.name || "").toString().slice(0, 200);
    const message = (data.message || "").toString().slice(0, 2000);

    if (!name || !message) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: "missing fields" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = getSheet_();
    const timestamp = Utilities.formatDate(new Date(), "GMT+3", "dd.MM.yyyy HH:mm");
    sheet.appendRow([timestamp, name, message]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// admin.html sayfasının mesajları listeleyebilmesi için.
// ?token=... parametresi config.js'teki SECRET_TOKEN ile eşleşmezse boş döner.
function doGet(e) {
  const token = e.parameter.token || "";
  if (token !== SECRET_TOKEN) {
    return ContentService
      .createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1).map(function (row) {
    return { timestamp: row[0], name: row[1], message: row[2] };
  });

  return ContentService
    .createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}
