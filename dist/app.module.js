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
const product_image_service_1 = require("./product-image/product-image.service");
const nestjs_minio_client_1 = require("nestjs-minio-client");
const content_service_1 = require("./content/content.service");
const payments_module_1 = require("./payments/payments.module");
const attribute_module_1 = require("./attribute/attribute.module");
const category_module_1 = require("./category/category.module");
const category_entity_1 = require("./category/entities/category.entity");
const attribute_entity_1 = require("./attribute/entities/attribute.entity");
const product_attribute_value_entity_1 = require("./product-attribute-value/entities/product-attribute-value.entity");
const category_attribute_entity_1 = require("./category-attribute/entities/category-attribute.entity");
const product_attribute_value_service_1 = require("./product-attribute-value/product-attribute-value.service");
const product_attribute_value_controller_1 = require("./product-attribute-value/product-attribute-value.controller");
const product_attribute_value_module_1 = require("./product-attribute-value/product-attribute-value.module");
const category_image_service_1 = require("./category-image/category-image.service");
const category_image_module_1 = require("./category-image/category-image.module");
const category_image_entity_1 = require("./category-image/entity/category-image.entity");
const category_image_controller_1 = require("./category-image/category-image.controller");
const product_image_controller_1 = require("./product-image/product-image.controller");
const mailer_service_1 = require("./mailer/mailer.service");
const verification_service_1 = require("./verification/verification.service");
const verification_entity_1 = require("./verification/entities/verification.entity");
const comment_service_1 = require("./comment/comment.service");
const comment_module_1 = require("./comment/comment.module");
const comment_entity_1 = require("./comment/entities/comment.entity");
const order_entity_1 = require("./order/entities/order.entity");
const orderitem_entity_1 = require("./order/entities/orderitem.entity");
const payment_enitiy_1 = require("./payments/entities/payment.enitiy");
const order_service_1 = require("./order/order.service");
const order_controller_1 = require("./order/order.controller");
const stripe_service_1 = require("./stripe/stripe.service");
const payments_service_1 = require("./payments/payments.service");
const stripe_module_1 = require("./stripe/stripe.module");
const order_module_1 = require("./order/order.module");
const payments_controller_1 = require("./payments/payments.controller");
const roles_guard_1 = require("./role/roles.guard");
const core_1 = require("@nestjs/core");
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
                    entities: [user_entity_1.User, orderitem_entity_1.OrderItem, payment_enitiy_1.Payment, order_entity_1.Order, product_entity_1.Product, cart_entity_1.CartItem, product_images_entity_1.ProductImage, category_entity_1.Category, attribute_entity_1.Attribute, product_attribute_value_entity_1.ProductAttributeValue, category_attribute_entity_1.CategoryAttribute, category_image_entity_1.CategoryImage, verification_entity_1.EmailVerification, comment_entity_1.Comment],
                    synchronize: true,
                }),
            }),
            config_1.ConfigModule,
            nestjs_minio_client_1.MinioModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    endPoint: configService.get('MINIO_URL'),
                    port: 80,
                    region: 'us-east-1',
                    useSSL: false,
                    accessKey: configService.get('MINIO_ACCESS_KEY'),
                    secretKey: configService.get('MINIO_SECRET_KEY')
                }),
                inject: [config_1.ConfigService],
            }),
            order_module_1.OrdersModule,
            payments_module_1.PaymentsModule,
            stripe_module_1.StripeModule,
            cart_module_1.CartModule,
            typeorm_1.TypeOrmModule.forFeature([payment_enitiy_1.Payment]), typeorm_1.TypeOrmModule.forFeature([orderitem_entity_1.OrderItem]), typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]), typeorm_1.TypeOrmModule.forFeature([cart_entity_1.CartItem]), typeorm_1.TypeOrmModule.forFeature([product_images_entity_1.ProductImage]), typeorm_1.TypeOrmModule.forFeature([attribute_entity_1.Attribute]), typeorm_1.TypeOrmModule.forFeature([product_attribute_value_entity_1.ProductAttributeValue]), typeorm_1.TypeOrmModule.forFeature([category_entity_1.Category]), typeorm_1.TypeOrmModule.forFeature([category_attribute_entity_1.CategoryAttribute]), typeorm_1.TypeOrmModule.forFeature([category_image_entity_1.CategoryImage]), typeorm_1.TypeOrmModule.forFeature([verification_entity_1.EmailVerification]), typeorm_1.TypeOrmModule.forFeature([comment_entity_1.Comment]), typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order]),
            users_module_1.UsersModule, jwt_1.JwtModule, auth_module_1.AuthModule, products_module_1.ProductsModule, cart_module_1.CartModule, payments_module_1.PaymentsModule, attribute_module_1.AttributeModule, category_module_1.CategoryModule, product_attribute_value_module_1.ProductAttributeValueModule, category_image_module_1.CategoryImageModule, comment_module_1.CommentModule, stripe_module_1.StripeModule, order_module_1.OrdersModule],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController, product_attribute_value_controller_1.ProductAttributeValueController, category_image_controller_1.CategoryImageController, product_image_controller_1.ProductImageController, order_controller_1.OrdersController, payments_controller_1.PaymentsController],
        providers: [app_service_1.AppService, users_service_1.UsersService, jwt_1.JwtService, bcrypt_service_1.BcryptService, cart_service_1.CartService, product_image_service_1.ProductImageService, content_service_1.ContentService, product_attribute_value_service_1.ProductAttributeValueService, category_image_service_1.CategoryImageService, mailer_service_1.MailerService, verification_service_1.VerificationService, comment_service_1.CommentService, order_service_1.OrdersService, stripe_service_1.StripeService, payments_service_1.PaymentsService,
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map