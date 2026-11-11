// FR-03, FR-04, FR-05, FR-06, FR-07, FR-08, FR-09, FR-10, FR-11, FR-18, FR-20, FR-28
// UML: Merchant, Category, Item, OptionGroup, CustomOption; UC_Browse, UC_Search, UC_Catalog,
// UC_Discount; Merchant Catalog in sequence-order; Catalog in sequence-catalog.
import { Body, Controller, Delete, Get, Injectable, NotImplementedException, Param, Patch, Post, Put, Query } from '@nestjs/common';

type SortDirection = 'asc' | 'desc';

interface MerchantSummary {
  merchantId: string;
  name: string;
  hasListedItems: boolean;
}

interface MenuItem {
  itemId: string;
  merchantId: string;
  name: string;
  basePrice: number;
  image: string | null;
  category: string | null;
  sellable: boolean;
  optionGroups: (OptionGroupDetails & {
    optionGroupId: string;
    options: (OptionDetails & { optionId: string })[];
  })[];
}

interface MenuQuery {
  keyword?: string;
  priceSort?: SortDirection;
  categoryId?: string;
}

interface CatalogSearch {
  keyword: string;
  priceSort?: SortDirection;
  minimumPrice?: number;
  maximumPrice?: number;
}

interface OptionDetails {
  name: string;
  surcharge: number;
}

interface OptionGroupDetails {
  minimumSelections: number;
  maximumSelections: number;
}

interface ItemImageUpload {
  mediaType: 'image/jpeg' | 'image/png';
  base64Data: string;
}

type InventorySettings =
  | { inventoryMode: 'QUANTITY'; stockQuantity: number }
  | { inventoryMode: 'MANUAL_SOLD_OUT'; manuallySoldOut: boolean };

type ItemDetails = InventorySettings & {
  name: string;
  basePrice: number;
  image?: ItemImageUpload | null;
  categoryId?: string | null;
  optionGroups: (OptionGroupDetails & {
    optionGroupId?: string;
    options: (OptionDetails & { optionId?: string })[];
  })[];
};

interface CategoryDetails {
  name: string;
}

@Injectable()
export class CatalogService {
  findMerchants(_nameSort?: SortDirection): MerchantSummary[] {
    return [];
  }

  findMenu(_merchantId: string, _query: MenuQuery): MenuItem[] {
    throw new NotImplementedException();
  }

  search(_query: CatalogSearch): { merchants: MerchantSummary[]; items: MenuItem[] } {
    return { merchants: [], items: [] };
  }

  saveItem(_details: ItemDetails, _itemId?: string): { itemId: string } {
    throw new NotImplementedException();
  }

  updateListing(_itemId: string, _listed: boolean): { itemId: string; listed: boolean } {
    throw new NotImplementedException();
  }

  saveCategory(_details: CategoryDetails, _categoryId?: string): { categoryId: string } {
    throw new NotImplementedException();
  }

  deleteCategory(_categoryId: string): { uncategorizedItemIds: string[] } {
    throw new NotImplementedException();
  }

  saveFixedDiscount(_amount: number): { fixedDiscount: number } {
    throw new NotImplementedException();
  }

  deleteItem(_itemId: string): { itemId: string } {
    throw new NotImplementedException();
  }
}

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get('merchants')
  findMerchants(@Query('nameSort') nameSort?: SortDirection) {
    return this.catalog.findMerchants(nameSort);
  }

  @Get('merchants/:merchantId/menu')
  findMenu(@Param('merchantId') merchantId: string, @Query() query: MenuQuery) {
    return this.catalog.findMenu(merchantId, query);
  }

  @Get('search')
  search(@Query() query: CatalogSearch) {
    return this.catalog.search(query);
  }
}

@Controller('merchant/catalog')
export class MerchantCatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Post('items')
  createItem(@Body() details: ItemDetails) {
    return this.catalog.saveItem(details);
  }

  @Put('items/:itemId')
  editItem(@Param('itemId') itemId: string, @Body() details: ItemDetails) {
    return this.catalog.saveItem(details, itemId);
  }

  @Patch('items/:itemId/listing')
  changeListing(@Param('itemId') itemId: string, @Body('listed') listed: boolean) {
    return this.catalog.updateListing(itemId, listed);
  }

  @Delete('items/:itemId')
  deleteItem(@Param('itemId') itemId: string) {
    return this.catalog.deleteItem(itemId);
  }

  @Post('categories')
  addCategory(@Body() details: CategoryDetails) {
    return this.catalog.saveCategory(details);
  }

  @Put('categories/:categoryId')
  editCategory(@Param('categoryId') categoryId: string, @Body() details: CategoryDetails) {
    return this.catalog.saveCategory(details, categoryId);
  }

  @Delete('categories/:categoryId')
  deleteCategory(@Param('categoryId') categoryId: string) {
    return this.catalog.deleteCategory(categoryId);
  }

  @Put('fixed-discount')
  setFixedDiscount(@Body('amount') amount: number) {
    return this.catalog.saveFixedDiscount(amount);
  }
}
