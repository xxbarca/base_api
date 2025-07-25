import { BaseService } from '@/modules/Database/base';
import { SpuEntity } from '@/modules/Mall/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import {
  CategoryRepository,
  SkuRepository,
  SpecKeyRepository,
  SpuRepository,
} from '@/modules/Mall/repositories';
import {
  CreateSpuDto,
  PaginateSpuDto,
  SetDefaultSkuDto,
  UpdateSpuDto,
} from '@/modules/Mall/dtos';
import { omit } from 'lodash';
import { OnlineStatus } from '@/modules/Mall/constants';

@Injectable()
export class SpuService extends BaseService<SpuEntity, SpuRepository> {
  constructor(
    protected repository: SpuRepository,
    protected readonly categoryRepository: CategoryRepository,
    protected readonly keyRepository: SpecKeyRepository,
    protected readonly skuRepository: SkuRepository,
  ) {
    super(repository);
  }

  async create(data: CreateSpuDto) {
    try {
      const specKeys = await this.keyRepository.find({
        where: {
          id: In(data.spec_key_list),
        },
      });
      return await this.repository.save({
        ...data,
        category: await this.categoryRepository.findOne({
          where: { id: data.category },
        }),
        specKeys,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateData(d: UpdateSpuDto) {
    let spu = this.repository.create(omit(d, ['category', 'spec_key_list']));
    if (d.category) {
      spu.category = await this.categoryRepository.findOne({
        where: {
          id: d.category,
        },
      });
    }
    if (d.spec_key_list) {
      spu.specKeys = await this.keyRepository.findBy({
        id: In(d.spec_key_list),
      });
    }
    await this.repository.save(spu);
    spu = await this.detail(d.id);
    await this.repository
      .buildBaseQB()
      .relation(SpuEntity, 'specKeys')
      .of(d.id)
      .addAndRemove(d.spec_key_list, spu.specKeys);
    return spu;
  }

  async detail(id: string) {
    return await super.detail(id, async (qb) =>
      qb.leftJoinAndSelect(`${this.repository.qbName}.specKeys`, 'specKeys'),
    );
  }

  async pageData(data: PaginateSpuDto) {
    return await super.page(data, async (qb) =>
      qb
        .leftJoinAndSelect(`${this.repository.qbName}.category`, 'category')
        .leftJoinAndSelect(`${this.repository.qbName}.specKeys`, 'specKeys')
        .leftJoinAndSelect('specKeys.values', 'values'),
    );
  }

  async switchStatus(id: string) {
    const spu = await this.repository.findOne({
      where: { id: id },
    });
    const status =
      spu.online === OnlineStatus.ONLINE
        ? OnlineStatus.OFFLINE
        : OnlineStatus.ONLINE;
    try {
      await this.repository.update(id, { online: status });
      return '修改状态成功';
    } catch (e) {
      console.log(e);
      throw new HttpException('修改状态失败', HttpStatus.BAD_REQUEST);
    }
  }

  async all() {
    return await super.list(null, async (qb) =>
      qb
        .leftJoinAndSelect(`${this.repository.qbName}.specKeys`, 'specKeys')
        .leftJoinAndSelect('specKeys.values', 'values'),
    );
  }

  async setDefaultSku(data: SetDefaultSkuDto) {
    try {
      await this.repository.update(data.id, { default_sku_id: data.sku_id });
      return '设置默认SKU成功';
    } catch (e) {
      console.log(e);
      throw new HttpException('设置默认SKU失败', HttpStatus.BAD_REQUEST);
    }
  }
}
