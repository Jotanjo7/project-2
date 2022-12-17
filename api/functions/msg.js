// funstions/msg.js

exports.handler = async (event, context) => {

    const { name } = event.queryStringParameters;

    const response = {
        msg: "Hola API " + name,
    }

    return {
        statusCode: 200,
        headers: { 'Content-Type':'application/json'},            
        body: JSON.stringify(response)  
    }     
};