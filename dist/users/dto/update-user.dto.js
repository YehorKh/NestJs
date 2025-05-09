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
exports.UpdatePhoneNumberDto = exports.UpdateShippingAddressDto = exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./create-user.dto");
const class_validator_1 = require("class-validator");
class UpdateUserDto extends (0, swagger_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;
class UpdateShippingAddressDto {
}
exports.UpdateShippingAddressDto = UpdateShippingAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123 Main Street, Apt 4B, New York, NY 10001',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 255),
    __metadata("design:type", String)
], UpdateShippingAddressDto.prototype, "address", void 0);
class UpdatePhoneNumberDto {
}
exports.UpdatePhoneNumberDto = UpdatePhoneNumberDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+79123456789',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)(null),
    __metadata("design:type", String)
], UpdatePhoneNumberDto.prototype, "phoneNumber", void 0);
//# sourceMappingURL=update-user.dto.js.map