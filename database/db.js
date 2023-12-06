import mongoose from "mongoose";

const connection = async ( username,password ) =>{
    const URL = `mongodb+srv://${username}:${password}@backend.ghrrl7r.mongodb.net/?retryWrites=true&w=majority`;
    try{
      await  mongoose.connect(URL);
      console.log("Database Mongo DB Connected Successfully")

    } catch(error){
        console.log("Error While Connected MongoDB", error)
    }
}

export default  connection