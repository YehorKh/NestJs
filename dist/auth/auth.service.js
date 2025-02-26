"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt_service_1 = require("../bcrypt/bcrypt.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService, bcryptService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.bcryptService = bcryptService;
        this.configService = configService;
    }
    async signIn(loginUserDto) {
        const user = await this.usersService.findOneByName(loginUserDto.name);
        if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
            throw new common_1.UnauthorizedException("Wrong login or password");
        }
        const payload = { id: user.id, name: user.name, roles: user.roles, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 3600 };
        return {
            access_token: await this.jwtService.signAsync(payload, { secret: this.configService.get('JWT_SECRET') }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        bcrypt_service_1.BcryptService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map