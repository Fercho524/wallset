import { spawn } from "child_process";


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