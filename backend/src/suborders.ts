// FR-02, FR-13, FR-17, FR-18, FR-19, FR-21, FR-26, FR-27, FR-28, FR-29, FR-30, FR-31, FR-33
// UML: Order, Suborder, OrderLine, SelectedOption; UC_ViewOrder, UC_Suborders;
// sequence-suborders merchant handling and student/merchant query.
import { Body, Controller, Get, Injectable, Param, Patch } from '@nestjs/common';

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

const demoOrderId = 'demo-order-01';

const demoNoodlesSuborder: VisibleSuborder = {
  suborderId: 'demo-suborder-01',
  merchant: { merchantId: 'demo-merchant-01', name: 'Demo Noodle Counter' },
  status: 'ACCEPTED',
  pickupTime: '2026-11-10T12:10:00+08:00',
  discount: 10,
  total: 110,
  lines: [
    {
      itemNameSnapshot: 'Sesame Noodles',
      basePriceSnapshot: 50,
      quantity: 2,
      note: 'Pack separately',
      selectedOptions: [{ optionNameSnapshot: 'Tofu', surchargeSnapshot: 10 }],
      addOnAmount: 20,
      subtotal: 120,
    },
  ],
};

const demoRiceSuborder: VisibleSuborder = {
  suborderId: 'demo-suborder-02',
  merchant: { merchantId: 'demo-merchant-02', name: 'Demo Rice Counter' },
  status: 'REJECTED',
  pickupTime: '2026-11-10T12:30:00+08:00',
  discount: 0,
  total: 40,
  lines: [
    {
      itemNameSnapshot: 'Vegetable Rice',
      basePriceSnapshot: 40,
      quantity: 1,
      note: null,
      selectedOptions: [],
      addOnAmount: 0,
      subtotal: 40,
    },
  ],
};

@Injectable()
export class SuborderService {
  findMerchantSuborders(): { orderId: string; suborder: VisibleSuborder }[] {
    return [{ orderId: demoOrderId, suborder: demoNoodlesSuborder }];
  }

  updateStatus(_suborderId: string, _status: SuborderStatus): { suborderId: string; status: SuborderStatus } {
    return { suborderId: demoNoodlesSuborder.suborderId, status: demoNoodlesSuborder.status };
  }

  findStudentOrders(): { orderId: string }[] {
    return [{ orderId: demoOrderId }];
  }

  readStudentOrder(_orderId: string): StudentOrderDetails {
    return {
      orderId: demoOrderId,
      suborders: [demoNoodlesSuborder, demoRiceSuborder],
      suborderIdsByStatus: {
        ACCEPTED: [demoNoodlesSuborder.suborderId],
        REJECTED: [demoRiceSuborder.suborderId],
      },
      total: 150,
      aggregateStatus: 'IN_PREPARATION',
    };
  }

  readMerchantOrder(_orderId: string): MerchantOrderDetails {
    return {
      orderId: demoOrderId,
      suborders: [demoNoodlesSuborder],
      suborderIdsByStatus: { ACCEPTED: [demoNoodlesSuborder.suborderId] },
    };
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
