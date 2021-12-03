const response = require('./../response')

const dbConnection = require('./../settings/dbConnection')
const setHeaders = require('./../settings/setHeaders')

exports.getDocuments = (req, res) => {
    setHeaders(res)

    const roleID = req.body.RoleID;
    const userID = req.body.UserID;

    if (roleID === 1)
    {
        dbConnection.query('SELECT DocumentID, clients.ClientFIO, DocumentName, status.StatusName FROM documents '
                         + 'INNER JOIN users ON documents.UserID = users.UserID '
                         + 'INNER JOIN clients ON users.ClientID = clients.ClientID ' 
                         + 'INNER JOIN status ON documents.StatusID = status.StatusID', (error, row, fields) => {
            if(error){
                console.log(error);
            }
            else{
                response.status(row, res)
                console.log(row, res)
            }
        })
    }
    else {
        dbConnection.query('SELECT DocumentID, clients.ClientFIO, DocumentName, status.StatusName FROM documents '
                         + 'INNER JOIN users ON documents.UserID = users.UserID '
                         + 'INNER JOIN clients ON users.ClientID = clients.ClientID ' 
                         + 'INNER JOIN status ON documents.StatusID = status.StatusID '
                         + 'WHERE users.UserID = ' + req.body.UserID, (error, row, fields) => {
            if(error){
                console.log(error);
            }
            else{
                response.status(row, res)
                console.log(row, res)
            }
        })
    }
    console.log('RoleID', roleID)
    console.log('UserID', userID)
}
