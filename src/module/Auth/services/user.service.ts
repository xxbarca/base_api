import { Injectable } from '@nestjs/common';
import { BaseService } from '@/module/Database/base';
import { UserEntity } from '@/module/Auth/entities';
import { UserRepository } from '@/module/Auth/repositories';
import * as argon2 from 'argon2';

@Injectable()
export class UserService extends BaseService<UserEntity, UserRepository> {
  constructor(private userRepository: UserRepository) {
    super(userRepository);
  }

  async findByName(name: string) {
    return await this.userRepository.findOne({
      where: { username: name },
    });
  }

  async create(username: string, password: string) {
    const i = this.userRepository.create({
      username,
      password: await argon2.hash(password),
      nickname: username,
    });
    return await this.userRepository.save(i);
  }
}
