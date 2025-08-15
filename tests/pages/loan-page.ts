import {Locator, Page} from '@playwright/test';

export class LoanPage {
    readonly page : Page;
    readonly url = 'https://loan-app.tallinn-learning.ee/'
    readonly username = 'daniilb'
    readonly password = 'pwd4V7wYbfT2n'
    readonly applyButton: Locator;
    readonly amountInput: Locator;
    readonly periodSelect: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly continueButton: Locator;
    readonly monthlyAmountText: Locator;
    readonly applyLoanButton2: Locator;
    readonly errorPaymentMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.applyButton = page.getByTestId('id-small-loan-calculator-field-apply')
        this.amountInput = page.getByTestId('id-small-loan-calculator-field-amount')
        this.periodSelect = page.getByTestId('ib-small-loan-calculator-field-period')
        this.usernameInput = page.getByTestId('login-popup-username-input');
        this.passwordInput = page.getByTestId('login-popup-password-input');
        this.monthlyAmountText = page.getByTestId("ib-small-loan-calculator-field-monthlyPayment");
        this.continueButton = page.getByTestId('login-popup-continue-button');
        this.applyLoanButton2 = page.getByTestId('id-image-element-button-image-2')
        this.errorPaymentMessage = page.getByTestId('id-small-loan-calculator-field-error');
    }
    async openLoanPage() {
        await this.page.goto(this.url);
    }

    async login() {
        await this.applyButton.click();
        await this.usernameInput.fill(this.username);
        await this.passwordInput.fill(this.password);
        await this.continueButton.click();
    }
}