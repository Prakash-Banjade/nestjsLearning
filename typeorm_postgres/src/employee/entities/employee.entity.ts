import { BaseEntity } from "src/entities/base.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'

export enum EmployeeRole {
    ADMIN = "admin",
    MANAGER = "manager",
    EMPLOYEE = "employee",
}

@Entity()
@Unique(['username'])
export class Employee extends BaseEntity {
    @Column({ type: 'varchar', length: 20 }) // varchar: varying character
    username: string;

    @Column({ select: false, length: 64 }) // Hides the password column by default in queries
    password: string;

    @Column({
        type: 'enum', // enum field type
        enum: EmployeeRole,
        default: EmployeeRole.EMPLOYEE,
    })
    role: EmployeeRole

    private static passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            // Check if the password matches the required regex pattern
            if (!Employee.passwordRegex.test(this.password)) {
                throw new Error('Password must be at least 8 characters long and include letters and numbers.');
            }

            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }

}