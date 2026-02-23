import { ejecutarComandoSeguro } from "./utils"


export async function changeBGHyprland(image_path) {
    try {
        await ejecutarComandoSeguro("killall",["swaybg"])
    } catch (error) {
        console.log("No existe ningún swaybg")
    }
    
    try {
        await ejecutarComandoSeguro("swaybg",["-i",image_path,"-m","fill"])
    } catch (error) {
        console.log("No se pudo cambiar el fondo de pantalla")
    }
}