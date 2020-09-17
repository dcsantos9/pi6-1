import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import User from './User';

@Entity('pets')
class Pet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    weight: string;

    @Column()
    bio: string;

    @Column('integer')
    age: string;

    @Column()
    avatar: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id'})
    user: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Pet;
