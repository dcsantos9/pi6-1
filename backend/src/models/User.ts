import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserType {
    ADOPTER="adopter",
    INSTITUTION="institution"
}

export enum PhoneType {
    MOBILE = "mobile",
    HOME = "home",
    WORK = "work"
}

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.ADOPTER
    })
    type: UserType

    @Column({
        type: "enum",
        enum: PhoneType,
        default: PhoneType.MOBILE
    })
    phone: PhoneType

    @Column()
    info: string;

    @Column('timestamp')
    birthday: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    complement: string;

    @Column()
    neightborhood: string;

    @Column()
    city: string;

    @Column()
    estate: string;

    @Column()
    zipcode: string;

    @Column()
    social_id: string;

    @Column()
    email: string;

    @Column()
    avatar: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default User;
