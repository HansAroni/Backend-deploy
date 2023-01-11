const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
  
const app = express();
  
// Set up Global configuration access
dotenv.config();
  
let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});
  
// Main Code Here  //
// Generating JWT
app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token
  
    let jwtSecretKey = process.env.PROD_TOKEN_SECRET_SIGN;
    let data = {
        time: Date(),
        _id: "63b5b56fab5ea3f31d8665c2",
        username: HansHuanca,
        name: "Hans Huanca Aroni",
        email: "hansaroni@hotmail.com",
        telephone: +549116577457,
        address: "San Martin 928",
        imgurl: "https://cdn0.bioenciclopedia.com/es/posts/2/7/1/estrella_de_mar_172_orig.jpg",
    }
  
    const token = jwt.sign(data, jwtSecretKey);
    console.log(token);
  
    res.send(token);
});
  
// Verification of JWT
app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});