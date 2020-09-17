import { getRepository } from 'typeorm';
import Pet from "../models/Pet";
import User from "../models/User";
import AppError from '../errors/AppError';

interface Request{
    user_id: string;
    name: string;
    bio: string;
    age: string;
    type: string;
    weight: string;
}
class CreatePetService {
    public async execute({user_id, name, bio, age, weight, type}: Request): Promise<Pet>{
        const petsRepository = getRepository(Pet);

        const pet = petsRepository.create({
            user_id,
            name,
            bio,
            age,
            type,
            weight,
        });

        await petsRepository.save(pet);

        return pet;
    }
}

export default CreatePetService;
