import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/module/Database/base';
import { UserEntity } from '@/module/Auth/entities';
import { UserRepository } from '@/module/Auth/repositories';
import * as argon2 from 'argon2';
import { SetRolesDto } from '@/module/Auth/dtos';

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

  async setRoles(data: SetRolesDto) {
    const user = await this.detail(data.id, async (qb) =>
      qb.leftJoinAndSelect(`${this.userRepository.qbName}.roles`, 'roles'),
    );
    try {
      await this.userRepository
        .buildBaseQB()
        .relation(UserEntity, 'roles')
        .of(user)
        .addAndRemove(data.roles, user.roles);
      return this.detail(data.id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
