import bcrypt from "bcrypt";
import { CONFIG } from "../../config/enviroments";
export class Hash {
    static async create(password: string): Promise<string> {
        return await bcrypt.hash(password, parseInt(CONFIG.hashSalt as string))
    }
    static async compare(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }
}