// Buka Ekstensi > Apps Script di Google Sheets Anda, lalu paste kode ini.

function doPost(e) {
  // CORS Handling
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  try {
    // Karena kita akan mengirim data sebagai text/plain dari Frontend (menghindari CORS preflight)
    var req = JSON.parse(e.postData.contents);
    var action = req.action;
    var tableName = req.table;
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(tableName);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Sheet tidak ditemukan!'})).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'insert') {
      // Contoh req.data: { no_permohonan: "123", nama: "Budi", ... }
      var headersRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      var rowData = [];
      
      // Auto increment ID (Asumsi kolom pertama adalah 'id')
      var lastRow = sheet.getLastRow();
      var newId = 1;
      if (lastRow > 1) {
        newId = Number(sheet.getRange(lastRow, 1).getValue()) + 1;
      }
      
      req.data['id'] = newId;

      for (var i = 0; i < headersRow.length; i++) {
        var header = headersRow[i];
        rowData.push(req.data[header] || "");
      }
      
      sheet.appendRow(rowData);
      
      return ContentService.createTextOutput(JSON.stringify({status: 'success', id: newId})).setMimeType(ContentService.MimeType.JSON);
    }
    
    else if (action === 'update' || action === 'delete') {
      var id = req.id;
      var dataRange = sheet.getDataRange();
      var values = dataRange.getValues();
      var headersRow = values[0];
      var rowIndex = -1;
      
      // Cari baris berdasarkan ID
      for (var r = 1; r < values.length; r++) {
        if (values[r][0] == id) { // Asumsi ID ada di kolom pertama
          rowIndex = r + 1;
          break;
        }
      }
      
      if (rowIndex === -1) {
        return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Data tidak ditemukan!'})).setMimeType(ContentService.MimeType.JSON);
      }
      
      if (action === 'delete') {
        sheet.deleteRow(rowIndex);
        return ContentService.createTextOutput(JSON.stringify({status: 'success'})).setMimeType(ContentService.MimeType.JSON);
      } 
      else if (action === 'update') {
        for (var key in req.data) {
          var colIndex = headersRow.indexOf(key);
          if (colIndex > -1) {
            sheet.getRange(rowIndex, colIndex + 1).setValue(req.data[key]);
          }
        }
        return ContentService.createTextOutput(JSON.stringify({status: 'success'})).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Autentikasi / Login Check
    else if (action === 'login') {
      sheet = ss.getSheetByName('users');
      var values = sheet.getDataRange().getValues();
      var headersRow = values[0];
      var userIdx = headersRow.indexOf('username');
      var passIdx = headersRow.indexOf('password');
      var roleIdx = headersRow.indexOf('role');
      
      for (var i = 1; i < values.length; i++) {
        if (values[i][userIdx] == req.username && values[i][passIdx] == req.password) {
          return ContentService.createTextOutput(JSON.stringify({
            status: 'success', 
            role: values[i][roleIdx],
            token: 'auth_' + Date.now() // Token simulasi sederhana
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Username atau Password salah!'})).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var tableName = e.parameter.table;
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(tableName);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Sheet tidak ditemukan!'})).setMimeType(ContentService.MimeType.JSON);
    }
    
    var dataRange = sheet.getDataRange();
    var values = dataRange.getValues();
    var headers = values[0];
    var jsonData = [];
    
    for (var i = 1; i < values.length; i++) {
      var rowObj = {};
      for (var j = 0; j < headers.length; j++) {
        rowObj[headers[j]] = values[i][j];
      }
      jsonData.push(rowObj);
    }
    
    return ContentService.createTextOutput(JSON.stringify({status: 'success', data: jsonData})).setMimeType(ContentService.MimeType.JSON);
    
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}