import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from "../models/User";
import AppError from '../errors/AppError';

interface Request{
    name : string;
    type: string;
    phone_type: string;
    phone: string;
    info: string;
    email: string;
    birthday: string;
    street: string;
    complement: string;
    number: string;
    neightborhood: string;
    city: string;
    estate: string;
    zipcode: string;
    social_id: string;
    password: string;
}

class CreateUserService {
    public async execute({name, type, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, estate, zipcode, social_id, password}: Request): Promise<User>{
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
            type,
            phone_type,
            phone,
            info,
            email,
            birthday,
            street,
            complement,
            neightborhood,
            number,
            city,
            estate,
            zipcode,
            social_id,
            password: hashedPassword,

        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
