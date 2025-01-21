import { BaseService } from '@/module/Database/base';
import { PermissionEntity } from '@/module/Auth/entities';
import { PermissionRepository } from '@/module/Auth/repositories';
import { Injectable } from '@nestjs/common';
import { CreatePermissionDto, UpdatePermissionDto } from '@/module/Auth/dtos';
import { omit } from 'lodash';

@Injectable()
export class PermissionService extends BaseService<
  PermissionEntity,
  PermissionRepository
> {
  constructor(protected repository: PermissionRepository) {
    super(repository);
  }

  async create(data: CreatePermissionDto) {
    const d = {
      ...data,
      parent: data.parent
        ? await this.repository.findOne({ where: { id: data.parent } })
        : null,
    };
    return await this.repository.save(d);
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

  async deleteItem(id: string) {
    const item = await this.getDetail(id);
    const children = await this.repository.find({
      where: { parent: { id: item.id } },
    });

    for (const d of children) {
      d.parent = item.parent;
      await this.repository.save(d);
    }
    return await this.delete(id);
  }
}
