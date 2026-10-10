import { Artist } from 'src/artists/artist.entity';
import { User } from 'src/users/user.entity';
import { EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { v4 as uuid4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { Playlist } from '../../src/playlists/playlist.entity';

export const seedData =
  async (manager: EntityManager): Promise<void> => {
    await seedUser();
    await seedArtist();
    await seedPlayLists();

    async function seedUser() {
      const user = await createUser();
      await manager.getRepository(User).save(user);
    }

    async function createUser() {
      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash('123456', salt);

      const user = new User();
      user.firstName = faker.person.firstName();
      user.lastName = faker.person.lastName();
      user.email = faker.internet.email();
      user.password = encryptedPassword;
      user.apiKey = uuid4();

      return user;
    }

    async function seedArtist() {
      const user = await createUser();
      const artist = new Artist();
      artist.user = user;
      await manager.getRepository(User).save(user);
      await manager.getRepository(Artist).save(artist);
    }

    async function seedPlayLists() {
      const user = await createUser();
      const playList = new Playlist();
      playList.name = faker.music.genre();
      playList.user = user;

      await manager.getRepository(User).save(user);
      await manager.getRepository(Playlist).save(playList);
    }
  };