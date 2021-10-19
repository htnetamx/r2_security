import * as crypto from 'crypto';
import { ITokenGenerator } from './application/contracts/token';
import { TokenDB } from './token-db';
import { IToken } from './token-type';

export class Token implements ITokenGenerator {

    public generateToken(userId: string): string|null {
        const newToken: IToken = { userId, tokenValue: this.generateHash(20) };
        TokenDB.addToken(newToken);
        return newToken.tokenValue;
    }

    public revokeToken(userId: string): boolean {
        return TokenDB.revokeToken(userId);
    }

    public getTokenStatus(token: string): boolean {
        return TokenDB.getTokenStatus(token);
    }

    private generateHash(len: number): string {
        return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len).toUpperCase();   // return required number of characters
    }
}