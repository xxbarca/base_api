import { BaseService } from '@/module/Database/base';
import { PermissionEntity } from '@/module/Auth/entities';
import { PermissionRepository } from '@/module/Auth/repositories';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto, UpdatePermissionDto } from '@/module/Auth/dtos';
import { omit } from 'lodash';
import { AccessType } from '@/module/Auth/enums';

@Injectable()
export class PermissionService extends BaseService<
  PermissionEntity,
  PermissionRepository
> {
  constructor(protected repository: PermissionRepository) {
    super(repository);
  }

  private async handleCreateFolder(parent: PermissionEntity) {
    if (parent && [AccessType.MENU, AccessType.BUTTON].includes(parent.type)) {
      throw new HttpException(
        'MENU 和 BUTTON 不能是FOLDER的父亲',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async handleCreateMenu(parent: PermissionEntity) {
    if (parent && [AccessType.BUTTON, AccessType.MENU].includes(parent.type)) {
      throw new HttpException(
        'MENU 和 BUTTON 不能是MENU的父亲',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async handleCreateButton(parent: PermissionEntity) {
    if (!parent) {
      throw new HttpException('请为该权限指定父权限', HttpStatus.BAD_REQUEST);
    } else if ([AccessType.BUTTON, AccessType.FOLDER].includes(parent.type)) {
      throw new HttpException(
        'BUTTON 和 FOLDER 不能是BUTTON的父亲',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(data: CreatePermissionDto) {
    const parent = data.parent
      ? await this.repository.findOne({
          where: { id: data.parent },
        })
      : null;
    switch (data.type) {
      case AccessType.FOLDER:
        await this.handleCreateFolder(parent);
        break;
      case AccessType.MENU:
        await this.handleCreateMenu(parent);
        break;
      case AccessType.BUTTON:
        await this.handleCreateButton(parent);
        break;
    }
    return await this.repository.save({ ...data, parent });
  }

  async getDetail(id: string) {
    return await super.detail(id, async (qb) =>
      qb.leftJoinAndSelect(`${this.repository.qbName}.parent`, 'parent'),
    );
  }
  async update(
    id: string,
    data: UpdatePermissionDto,
  ): Promise<PermissionEntity> {
    const parent = data.parent
      ? await this.repository.findOne({ where: { id: data.parent } })
      : null;
    const d = omit(data, ['parent', 'id']);
    return await super.update(id, { ...d, parent });
  }

  async tree() {
    const list = await this.repository.find({
      relations: ['parent'],
    });
    const root = list.filter((i) => !i.parent);
    const children = list.filter((i) => i.parent);

    for (const p of root) {
      children.forEach((d) => {
        if (d.parent.id === p.id) {
          p.children = p.children || [];
          p.children.push(d);
        }
      });
    }
    return root;
  }

  async deleteFolder(
    item: PermissionEntity,
    children: Array<PermissionEntity>,
  ) {
    for (const d of children) {
      d.parent = item.parent;
      await this.repository.save(d);
    }
    return await this.delete(item.id);
  }

  async deleteMenu(item: PermissionEntity, children: Array<PermissionEntity>) {
    for (const d of children) {
      await this.delete(d.id);
    }
    return await this.delete(item.id);
  }

  async deleteItem(id: string) {
    const item = await this.getDetail(id);
    const children = await this.repository.find({
      where: { parent: { id: item.id } },
    });
    switch (item.type) {
      case AccessType.FOLDER:
        await this.deleteFolder(item, children);
        break;
      case AccessType.MENU:
        await this.deleteMenu(item, children);
        break;
    }
    return await this.delete(id);
  }
}
