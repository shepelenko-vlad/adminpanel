const mysql = require('mysql')

const connection = mysql.createConnection({
    hostl: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'workflow'
})

connection.connect((error) => {
    if(error){
        return console.log('Ошибка подключения к БД')
    }
    else{
        return console.log('Подключение прошло успшно')
    }
})

module.exports = connection