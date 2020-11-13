import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreatePetService from '../services/CreatePetService';
import { getRepository } from 'typeorm';
import Pet from '../models/Pet';
import User from '../models/User';
import AppError from '../errors/AppError';


const petsRouter = Router();
const upload = multer(uploadConfig);

upload.array

petsRouter.get('/', async (request, response) => {
    const petRepository = getRepository(Pet);
    const userRepository = getRepository(User);

    const petsAllData = await (await petRepository.find()).reverse();
    const usersAllData = await userRepository.find();
    const pets = petsAllData.map( ({id, user_id, name, species, particulars, info, avatar, birth_day, gender, coat, breed}) => {

        const user_data = usersAllData.filter((user) => (user.id === user_id ))[0];

        const has_faved_by = usersAllData.filter( (user) => user.favorite_pets.filter(
            (user_pet) => (user_pet.id === id))[0]);

        const has_asked_for_adoption = usersAllData.filter( (user) => user.candidate_pets.filter(
            (user_pet) => (user_pet.id === id))[0]);

        const user_name = user_data.name;

        const institution = { id: user_id , name: user_data.name }

        return { id, institution, has_faved_by, has_asked_for_adoption, name, species, particulars, info, avatar, birth_day, gender, coat, breed }
    });

  return response.json(pets);
});

petsRouter.post('/', async (request, response) => {

        const { user_id, name, species, particulars, info, coat, gender, breed, birth_day} = request.body;

        const createPet = new CreatePetService();

        const pet = await createPet.execute({
            user_id, name, species, particulars, info, coat, gender, breed, birth_day
        });

        return response.json(pet);

});

petsRouter.put('/:id', async (request, response) => {

    const petRepo = getRepository(Pet);

    const pet = await petRepo.findOne(request.params.id);

    if (!pet) {
        throw new AppError('Pet not found', 401);
    }

    await petRepo.update({ id: request.params.id}, request.body);

    const pet_updated = await petRepo.findOne(request.params.id);

    return response.json(pet_updated);

});

export default petsRouter;
