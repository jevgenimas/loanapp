import { test, expect } from "@playwright/test";
import { LoanPage } from "./pages/loan-page";
import { LoanDetailPage } from "./pages/loandetail-page";

let loanPage: LoanPage;

test.beforeEach(async ({ page }) => {
    loanPage = new LoanPage(page);
    await loanPage.openLoanPage();
});

test('Base elements are visible', async () => {
    await expect.soft(loanPage.amountInput).toBeVisible();
    await expect.soft(loanPage.periodSelect).toBeVisible();
    await expect.soft(loanPage.applyButton).toBeVisible();
});

test('Get loan apply for 1000 eu and 24 month', async ({ page }) => {
    await loanPage.amountInput.fill('1000');
    await loanPage.periodSelect.selectOption('24');
    await loanPage.monthlyAmountText.waitFor({ state: 'visible', timeout: 4000 });

    await loanPage.login();

    const loanDetailPage = new LoanDetailPage(page);
    const finalAmountText = await loanDetailPage.finalAmount.textContent();
    const finalMonthlyPaymentText = await loanDetailPage.finalMonthlyPayment.textContent();
    const finalPeriodText = await loanDetailPage.finalPeriod.textContent();

    expect.soft(finalAmountText).toBe('1000 €');
    expect.soft(finalMonthlyPaymentText).toBe('43.87 €');
    expect.soft(finalPeriodText).toBe('24 months');
});

test('Scroll and viewport visible elements', async () => {
    await loanPage.applyLoanButton2.scrollIntoViewIfNeeded();
    await expect.soft(loanPage.applyLoanButton2).toBeInViewport();
});

test('Negative Credit Score Less Than 500 €', async () => {
    await loanPage.amountInput.fill('499');
    await loanPage.periodSelect.selectOption('12');
    await expect.soft(loanPage.errorPaymentMessage).toBeVisible();
    await expect.soft(loanPage.errorPaymentMessage).toHaveText('Oops, something went wrong');
});

test('Test sliders when taking a loan for the maximum amount and term', async ({page}) => {
    await loanPage.amountSlider.fill('10000')
    await loanPage.periodSlider.fill('36')
    await loanPage.monthlyAmountText.waitFor({state: 'visible', timeout: 4000})
    await loanPage.login()
    const loanDetailPage = new LoanDetailPage(page)
    const finalAmountText = await loanDetailPage.finalAmount.textContent()
    const finalMonthlyPaymentText = await loanDetailPage.finalMonthlyPayment.textContent()
    const finalPeriodText = await loanDetailPage.finalPeriod.textContent()
    expect.soft(finalAmountText).toBe('10000 €')
    expect.soft(finalMonthlyPaymentText).toBe('299.71 €')
    expect.soft(finalPeriodText).toBe('36 months')
});