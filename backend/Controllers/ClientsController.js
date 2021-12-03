const response = require('./../response')

const exportClientsToExcel = require('../settings/exportClientsService')

const dbConnection = require('./../settings/dbConnection')
const setHeaders = require('./../settings/setHeaders')

exports.getClients = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT ClientID, ClientFIO, positions.PositionName, roles.RoleName, organizations.OrganizationName, ClientPhone FROM clients ' +
                       ' INNER JOIN positions ON clients.PositionID = positions.PositionID ' +
                       ' INNER JOIN roles ON clients.RoleID = roles.RoleID ' +
                       ' INNER JOIN organizations ON clients.OrganizationID = organizations.OrganizationID ', 
    (error, row, fields) => {
        if(error){
            console.log(error);
        }
        else{
            response.status(row, res)
            console.log(row, res)
        }
    })
}

exports.insertClients = (req, res) => {
    setHeaders(res)
    const sqlQuery = "INSERT INTO clients (ClientFIO, PositionID, RoleID, OrganizationID, ClientPhone) " 
                   + "VALUES ('" + req.body.ClientFIO +"', " 
                                + req.body.PositionID + ", " 
                                + req.body.RoleID + ", " 
                                + req.body.OrganizationID + ", '" 
                                + req.body.ClientPhone + "')";
    dbConnection.query(sqlQuery, (error, results) => {
        if(error) {
            console.log(error);
        }
        else {
            response.status(results, res)
        }
    });
}

exports.updateClient = (req, res) => {
    setHeaders(res)
    const sqlQuery = "UPDATE clients SET clients.ClientFIO = '" + req.body.ClientFIO 
                   + "', clients.PositionID = " + req.body.PositionID 
                   + ", clients.RoleID = " + req.body.RoleID 
                   + ", clients.OrganizationID = '" + req.body.OrganizationID
                   + "', clients.ClientPhone = '" + req.body.ClientPhone 
                   + "' WHERE clients.ClientID = " + req.body.ClientID + "";                           
        
        dbConnection.query(sqlQuery, (error, results) => {
        if(error) {
            console.log(error);
        }
        else {
            response.status(results, res)
        }
    })
}

exports.deleteClient = (req, res) => {
    setHeaders(res)
    const sqlQuery = "DELETE FROM clients WHERE ClientID = '" + req.params.ClientID + "'";
    dbConnection.query(sqlQuery, (error, results) => {
        if(error) {
            console.log(error)
        }
        else {
            response.status(results, res)
        }
    })
}

exports.exportClients = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT ClientID, ClientFIO, positions.PositionName, roles.RoleName, organizations.OrganizationName, ClientPhone FROM clients ' +
                       ' INNER JOIN positions ON clients.PositionID = positions.PositionID ' +
                       ' INNER JOIN roles ON clients.RoleID = roles.RoleID ' +
                       ' INNER JOIN organizations ON clients.OrganizationID = organizations.OrganizationID ', (error, row, fields) => {
        if(error){
          console.log(error)
        }
        else{
          response.status(row,res)
        
          const workSheetColumnNames = [
            "Клиент",
            "Должность",
            "Роль",
            "Организация", 
            "Телефон"
          ]
        
          const workSheetName = 'Клиенты';
          const filePath = 'D:/adminpanel/backend/Controllers/uploads/Clients.xlsx';

          exportClientsToExcel(row, workSheetColumnNames, workSheetName, filePath);
        }
    })
}

exports.getPositions = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT PositionID, PositionName from positions ', 
    (error, row, fields) => {
        if(error){
            console.log(error);
        }
        else{
            response.status(row, res)
            console.log(row, res)
        }
    })
}

exports.getRoles = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT RoleID, RoleName from roles ', 
    (error, row, fields) => {
        if(error){
            console.log(error);
        }
        else{
            response.status(row, res)
            console.log(row, res)
        }
    })
}

exports.getOrganizations = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT OrganizationID, OrganizationName from organizations', 
    (error, row, fields) => {
        if(error){
            console.log(error);
        }
        else{
            response.status(row, res)
            console.log(row, res)
        }
    })
}