import { Injectable } from "@nestjs/common";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UtilsService } from "src/utils/utils.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }
    async createNewUser(dto: CreateUserDto) {
        const hashPassword = await UtilsService.hashPassword(dto.password);
        const newUser = new this.userModel({
            user_email: dto.email,
            user_name: dto.name,
            user_birthdate: dto.birthdate,
            user_sex:dto.sex,
            user_password: hashPassword,
        });
        return newUser.save();
    }

    async findByEmail(email: string,select: Array<string>) {
        return this.userModel.findOne({ user_email: email })
        .select(UtilsService.getSelectData(select))
        .lean();
    }

    async findById(id: string,select: Array<string>) {
        return this.userModel.findById(id)
        .select(UtilsService.getSelectData(select))
        .lean();
    }

    async queryUsers(query: any,select: Array<string>,limit: number,page: number) {
        const skip = limit * (page - 1);
        return this.userModel.find(query)
        .limit(limit)
        .skip(skip)
        .select(UtilsService.getSelectData(select))
        .lean();
    }


}