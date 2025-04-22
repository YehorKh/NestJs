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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt_service_1 = require("../bcrypt/bcrypt.service");
const verification_entity_1 = require("../verification/entities/verification.entity");
const cart_entity_1 = require("../cart/entities/cart.entity");
let UsersService = class UsersService {
    constructor(userRepository, verificationRepo, bcryptService, cartRepository) {
        this.userRepository = userRepository;
        this.verificationRepo = verificationRepo;
        this.bcryptService = bcryptService;
        this.cartRepository = cartRepository;
    }
    async create(createUserDto) {
        createUserDto.password = await this.bcryptService.hashPassword(createUserDto.password);
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }
    async findOneByName(name) {
        return await this.userRepository.findOne({ where: { name } });
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id) {
        return await this.userRepository.findOne({
            where: { id },
            relations: ['cart', 'orders']
        });
    }
    async update(id, updateUserDto) {
        await this.userRepository.update(id, updateUserDto);
        return await this.userRepository.findOne({ where: { id } });
    }
    async remove(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['cart']
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        await this.cartRepository.delete({ user: { id } });
        await this.verificationRepo.delete({ email: user.email });
        await this.userRepository.delete(id);
    }
    async updateShippingAddress(userId, address) {
        await this.userRepository.update(userId, { defaultShippingAddress: address });
        return await this.userRepository.findOne({ where: { id: userId } });
    }
    async updatePhoneNumber(userId, phoneNumber) {
        await this.userRepository.update(userId, { phoneNumber });
        return await this.userRepository.findOne({ where: { id: userId } });
    }
    async updateName(userId, name) {
        await this.userRepository.update(userId, { name });
        return this.userRepository.findOne({ where: { id: userId } });
    }
    async updateEmail(userId, email) {
        await this.userRepository.update(userId, { email, emailVerified: false });
        return this.userRepository.findOne({ where: { id: userId } });
    }
    async updatePassword(userId, password) {
        const hashedPassword = await this.bcryptService.hashPassword(password);
        await this.userRepository.update(userId, { password: hashedPassword });
        return this.userRepository.findOne({ where: { id: userId } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(verification_entity_1.EmailVerification)),
    __param(3, (0, typeorm_1.InjectRepository)(cart_entity_1.CartItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        bcrypt_service_1.BcryptService,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map