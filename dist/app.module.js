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
const product_images_entity_1 = require("./products/entities/product-images.entity");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const upload_controller_1 = require("./upload/upload.controller");
const cloudinary_service_1 = require("./cloudinary/cloudinary.service");
const upload_service_1 = require("./upload/upload.service");
const product_image_service_1 = require("./products/product-image/product-image.service");
const upload_module_1 = require("./upload/upload.module");
const nestjs_minio_client_1 = require("nestjs-minio-client");
const content_service_1 = require("./content/content.service");
const payments_module_1 = require("./payments/payments.module");
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
                    entities: [user_entity_1.User, product_entity_1.Product, cart_entity_1.CartItem, product_images_entity_1.ProductImage],
                    synchronize: true,
                }),
            }),
            config_1.ConfigModule,
            nestjs_minio_client_1.MinioModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    endPoint: configService.get('minio_url'),
                    port: 9000,
                    useSSL: false,
                    accessKey: configService.get('minio_access_key'),
                    secretKey: configService.get('minio_secret_key')
                }),
                inject: [config_1.ConfigService],
            }),
            payments_module_1.PaymentsModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]), typeorm_1.TypeOrmModule.forFeature([cart_entity_1.CartItem]), typeorm_1.TypeOrmModule.forFeature([product_images_entity_1.ProductImage]),
            users_module_1.UsersModule, jwt_1.JwtModule, auth_module_1.AuthModule, products_module_1.ProductsModule, cart_module_1.CartModule, cloudinary_module_1.CloudinaryModule, upload_module_1.UploadModule, payments_module_1.PaymentsModule],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController, upload_controller_1.UploadController],
        providers: [app_service_1.AppService, users_service_1.UsersService, jwt_1.JwtService, bcrypt_service_1.BcryptService, cart_service_1.CartService, cloudinary_service_1.CloudinaryService, upload_service_1.UploadService, product_image_service_1.ProductImageService, content_service_1.ContentService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map