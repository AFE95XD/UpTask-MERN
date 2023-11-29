import mongoose from "mongoose";
import bcrypy from "bcrypt";

const usuarioSchema = mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    token: { type: String },
    confirmado: { type: Boolean, default: false },
  },
  { timestamps: true }
);

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypy.genSalt(10);
  this.password = await bcrypy.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypy.compare(passwordFormulario, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
