# NodeJS-Tasks

NodeJS Tasks for Practice

Database Connection

1. In db.js file
   - const sequelize = new Sequelize("assignment", "root", "", {
     host: "localhost",
     dialect: "mysql",
     });
     Replace root as username and next parameter as password
2. Inside config/config.json in development add credentials
3. Sample Database is added assignment.sql

Task 1:

1. API is created to upload file and insert data into database
2. Data is stored in schedule table
3. POST http://localhost:3000/schedule
4. Postman Collection is added Assignment.postman_collection.json

Task2:

1. Add Reimbursement

   - POST http://localhost:3000/reimbursement/add
   - Postman Collection is added for every type
   - Sample Data stored in data/reimbursement folder
   - Reimbursement Type is stored in reimbursement_types table
   - Corresponding type data date wise is stored in reimbursements table

2. Get All Reimbursement

   - GET http://localhost:3000/reimbursement
   - Postman Collection is added

3. Get a specific Reimbursement
   - POST http://localhost:3000/reimbursement
   - Postman Collection is added
   - typeId and date needs to be passed in body where typeId is from reimbursement_types table primary key
   - {
     "typeId": 1,
     "date": "2020-01-01"
     }
