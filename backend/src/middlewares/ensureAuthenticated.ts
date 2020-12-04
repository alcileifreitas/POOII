import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error("Token JWT está faltando");
    }
    const [, token] = authHeader.split(" ");
    try {
        const decoded = verify(token, authConfig.jwt.secret);
        const { sub } = decoded as TokenPayload;
        request.user = { id: sub };
        //Caso dê erro nisso e o typescript não compile porque não reconhece a alteração no request feita no arquivo @types/express.d.ts,
        //vai precisar alterar no package.json o comando de "dev:server": "ts-node-dev src/server.ts"
        //para "dev:server": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
        return next();
    } catch (error) {
        throw new Error("Token JWT inválido");
    }
}
