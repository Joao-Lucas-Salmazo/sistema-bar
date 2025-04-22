import mongoose from "mongoose";
import cardapioSchema from "../schemas/cardapioSchema.js";

const Cardapio = mongoose.model("Cardapio", cardapioSchema);
export default Cardapio;
