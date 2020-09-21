import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateAvatarUserService from '../services/UpdateUserAvatarService';
import { getRepository } from 'typeorm';
import User from '../models/User';

const usersRouter = Router();
const upload = multer(uploadConfig);

upload.array

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const usersAllData = await userRepository.find();
  const users = usersAllData.map(({id, name, type, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, estate, zipcode, social_id, avatar}) => {
    return { id, name, type, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, estate, zipcode, social_id, avatar }
  })

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {

        const { name, type, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, estate, zipcode, social_id, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            type,
            phone_type,
            phone,
            info,
            email,
            birthday,
            street,
            complement,
            number,
            neightborhood,
            city,
            estate,
            zipcode,
            social_id,
            password
        });
        delete user.password;

        return response.json(user);

});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async ( request, response ) => {

        const updateUserAvatar = new UpdateAvatarUserService();
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete user.password
        return response.json(user);


} );

 export default usersRouter;
