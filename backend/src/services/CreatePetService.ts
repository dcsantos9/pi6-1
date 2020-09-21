import { getRepository } from 'typeorm';
import Pet from "../models/Pet";
import User from "../models/User";
import AppError from '../errors/AppError';

interface Request{
    user_id: string;
    name: string;
    species: string;
    particulars: string;
    info: string;
}
class CreatePetService {
    public async execute({user_id, name, species, particulars, info}: Request): Promise<Pet>{
        const petsRepository = getRepository(Pet);

        const pet = petsRepository.create({
            user_id,
            name,
            species,
            particulars,
            info
        });

        await petsRepository.save(pet);

        return pet;
    }
}

export default CreatePetService;
