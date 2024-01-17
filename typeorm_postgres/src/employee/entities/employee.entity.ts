import { BaseEntity } from "src/entities/base.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { EmployeeRole } from "src/types.globalType";

export const passwordRegex = {
    regExp: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/),
    message: 'Password must be 8 to 64 characters long including upper & lowercase letters and numbers.'
};

@Entity()
@Unique(['username'])
export class Employee extends BaseEntity {
    @Column({ type: 'varchar', length: 20 }) // varchar: varying character
    username: string;

    @Column({ length: 64 }) // Hides the password column by default in queries
    password: string;

    @Column({
        type: 'enum', // enum field type
        enum: EmployeeRole,
        default: EmployeeRole.EMPLOYEE,
    })
    role: EmployeeRole

    private static passwordRegex: RegExp = passwordRegex.regExp;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            // Check if the password matches the required regex pattern
            if (!Employee.passwordRegex.test(this.password)) {
                throw new Error(passwordRegex.message);
            }

            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }

}