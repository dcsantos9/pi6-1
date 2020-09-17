import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from "../models/User";
import AppError from '../errors/AppError';

interface Request{
    name: string;
    email: string;
    password: string;
    surname: string;
    phone: string;
    bio: string;
    age: string;
    address: string;
}
class CreateUserService {
    public async execute({name, email, password, surname, phone, bio, age, address}: Request): Promise<User>{
        const usersRepository = getRepository(User);
        const checkUserExists = await usersRepository.findOne({
            where: {email},
        });
        if (checkUserExists){
            throw new AppError('Email address already used.');
        }
        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
            surname,
            phone,
            bio,
            age,
            address
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
