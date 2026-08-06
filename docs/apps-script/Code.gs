/**
 * Zart — artisan request intake.
 *
 * Receives a request from zarthq.com, writes it to a Google Sheet,
 * saves any attached photo to Drive, and emails the people in NOTIFY.
 *
 * Setup instructions: see docs/apps-script/README.md in the website repo.
 */

// Everyone here gets an email for every request. Add or remove freely.
var NOTIFY = [
  "zarttemp@gmail.com",
  "ifedamoladaniel@gmail.com",
  "ebuhwhitney@gmail.com"
];

var SHEET_NAME = "Requests";
var DRIVE_FOLDER = "Zart request photos";

var HEADERS = [
  "Received",
  "Reference",
  "First name",
  "Last name",
  "Gender",
  "Location",
  "Phone (WhatsApp)",
  "Email",
  "Artisan types",
  "Other artisan type",
  "Preferred date",
  "Description",
  "Photo",
  "How did you hear",
  "Other source",
  "Status"
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Honeypot: real people leave this empty, bots fill it in.
    if (data.company) return json({ ok: true });

    var required = ["firstName", "lastName", "phoneNumber", "email", "description"];
    for (var i = 0; i < required.length; i++) {
      if (!data[required[i]]) {
        return json({ ok: false, error: "Missing " + required[i] }, 400);
      }
    }

    var sheet = getSheet();
    var reference = "ZRT-R" + String(sheet.getLastRow()).padStart(4, "0");
    var photoUrl = data.photo ? savePhoto(data.photo, reference) : "";
    var received = new Date();

    sheet.appendRow([
      received,
      reference,
      data.firstName,
      data.lastName,
      data.gender || "",
      data.location || "",
      data.phoneNumber,
      data.email,
      (data.artisanTypes || []).join(", "),
      data.otherArtisanType || "",
      data.preferredDate || "",
      data.description,
      photoUrl,
      data.howDidYouHear || "",
      data.otherHowDidYouHear || "",
      "New"
    ]);

    notify(data, reference, photoUrl, received);
    return json({ ok: true, reference: reference });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) }, 500);
  }
}

/** Lets you open the deployment URL in a browser to confirm it's live. */
function doGet() {
  return json({ ok: true, service: "Zart request intake" });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** data.photo arrives as a data URL: "data:image/jpeg;base64,...." */
function savePhoto(dataUrl, reference) {
  try {
    var match = /^data:([^;]+);base64,(.*)$/.exec(dataUrl);
    if (!match) return "";

    var mime = match[1];
    var bytes = Utilities.base64Decode(match[2]);
    var ext = mime.split("/")[1] || "jpg";
    var blob = Utilities.newBlob(bytes, mime, reference + "." + ext);

    var folders = DriveApp.getFoldersByName(DRIVE_FOLDER);
    var folder = folders.hasNext()
      ? folders.next()
      : DriveApp.createFolder(DRIVE_FOLDER);

    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    console.error("Photo save failed: " + err);
    return "";
  }
}

function notify(data, reference, photoUrl, received) {
  if (!NOTIFY.length) return;

  var trades = (data.artisanTypes || []).join(", ");
  var whatsapp = "https://wa.me/" + String(data.phoneNumber).replace(/[^0-9]/g, "").replace(/^0/, "234");

  var subject = "New Zart request — " + trades + " in " + (data.location || "Lagos");

  var rows = [
    ["Reference", reference],
    ["Name", data.firstName + " " + data.lastName],
    ["Trade", trades + (data.otherArtisanType ? " (" + data.otherArtisanType + ")" : "")],
    ["Location", data.location || ""],
    ["Preferred date", data.preferredDate || ""],
    ["WhatsApp", data.phoneNumber],
    ["Email", data.email],
    ["Gender", data.gender || ""],
    ["Heard via", data.howDidYouHear || ""],
    ["Received", received.toString()]
  ];

  var table = rows
    .map(function (r) {
      return (
        '<tr><td style="padding:6px 14px 6px 0;color:#5C635F;white-space:nowrap">' +
        r[0] +
        '</td><td style="padding:6px 0;font-weight:600;color:#0C1E22">' +
        escapeHtml(r[1]) +
        "</td></tr>"
      );
    })
    .join("");

  var html =
    '<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px">' +
    '<h2 style="color:#015A2F;margin:0 0 4px">New artisan request</h2>' +
    '<p style="color:#5C635F;margin:0 0 20px">' + reference + "</p>" +
    '<table style="border-collapse:collapse;font-size:14px">' + table + "</table>" +
    '<div style="margin:20px 0;padding:14px;background:#F7F6F3;border-left:3px solid #015A2F">' +
    '<div style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#5C635F;margin-bottom:6px">The problem</div>' +
    '<div style="color:#0C1E22">' + escapeHtml(data.description) + "</div></div>" +
    (photoUrl
      ? '<p><a href="' + photoUrl + '" style="color:#015A2F">View attached photo</a></p>'
      : "") +
    '<p style="margin-top:24px">' +
    '<a href="' + whatsapp + '" style="background:#015A2F;color:#fff;padding:11px 20px;' +
    'border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">' +
    "Message on WhatsApp</a></p>" +
    "</div>";

  MailApp.sendEmail({
    to: NOTIFY.join(","),
    subject: subject,
    htmlBody: html,
    replyTo: data.email,
    name: "Zart website"
  });
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function json(payload, code) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
