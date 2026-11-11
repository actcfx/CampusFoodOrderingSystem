// FR-02, FR-13, FR-17, FR-18, FR-19, FR-21, FR-26, FR-27, FR-28, FR-29, FR-30, FR-31, FR-33
// UML: Order, Suborder, OrderLine, SelectedOption; UC_ViewOrder, UC_Suborders;
// sequence-suborders merchant handling and student/merchant query.
import { Body, Controller, Get, Injectable, NotImplementedException, Param, Patch } from '@nestjs/common';

type SuborderStatus = 'PENDING' | 'ACCEPTED' | 'READY' | 'PICKED_UP' | 'REJECTED';
type AggregateStatus = 'SUBMITTED' | 'IN_PREPARATION' | 'COMPLETE' | 'PICKED_UP' | 'REJECTED';
type SuborderStatusGroups = Partial<Record<SuborderStatus, string[]>>;

interface VisibleSuborder {
  suborderId: string;
  merchant: { merchantId: string; name: string };
  status: SuborderStatus;
  pickupTime: string;
  discount: number;
  total: number;
  lines: {
    itemNameSnapshot: string;
    basePriceSnapshot: number;
    quantity: number;
    note: string | null;
    selectedOptions: { optionNameSnapshot: string; surchargeSnapshot: number }[];
    addOnAmount: number;
    subtotal: number;
  }[];
}

interface MerchantOrderDetails {
  orderId: string;
  suborders: VisibleSuborder[];
  suborderIdsByStatus: SuborderStatusGroups;
}

interface StudentOrderDetails extends MerchantOrderDetails {
  total: number;
  aggregateStatus: AggregateStatus;
}

// FR-33 | UML: Order.aggregateStatus and the sequence-suborders status derivation.
export interface AggregateOrderStatus {
  derive(statuses: readonly SuborderStatus[]): AggregateStatus;
}

@Injectable()
export class SuborderService {
  findMerchantSuborders(): { orderId: string; suborder: VisibleSuborder }[] {
    throw new NotImplementedException();
  }

  updateStatus(_suborderId: string, _status: SuborderStatus): { suborderId: string; status: SuborderStatus } {
    throw new NotImplementedException();
  }

  findStudentOrders(): { orderId: string }[] {
    throw new NotImplementedException();
  }

  readStudentOrder(_orderId: string): StudentOrderDetails {
    throw new NotImplementedException();
  }

  readMerchantOrder(_orderId: string): MerchantOrderDetails {
    throw new NotImplementedException();
  }
}

@Controller('student/orders')
export class OrderQueryController {
  constructor(private readonly suborders: SuborderService) {}

  @Get()
  findStudentOrders() {
    return this.suborders.findStudentOrders();
  }

  @Get(':orderId')
  readStudentOrder(@Param('orderId') orderId: string) {
    return this.suborders.readStudentOrder(orderId);
  }
}

@Controller('merchant')
export class SuborderController {
  constructor(private readonly suborders: SuborderService) {}

  @Get('suborders')
  findOwnSuborders() {
    return this.suborders.findMerchantSuborders();
  }

  @Patch('suborders/:suborderId/status')
  updateStatus(@Param('suborderId') suborderId: string, @Body('status') status: SuborderStatus) {
    return this.suborders.updateStatus(suborderId, status);
  }

  @Get('orders/:orderId')
  readOwnOrder(@Param('orderId') orderId: string) {
    return this.suborders.readMerchantOrder(orderId);
  }
}
