import jwt from "jsonwebtoken";
 export const getUser = (token: string, cb:any) => {
     const SECRETADMIN = process.env["NEXT_PUBLIC_ADMIN_SECRET"]
     
    jwt.verify(token, SECRETADMIN!, (err, user) => {
        if(err){
             cb(false); //removed return from here
        }
         cb(user); //removed return from here
    })
 }