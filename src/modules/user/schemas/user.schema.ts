import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RoleName } from "src/enums/role-name.enum";
import { UserSex } from "src/enums/user-sex.enum";

@Schema({
    timestamps: true,
})
export class User {
    @Prop({
        required: true
    })
    user_email: string;

    @Prop({
        required: true,
        minlength: 6,
    })
    user_password: string;

    @Prop({
        required: true,
        minlength: 3,
    })
    user_name: string;

    @Prop({ default: false })
    user_verified: boolean;

    @Prop({
        required: true,
        enum: UserSex,
    })
    user_sex: string;

    @Prop({
        required: true,
        default: null,
    })
    user_birthdate: Date;

    @Prop({
        required: true,
        ref: 'Role',  
        default: RoleName.USER,
    })
    user_role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);