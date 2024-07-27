import mongoose from "mongoose";

export const db = async () => {
    await mongoose.connect("mongodb+srv://akomanyibernard401:GSASmantoben17@gsas.y6mwaos.mongodb.net/?retryWrites=true&w=majority&appName=GSAS").then(() =>
        console.log(
            "DB Connected"
        ))
}
