import Pet from './Pet'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';

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
    phone_type: PhoneType

    @Column()
    phone: string;

    @Column()
    info: string;

    @Column('timestamp')
    birthday: string;

    @Column()
    street: string;

    @Column()
    number: string;
    isNullable: true;

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

    @ManyToMany(type => Pet, {cascade:  ['insert', 'update'],  eager: true })
    @JoinTable()
    favorite_pets: Pet[];

    @ManyToMany(type => Pet , {cascade:  ['insert', 'update'],  eager: true })
    @JoinTable()
    candidate_pets: Pet[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default User;
