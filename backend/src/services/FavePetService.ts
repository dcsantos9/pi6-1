import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import uploadConfig from '../config/upload';
import User from '../models/User';
import Pet from '../models/Pet';
import AppError from '../errors/AppError';

interface Request {
    user_id: string;
    pet_id: string;
}

class FavePetService {
    public async execute(user_id, pet_id): Promise<User> {

        const userRepository = getRepository(User);
        const user = await userRepository.findOne(user_id);

        const petRepository = getRepository(Pet);
        const pet = await petRepository.findOne(pet_id);

        if(!user){
            throw new AppError('Only authenticated users can fave pets', 401);
        }

        if(!pet){
            throw new AppError('Cant find the Pet', 404);
        }
        if(user.favorite_pets.includes(pet)){
            throw new AppError('Pet Already Faved', 401);
        }

        user.favorite_pets.push(pet);
        await userRepository.save(user);

        return user;
    }
}

export default FavePetService;
