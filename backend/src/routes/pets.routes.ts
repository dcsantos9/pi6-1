import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreatePetService from '../services/CreatePetService';
import { getRepository } from 'typeorm';
import Pet from '../models/Pet';
import AppError from '../errors/AppError';

const petsRouter = Router();
const upload = multer(uploadConfig);

upload.array

petsRouter.get('/', async (request, response) => {
  const petRepository = getRepository(Pet);

  const petsAllData = await petRepository.find();

  const pets = petsAllData.map(({ id, user_id, name, species, particulars, info, avatar}) => {
    return { id, user_id, name, species, particulars, info, avatar }
  })

  return response.json(pets);
});

petsRouter.post('/', async (request, response) => {

        const { user_id, name, species, particulars, info} = request.body;

        const createPet = new CreatePetService();

        const pet = await createPet.execute({
            user_id, name, species, particulars, info
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
