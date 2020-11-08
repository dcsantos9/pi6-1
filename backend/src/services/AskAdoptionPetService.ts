import { getRepository } from 'typeorm';
import User from '../models/User';
import Pet from '../models/Pet';
import AppError from '../errors/AppError';

class AskAdoptionPetService {
    public async execute(user_id, pet_id): Promise<User> {

        const userRepository = getRepository(User);
        const user = await userRepository.findOne(user_id);

        const petRepository = getRepository(Pet);
        const pet = await petRepository.findOne(pet_id);

        if(!user){
            throw new AppError('Only authenticated users can adopt pets', 401);
        }

        if(!pet){
            throw new AppError('Cant find the Pet', 404);
        }
        if(user.candidate_pets.includes(pet)){
            throw new AppError('Pet Already asked for adoption', 401);
        }

        user.candidate_pets.push(pet);
        await userRepository.save(user);

        return user;
    }
}

export default AskAdoptionPetService;
