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
        title: 'SKU管理',
        path: '/sku',
        children: [
          {
            icon: 'ShoppingOutlined',
            title: 'SKU列表',
            path: '/sku/list',
          },
        ],
      },
      {
        icon: 'ShoppingOutlined',
        title: '常用组件',
        path: '/assembly',
        children: [
          {
            icon: 'AppstoreOutlined',
            path: '/assembly/guide',
            title: '引导页',
          },
          {
            icon: 'AppstoreOutlined',
            path: '/assembly/svgIcon',
            title: 'Svg 图标',
          },
          {
            icon: 'AppstoreOutlined',
            path: '/assembly/selectIcon',
            title: 'Icon 选择',
          },
          {
            icon: 'AppstoreOutlined',
            path: '/assembly/batchImport',
            title: '批量导入数据',
          },
        ],
      },
    ];
  }
}
