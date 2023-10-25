import jwt from "jsonwebtoken";
 export const getUser = (token: string, cb) => {
    const SECRETPUBLIC = process.env["NEXT_PUBLIC_USER_SECRET"]
    jwt.verify(token, SECRETPUBLIC!, (err, user) => {
        if(err){
            return cb(false);
        }
        return cb(user);
    })
 }