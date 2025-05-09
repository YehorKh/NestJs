"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt_service_1 = require("../bcrypt/bcrypt.service");
const verification_entity_1 = require("../verification/entities/verification.entity");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("../role/roles.guard");
const cart_entity_1 = require("../cart/entities/cart.entity");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), typeorm_1.TypeOrmModule.forFeature([verification_entity_1.EmailVerification]), typeorm_1.TypeOrmModule.forFeature([cart_entity_1.CartItem]),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }), jwt_1.JwtModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    global: true,
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '3600s' },
                }),
                inject: [config_1.ConfigService],
            }),],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, bcrypt_service_1.BcryptService, {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map