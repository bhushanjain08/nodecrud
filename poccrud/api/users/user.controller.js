require("dotenv").config();
const {create,
     getUserById,
     getUsers, 
     updateUser, 
      deleteUser,
     getUserByEmail,
     getUserByIdSp
    } = require('./user.service');

    

const {genSaltSync, hashSync, compareSync ,genSalt} = require('bcrypt');
const {sign} = require('jsonwebtoken');
const { json } = require('express');
module.exports ={
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results)=> {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "database connection error"                 
                });
            } 
            return res.status(200).json({
                success: 1,
                message: results
            })  ;   
        });
    },

    getUserById: (req,res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            } 
            if (!results) {
                return res.json({
                    success:0,
                    message: 'Record not found'
                })
                
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getUserByIdSp: (req,res) => {
        const id = req.params.id;
        getUserByIdSp(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            } 
            if (!results) {
                return res.json({
                    success:0,
                    message: 'Record not found'
                })
                
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },





    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password , salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return false;               
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: ' update user '
                });               
            }
            return res.json({
                success: 1,
                message: 'update successfully'
            });
        });
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message:'record not found'
                });
            }
            return res.json({
                success: 1,
                message: 'user deleted successfully'
            });
        });
    }    ,
    
    login:(req,res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
             }
             if (!results) {
                 return res.json({
                    success: 0,
                     data: 'invalid email or passsword'
                 })
                 
             }
             const result = compareSync(body.password, results.password);
             if(result) {
                 results.password = undefined;
                 const jsontoken = sign({result: results}, process.env.tkey, {
                  expiresIn:"1h"         
                 });
                 return res.json({
                    success: 1,
                     message: "login successfull",
                     token: jsontoken
                 });
             }
             else{
                 return res.json({
                    success: 0,
                     data: ' invalid email or password'
                 });

             }
        } );
    }
};
 
