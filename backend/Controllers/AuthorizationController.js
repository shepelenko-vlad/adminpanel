const response = require('./../response')

const dbConnection = require('./../settings/dbConnection')
const setHeaders = require('./../settings/setHeaders')

exports.getlogin = (req,res) => {
    setHeaders(res)

    dbConnection.query('SELECT COUNT(*) AS count, clients.RoleID, users.UserID '
                     + 'FROM clients INNER JOIN users '
                     + 'ON clients.ClientID = users.ClientID '
                     + 'WHERE UserLogin = "' + req.body.UserLogin 
                     + '" AND UserPassword = "' + req.body.UserPassword + '";',
    (error, results) => {
        if(error){
            console.log(error)
        }
        else{
            var rows = JSON.parse(JSON.stringify(results[0]));
            response.status(rows, res)
        }
    })

}