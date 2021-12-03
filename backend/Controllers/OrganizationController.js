const response = require('./../response')

const exportOrganizationsToExcel = require('../settings/exportOrganizationService')

const dbConnection = require('./../settings/dbConnection')
const setHeaders = require('./../settings/setHeaders')

exports.getOrganizations = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT OrganizationID, OrganizationName, types.TypeName, subject.SubjectName, contactinformation.Email FROM organizations '
                     + 'INNER JOIN types ON organizations.TypeID = types.TypeID ' 
                     + 'INNER JOIN subject ON organizations.SubjectID = subject.SubjectID '
                     + 'INNER JOIN contactinformation ON organizations.ContactInformationID = contactinformation.ContactInformationID', 
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

exports.insertOrganization = (req, res) => {
    setHeaders(res)
    const sqlQuery = "INSERT INTO organizations (OrganizatioName, TypeID, SubjectID, ContactInformationID) " 
                   + "VALUES (" + req.body.OrganizationName +", '" 
                                + req.body.TypeID + "', '"
                                + req.body.SubjectID + "', '" 
                                + req.body.ContactInformationID + "')";
    dbConnection.query(sqlQuery, (error, results) => {
        if(error) {
            console.log(error);
        }
        else {
            response.status(results, res)
        }
    });
}

exports.updateOrganization = (req, res) => {
    setHeaders(res)
    const sqlQuery = "UPDATE organizations SET organizations.OrganizationName = " + req.body.OrganizationName 
                   + ", organizations.TypeID = '" + req.body.TypeID 
                   + "', organizations.SubjectID = '" + SubjectID
                   + "', organizations.ContactInformationID = '" + ContactInformationID
                   + "' WHERE organizations.OrganizationID = " + req.body.OrganizationID + "";                           
        
        dbConnection.query(sqlQuery, (error, results) => {
        if(error) {
            console.log(error);
        }
        else {
            response.status(results, res)
        }
    })
}

exports.deleteOrganization = (req, res) => {
    setHeaders(res)
    const sqlQuery = "DELETE FROM organizations WHERE OrganizationID = '" + req.params.OrganizationID + "'";
    dbConnection.query(sqlQuery, (error, results) => {
        if(error) {
            console.log(error)
        }
        else {
            response.status(results, res)
        }
    })
}

exports.exportOrganizations = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT OrganizationID, OrganizationName, types.TypeName, subject.SubjectName, contactinformation.Email FROM organizations '
                     + 'INNER JOIN types ON organizations.TypeID = types.TypeID ' 
                     + 'INNER JOIN subject ON organizations.SubjectID = subject.SubjectID '
                     + 'INNER JOIN contactinformation ON organizations.ContactInformationID = contactinformation.ContactInformationID', (error, row, fields) => {
        if(error){
          console.log(error)
        }
        else{
          response.status(row,res)
        
          const workSheetColumnNames = [
            "Организация",
            "Тип",
            "Субъект",
            "Эмаил"
          ]
        
          const workSheetName = 'Организации';
          const filePath = 'D:/adminpanel/backend/Controllers/uploads/Organizations.xlsx';

          exportOrganizationsToExcel(row, workSheetColumnNames, workSheetName, filePath);
        }
    })
}

exports.getTypes = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT TypeID, TypeName FROM types ', 
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

exports.getSubjects = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT SubjectID, SubjectName FROM Subject ', 
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

exports.getContactInformation = (req, res) => {
    setHeaders(res)
    dbConnection.query('SELECT ContactInformationID, Email, Phone, Site FROM contactinformation ', 
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