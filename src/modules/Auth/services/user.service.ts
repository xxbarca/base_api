import { Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { UserEntity } from '@/modules/Auth/entities';
import { UserRepository } from '@/modules/Auth/repositories';

@Injectable()
export class UserService extends BaseService<UserEntity, UserRepository> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async create(username: string, password: string) {
    const u = this.userRepository.create({
      username,
      password,
      nickname: username,
    });
    return await this.userRepository.save(u);
  }
}
