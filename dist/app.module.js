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
const products_module_1 = require("./products/products.module");
const cart_module_1 = require("./cart/cart.module");
const product_entity_1 = require("./products/entities/product.entity");
const cart_entity_1 = require("./cart/entities/cart.entity");
const cart_service_1 = require("./cart/cart.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [user_entity_1.User, product_entity_1.Product, cart_entity_1.CartItem],
                    synchronize: true,
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]), typeorm_1.TypeOrmModule.forFeature([cart_entity_1.CartItem]),
            users_module_1.UsersModule, jwt_1.JwtModule, auth_module_1.AuthModule, products_module_1.ProductsModule, cart_module_1.CartModule],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController],
        providers: [app_service_1.AppService, users_service_1.UsersService, jwt_1.JwtService, bcrypt_service_1.BcryptService, cart_service_1.CartService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map