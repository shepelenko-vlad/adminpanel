module.exports = (app) => {
    const authorizationController = require('./../Controllers/AuthorizationController')
    const filesController = require('./../Controllers/FilesController')
    const usersController = require('./../Controllers/UsersController')
    const clientsController = require('./../Controllers/ClientsController')
    const adressController = require('./../Controllers/AdressController')
    const organizationController = require('./../Controllers/OrganizationController')
    const employeeController = require('./../Controllers/EmployeeController')

    //Authorization Controller 
    app.post('/authorization', authorizationController.getlogin)

    //Adresses Controller
    app.get('/adress', adressController.getAdresses)
    app.post('/adress/add', adressController.insertAdress)
    app.put('/adress/update', adressController.updateAdress)
    app.delete('/adress/delete/:PhysicalAdressID', adressController.deleteAdress)
    app.get('/adress/export', adressController.exportAdresses)
    
    //Employee Controller
    app.post('/employee', employeeController.getDocuments)

    //Users Controller 
    app.get('/users', usersController.getUsers)
    app.post('/users/add', usersController.insertUser)
    app.put('/users/update', usersController.updateUser)
    app.delete('/users/delete/:UserID', usersController.deleteUser)
    app.get('/users/export', usersController.exportUsers)

    //Organization Controller
    app.get('/organizations', organizationController.getOrganizations)
    app.post('/organizations/add', organizationController.insertOrganization)
    app.put('/organizations/update', organizationController.updateOrganization)
    app.delete('organizations/delete/:OrganizationID', organizationController.deleteOrganization)
    app.get('/organizations/export', organizationController.exportOrganizations)
    app.get('/organizations/types', organizationController.getTypes)
    app.get('/organizations/getSubject', organizationController.getSubjects)
    app.get('/organizations/getContact', organizationController.getContactInformation)

    //Client Controller 
    app.get('/clients', clientsController.getClients)
    app.post('/clients/add', clientsController.insertClients)
    app.put('/clients/update', clientsController.updateClient)
    app.delete('/clients/delete/:ClientID', clientsController.deleteClient)
    app.get('/clients/export', clientsController.exportClients)
    app.get('/clients/export', clientsController.exportClients)
    app.get('/clients/getPositions', clientsController.getPositions)
    app.get('/clients/getRoles', clientsController.getRoles)
    app.get('/clients/getOrganizations', clientsController.getOrganizations)

    //Files Controller
    app.post('/upload', filesController.uploadFile)
    app.delete('/documents/delete/:DocumentID', filesController.deleteFile)
}