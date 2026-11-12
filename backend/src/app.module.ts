// FR-01, FR-02, FR-03, FR-04, FR-05, FR-06, FR-09, FR-12, FR-20, FR-24, FR-26, FR-29, FR-32, NFR-01
// UML: Ordering System in sequence-order, sequence-catalog, sequence-admin and sequence-suborders.
import { Module } from '@nestjs/common';
import { AccountsController, AccountsService, AdministrationController, AdministrationService } from './accounts';
import { CatalogController, CatalogService, MerchantCatalogController } from './catalog';
import { CartController, CartService, OrderSubmissionController, OrderSubmissionService } from './checkout';
import { OrderQueryController, SuborderController, SuborderService } from './suborders';

@Module({
  controllers: [
    AccountsController,
    AdministrationController,
    CatalogController,
    MerchantCatalogController,
    CartController,
    OrderSubmissionController,
    OrderQueryController,
    SuborderController,
  ],
  providers: [
    AccountsService,
    AdministrationService,
    CatalogService,
    CartService,
    OrderSubmissionService,
    SuborderService,
  ],
})
export class AppModule {}
