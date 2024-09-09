import { User } from "../entities/user.entity";
import { setSeederFactory } from "typeorm-extension";

export const UserFactory = setSeederFactory(User, (faker) => {
    const user = new User(); // create the instance of user entity

    // set the column values using faker
    user.name = faker.person.fullName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.avatar = faker.image.avatar();

    return user;
})