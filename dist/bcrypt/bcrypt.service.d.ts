export declare class BcryptService {
    private readonly saltRounds;
    hashPassword(password: string): Promise<string>;
    comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
}
