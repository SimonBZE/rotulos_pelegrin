import { Client } from "@/api";

const clientCtrl = new Client();

export const reloadCliente = async () => {
    setLoading(true);
    try {
        const result = await clientCtrl.getClienteTest(id);
        if (result && result.data && result.data.attributes) {
            setCliente(result.data.attributes);
        } else {
            setCliente(null);
        }
    } catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
        setCliente(null);
    } finally {
        setLoading(false);
    }
};