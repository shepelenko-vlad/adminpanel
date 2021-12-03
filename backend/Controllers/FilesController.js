const response = require('./../response')
const setHeaders = require('./../settings/setHeaders')

const dbConnection = require('./../settings/dbConnection')

exports.uploadFile = (req, res) => {
    setHeaders(res)
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    
      const file = req.files.file;

      file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    
        const sqlQuery = "INSERT INTO documents (UserID, DocumentName, StatusID) " 
                   + "VALUES (" + req.body.UserID +", '" 
                                + file.name + "', '" 
                                + 1 + "')";
          dbConnection.query(sqlQuery, (error, results) => {
            if(error) {
                console.log(error);
            }
        });

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      });
}

exports.deleteFile = (req, res) => {
  setHeaders(res)
    const sqlQuery = "DELETE FROM documents WHERE DocumentID = '" + req.params.DocumentID + "'";
    dbConnection.query(sqlQuery, (error, results) => {
        if(error) {
            console.log(error)
        }
        else {
            response.status(results, res)
        }
    })
}