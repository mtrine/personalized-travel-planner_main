import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RoleName } from "src/enums/role-name.enum";

@Schema({
    timestamps: true,
})
export class Role {
    @Prop({
        required: true,
        enum: RoleName,
        unique: true,
    })
    role_name: string;

    @Prop({
        required: true,
    })
    role_slug: string;

    @Prop({
        required: true,
    })
    role_status: string;

    @Prop({
        required: true,
    })
    role_description: string;

    @Prop({
        required: true,
        type: [
            {
                resource: { type: String, ref: 'Resource', required: true },
                actions: [{ type: String, required: true }],
                attribute: { type: String, default: '*' }
            }
        ]
    })
    role_grants: [{
        resource: string,
        actions: string[],
        attribute: string
    }];
}

export const RoleSchema = SchemaFactory.createForClass(Role);