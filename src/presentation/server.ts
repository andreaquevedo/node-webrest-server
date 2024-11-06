import express from "express";
import path from "path";

interface Options {
  port: number;
  public_path: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    const { port, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
  }

  async start() {
    // pondremos a nuestra app a escuchar peticiones

    //* Middlewares

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    // Comodin que sirve para interceptar todas las request y las response
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

// Un middleware no es más que una función que se ejecuta en todo momento que pase por una ruta
