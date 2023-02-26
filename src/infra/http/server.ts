import express from "express";
import { routes } from "./routes";
export class Server {
  private app = express();

  public open(port: number) {
    this.middleware();
    this.routes();
    this.app.listen(port, () => {
      console.log(`
      [HTTP] this app is listen at http://localhost:${port}
      `);
    });
  }
  public middleware() {
    this.app.use(express.json());
  }
  public routes() {
    this.app.use("/api/v1", routes);
  }
}
