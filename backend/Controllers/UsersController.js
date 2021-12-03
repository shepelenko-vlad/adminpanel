const response = require('./../response')

const exportUsersToExcel = require('../settings/exportUserService')

const dbConnection = require('./../settings/dbConnection')
const setHeaders = require('./../settings/setHeaders')

exports.getUsers = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT UserID, clients.ClientFIO, UserLogin, UserPassword FROM users INNER JOIN clients ON users.ClientID = clients.ClientID', (error, row, fields) => {
        if(error){
            console.log(error);
        }
        else{
            response.status(row, res)
            console.log(row, res)
        }
    })
}

exports.insertUser = (req, res) => {
    setHeaders(res)
    const sqlQuery = "INSERT INTO users (ClientID, UserLogin, UserPassword) " 
                   + "VALUES (" + req.body.ClientID +", '" 
                                + req.body.UserLogin + "', '" 
                                + req.body.UserPassword + "')";
    dbConnection.query(sqlQuery, (error, results) => {
        if(error) {
            console.log(error);
        }
        else {
            response.status(results, res)
        }
    });
}

exports.updateUser = (req, res) => {
    setHeaders(res)
    const sqlQuery = "UPDATE users SET users.ClientID = " + req.body.ClientID 
                   + ", users.UserLogin = '" + req.body.UserLogin 
                   + "', users.UserPassword = '" + UserPassword 
                   + "' WHERE users.UserID = " + req.body.UserID + "";                           
        
        dbConnection.query(sqlQuery, (error, results) => {
        if(error) {
            console.log(error);
        }
        else {
            response.status(results, res)
        }
    })
}

exports.deleteUser = (req, res) => {
    setHeaders(res)
    const sqlQuery = "DELETE FROM users WHERE UserID = '" + req.params.UserID + "'";
    dbConnection.query(sqlQuery, (error, results) => {
        if(error) {
            console.log(error)
        }
        else {
            response.status(results, res)
        }
    })
}

exports.exportUsers = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT UserID, clients.ClientFIO, UserLogin, UserPassword FROM users INNER JOIN clients ON users.ClientID = clients.ClientID', (error, row, fields) => {
        if(error){
          console.log(error)
        }
        else{
          response.status(row,res)
        
          const workSheetColumnNames = [
            "Клиент",
            "Логин",
            "Пароль"
          ]
        
          const workSheetName = 'Пользователи';
          const filePath = 'D:/adminpanel/backend/Controllers/uploads/Users.xlsx';

          exportUsersToExcel(row, workSheetColumnNames, workSheetName, filePath);
        }
    })
}