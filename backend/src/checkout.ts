// FR-01, FR-06, FR-10, FR-11, FR-12, FR-13, FR-14, FR-15, FR-16, FR-17, FR-18,
// FR-19, FR-20, FR-21, FR-22, FR-23, FR-24, FR-25, FR-27, FR-28, FR-31
// UML: Cart, CartLine, Order and Suborder; UC_Cart and UC_Submit;
// sequence-order Cart, Order Service and Inventory; activity-order.
import { Body, Controller, Delete, Get, Injectable, NotImplementedException, Param, Post, Put } from '@nestjs/common';

interface CartLineSelection {
  quantity: number;
  selectedOptionIds: string[];
  note?: string;
}

export interface CartLine extends CartLineSelection {
  cartLineId: string;
  itemId: string;
}

// FR-15: the cart contract leaves its persistence and sign-in handoff open.
export interface Cart {
  lines: CartLine[];
}

interface LineAmount {
  baseUnitPrice: number;
  addOnAmount: number;
  subtotal: number;
}

interface AmountBreakdown {
  merchantAmounts: {
    merchantId: string;
    lines: ({ cartLineId: string } & LineAmount)[];
    subtotal: number;
    effectiveDiscount: number;
    total: number;
  }[];
  orderTotal: number;
}

interface CartContents extends Cart {
  amounts: AmountBreakdown;
}

interface SubmitOrder {
  confirmationId: string;
  pickupTimes: { merchantId: string; pickupTime: string }[];
  confirmedAmounts: AmountBreakdown;
}

type SubmissionFailure = { outcome: 'failed'; reason: string };
type AmountChange = { outcome: 'requires_confirmation'; amounts: AmountBreakdown };

type FirstSubmissionResult = { outcome: 'submitted'; orderId: string } | SubmissionFailure;
type SubmissionResult = FirstSubmissionResult | AmountChange;

interface StockQuantity {
  itemId: string;
  quantity: number;
}

// FR-10, FR-22, FR-24, FR-27 | UML: Inventory in sequence-order and sequence-suborders.
export interface Inventory {
  checkAvailability(lines: readonly CartLine[]): Promise<{ available: boolean }>;
  deductQuantityModeStock(quantities: readonly StockQuantity[]): Promise<void>;
  restoreEligibleQuantityModeStock(suborderId: string): Promise<void>;
}

// FR-17, FR-22–FR-25 | UML: Merchant Catalog revalidation and Order Service in sequence-order.
export interface OrderSubmissionOperations {
  revalidate(cart: Cart, confirmation: SubmitOrder): Promise<{ outcome: 'valid' } | SubmissionFailure | AmountChange>;
  createOrderAndDeductStock(
    studentAccountId: string,
    cart: Cart,
    confirmation: SubmitOrder,
  ): Promise<FirstSubmissionResult>;
  findResultForConfirmation(studentAccountId: string, confirmationId: string): Promise<FirstSubmissionResult | null>;
}

@Injectable()
export class CartService {
  getCart(): CartContents {
    throw new NotImplementedException();
  }

  addLine(_line: Omit<CartLine, 'cartLineId'>): CartContents {
    throw new NotImplementedException();
  }

  editLine(_cartLineId: string, _selection: CartLineSelection): CartContents {
    throw new NotImplementedException();
  }

  removeLine(_cartLineId: string): CartContents {
    throw new NotImplementedException();
  }

  clearAfterSubmission(): void {
    throw new NotImplementedException();
  }
}

@Controller('cart')
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Get()
  getCart() {
    return this.cart.getCart();
  }

  @Post('lines')
  addLine(@Body() line: Omit<CartLine, 'cartLineId'>) {
    return this.cart.addLine(line);
  }

  @Put('lines/:cartLineId')
  editLine(@Param('cartLineId') cartLineId: string, @Body() selection: CartLineSelection) {
    return this.cart.editLine(cartLineId, selection);
  }

  @Delete('lines/:cartLineId')
  removeLine(@Param('cartLineId') cartLineId: string) {
    return this.cart.removeLine(cartLineId);
  }
}

@Injectable()
export class OrderSubmissionService {
  // FR-24, FR-25: student identity comes from the session; retry uses the same confirmation ID.
  submit(_confirmation: SubmitOrder): SubmissionResult {
    throw new NotImplementedException();
  }
}

@Controller('student/orders')
export class OrderSubmissionController {
  constructor(private readonly orders: OrderSubmissionService) {}

  @Post()
  submit(@Body() confirmation: SubmitOrder) {
    return this.orders.submit(confirmation);
  }
}
