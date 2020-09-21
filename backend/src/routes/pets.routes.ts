import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreatePetService from '../services/CreatePetService';
import { getRepository } from 'typeorm';
import Pet from '../models/Pet';

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

export default petsRouter;
