import mongoose from "mongoose";
import pedidoSchema from "../schemas/pedidoSchema.js";

const Pedido = mongoose.model("Pedido", pedidoSchema);
export default Pedido;
