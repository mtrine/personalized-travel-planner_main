import * as bcrypt from 'bcrypt';

export class UtilsService {
    static getSelectData(select: Array<string>) {
        return Object.fromEntries(select.map((item) => [item, 1]));
    }

    static unGetSelectData(select: Array<string>) {
        return Object.fromEntries(select.map((item) => [item, 0]));
    }

    static async hashPassword(password: string) {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    }

    static async comparePassword(password: string, hashPassword: string) {
        const compare = await bcrypt.compare(password, hashPassword);
        return compare;
    }
}