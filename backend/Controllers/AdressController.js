const response = require('./../response')

const exportAdressToExcel = require('../settings/exportAdressService')

const dbConnection = require('./../settings/dbConnection')
const setHeaders = require('./../settings/setHeaders')

exports.getAdresses = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT * FROM physicaladress', (error, row, fields) => {
        if(error){
            console.log(error);
        }
        else{
            response.status(row, res)
            console.log(row, res)
        }
    })
}

exports.insertAdress = (req, res) => {
    setHeaders(res)
    const sqlQuery = "INSERT INTO physicaladress (Country, City, Street, Building, Room) " 
                   + "VALUES ('" + req.body.Country + "', '" 
                                + req.body.City + "', '"
                                + req.body.Street + "', '"
                                + req.body.Building + "', '"
                                + req.body.Room +  "')";
    dbConnection.query(sqlQuery, (error, results) => {
        if(error) {
            console.log(error);
        }
        else {
            response.status(results, res)
        }
    });
}

exports.updateAdress = (req, res) => {
    setHeaders(res)
    const sqlQuery = "UPDATE physicaladress SET physicaladress.PhysicalAdressID = " + req.body.PhysicalAdressID 
                   + ", physicaladress.Country = '" + req.body.Country 
                   + "', physicaladress.City = '" + req.body.City
                   + "', physicaladress.Street = '" + req.body.Street
                   + "', physicaladress.Building = '" + req.body.Building
                   + "', physicaladress.Room = '" + req.body.Room
                   + "' WHERE physicaladress.PhysicalAdressID = " + req.body.PhysicalAdressID + "";                           
        
        dbConnection.query(sqlQuery, (error, results) => {
        if(error) {
            console.log(error);
        }
        else {
            response.status(results, res)
        }
    })
}

exports.deleteAdress = (req, res) => {
    setHeaders(res)
    const sqlQuery = "DELETE FROM physicaladress WHERE PhysicalAdressID = '" + req.params.PhysicalAdressID + "'";
    dbConnection.query(sqlQuery, (error, results) => {
        if(error) {
            console.log(error)
        }
        else {
            response.status(results, res)
        }
    })
}

exports.exportAdresses = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT * FROM physicaladress', (error, row, fields) => {
        if(error){
          console.log(error)
        }
        else{
          response.status(row,res)
        
          const workSheetColumnNames = [
            "Страна",
            "Город",
            "Улица",
            "Строение",
            "Помещение"
          ]
        
          const workSheetName = 'Адреса';
          const filePath = 'D:/adminpanel/backend/Controllers/uploads/Adreses.xlsx';

          exportAdressToExcel(row, workSheetColumnNames, workSheetName, filePath);
        }
    })
}