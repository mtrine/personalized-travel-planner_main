import { HttpStatus } from '@nestjs/common';

export class ErrorCode {
    static readonly NOT_FOUND = new ErrorCode(1404, 'Not found', HttpStatus.NOT_FOUND);
    static readonly UNAUTHORIZED = new ErrorCode(1401, 'Unauthorized', HttpStatus.UNAUTHORIZED)
    static readonly USER_EXIST = new ErrorCode(1400, 'User exist', HttpStatus.BAD_REQUEST)
    static readonly PUBLICKEY_ERROR = new ErrorCode(1402, 'Public error', HttpStatus.BAD_REQUEST)
    static readonly REFRESH_TOKEN_ERROR = new ErrorCode(1403, 'Something wrong happend !! Pls reLogin', HttpStatus.FORBIDDEN)
    static readonly USER_NOT_REGISTER = new ErrorCode(1405, 'User not register', HttpStatus.NON_AUTHORITATIVE_INFORMATION)
    static readonly REFRESH_TOKEN_EXPIRED = new ErrorCode(1406, 'Refresh token expired', HttpStatus.FORBIDDEN)
    static readonly REFRESH_TOKEN_INVALID = new ErrorCode(1407, 'Refresh token invalid', HttpStatus.FORBIDDEN)
    private constructor(public readonly code: number, public readonly message: string, public readonly status: HttpStatus) { }

    toJSON() {
        return {
            code: this.code,
            message: this.message,
            status: this.status,
        };
    }
}
