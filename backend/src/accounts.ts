// FR-01, FR-02, FR-32 | UML: StudentAccount, MerchantAccount, AdministratorAccount;
// UC_Register, UC_Login, UC_Merchants, UC_Admins;
// sequence-order registration/sign-in, sequence-catalog sign-in, sequence-admin account management.
import { Body, Controller, Injectable, Param, Patch, Post } from '@nestjs/common';

interface StudentSignIn {
  studentNumber: string;
  password: string;
}

interface StudentRegistration extends StudentSignIn {
  nickname: string;
}

interface MerchantBasicInformation {
  name: string;
  // G3-06: additional basic-information fields are Unconfirmed.
}

interface CreatedMerchantAccount {
  merchantId: string;
  accountCredentials: { account: string; password: string };
}

interface MerchantAccountState {
  merchantId: string;
  name: string;
  active: boolean;
}

@Injectable()
export class AccountsService {
  registerStudent(_registration: StudentRegistration): { studentAccountId: string } {
    return { studentAccountId: 'demo-student-01' };
  }

  signInStudent(_credentials: StudentSignIn): { role: 'student' } {
    return { role: 'student' };
  }

  signInMerchant(_credentials: CreatedMerchantAccount['accountCredentials']): { role: 'merchant' } {
    return { role: 'merchant' };
  }

  signInAdministrator(_credentials: unknown): { role: 'administrator' } {
    return { role: 'administrator' };
  }
}

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accounts: AccountsService) {}

  @Post('students')
  registerStudent(@Body() registration: StudentRegistration) {
    return this.accounts.registerStudent(registration);
  }

  @Post('students/sign-in')
  signInStudent(@Body() credentials: StudentSignIn) {
    return this.accounts.signInStudent(credentials);
  }

  @Post('merchants/sign-in')
  signInMerchant(@Body() credentials: CreatedMerchantAccount['accountCredentials']) {
    return this.accounts.signInMerchant(credentials);
  }

  @Post('administrators/sign-in')
  signInAdministrator(@Body() credentials: unknown) {
    return this.accounts.signInAdministrator(credentials);
  }
}

@Injectable()
export class AdministrationService {
  createMerchant(_information: MerchantBasicInformation): CreatedMerchantAccount {
    return {
      merchantId: 'demo-merchant-01',
      accountCredentials: { account: 'demo-merchant-account', password: '' },
    };
  }

  updateMerchant(_merchantId: string, _information: MerchantBasicInformation): MerchantAccountState {
    return { merchantId: 'demo-merchant-01', name: 'Demo Noodle Counter', active: true };
  }

  deactivateMerchant(_merchantId: string): MerchantAccountState {
    return { merchantId: 'demo-merchant-01', name: 'Demo Noodle Counter', active: false };
  }

  createAdministrator(_accountDetails: unknown): { administratorAccountId: string } {
    return { administratorAccountId: 'demo-administrator-01' };
  }
}

@Controller('administration')
export class AdministrationController {
  constructor(private readonly administration: AdministrationService) {}

  @Post('merchants')
  createMerchant(@Body() information: MerchantBasicInformation) {
    return this.administration.createMerchant(information);
  }

  @Patch('merchants/:merchantId')
  updateMerchant(@Param('merchantId') merchantId: string, @Body() information: MerchantBasicInformation) {
    return this.administration.updateMerchant(merchantId, information);
  }

  @Patch('merchants/:merchantId/deactivate')
  deactivateMerchant(@Param('merchantId') merchantId: string) {
    return this.administration.deactivateMerchant(merchantId);
  }

  @Post('administrators')
  createAdministrator(@Body() accountDetails: unknown) {
    return this.administration.createAdministrator(accountDetails);
  }
}
