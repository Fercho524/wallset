import { exec, spawn } from "child_process";


export function ejecutarComando(comando: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(comando, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  });
}


export function ejecutarComandoSeguro(
  comando: string,
  args: string[] = []
): Promise<void> {
  return new Promise((resolve, reject) => {
    const proceso = spawn(comando, args, { stdio: "inherit" });

    proceso.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`El comando salió con código ${code}`));
    });

    proceso.on("error", (err) => {
      reject(err);
    });
  });
}


export async function cambiarFondo(image_path) {
    await ejecutarComandoSeguro("swaybg",["-i",image_path])
}