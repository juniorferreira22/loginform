import mongoose, { Schema } from "mongoose";

// criando um novo schema para estabelecer um padrao nas queries
const userSchema = new Schema({ 
    id: String, 
    username: String, 
    usermail: String, 
    password: String, 
    confirmPassword: String,
}, { 

    // utilizando o timestamp para que se veja a data e hora que os dados foram criados e atualizados
    timestamps: true,
 });

 // exportando o schema para ser usado em outros arquivos
 const User = mongoose.models.User || mongoose.model('User', userSchema);

 export default User;