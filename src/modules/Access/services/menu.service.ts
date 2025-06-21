import { Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { MenuEntity } from '@/modules/Access/entities';
import { MenuRepository } from '@/modules/Access/repositories';

@Injectable()
export class MenuService extends BaseService<MenuEntity, MenuRepository> {
  constructor(protected repository: MenuRepository) {
    super(repository);
  }

  async menuList() {
    return [
      {
        icon: 'ShoppingOutlined',
        title: '商品管理',
        path: '/product',
        children: [
          {
            icon: 'ShoppingOutlined',
            title: '分类管理',
            path: '/product/category',
          },
        ],
      },
      {
        icon: 'ShoppingOutlined',
        title: 'SPU管理',
        path: '/spu',
        children: [
          {
            icon: 'ShoppingOutlined',
            title: 'SPU列表',
            path: '/spu',
          },
        ],
      },
      {
        icon: 'ShoppingOutlined',
        title: 'SKU管理',
        path: '/sku',
        children: [
          {
            icon: 'ShoppingOutlined',
            title: 'SKU列表',
            path: '/sku',
          },
        ],
      },
    ];
  }
}
