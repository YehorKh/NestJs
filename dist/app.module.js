"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const user_entity_1 = require("./users/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const users_service_1 = require("./users/users.service");
const jwt_1 = require("@nestjs/jwt");
const users_controller_1 = require("./users/users.controller");
const bcrypt_service_1 = require("./bcrypt/bcrypt.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'Qasdfghjkl123',
                database: 'diploma-project',
                entities: [user_entity_1.User],
                synchronize: true,
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            users_module_1.UsersModule, jwt_1.JwtModule, auth_module_1.AuthModule],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController],
        providers: [app_service_1.AppService, users_service_1.UsersService, jwt_1.JwtService, bcrypt_service_1.BcryptService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map