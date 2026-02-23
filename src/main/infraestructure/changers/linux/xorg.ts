import { ejecutarComandoSeguro } from "./utils"


export async function changeBGxorg(image_path) {
    await ejecutarComandoSeguro("feh",["-i",image_path,"-m","fill"])
}