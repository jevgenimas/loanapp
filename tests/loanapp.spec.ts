import {test, expect} from "@playwright/test";
import {LoanPage} from "./pages/loan-page";
import {LoanDetailPage} from "./pages/loandetail-page";

let loanPage: LoanPage
// test.use({ viewport: { width: 200, height: 200 } });
test.beforeEach(async ({page}) => {
    loanPage = new LoanPage(page);
    await loanPage.openLoanPage()
})

test('Base elements are visible', async ({page}) => {
    await expect.soft(loanPage.amountInput).toBeVisible()
    await expect.soft(loanPage.periodSelect).toBeVisible()
    await expect.soft(loanPage.applyButton).toBeVisible()
})

test('Get loan apply for 1000 eu and 24 month', async ({page}) => {
    await loanPage.amountInput.fill('1000');
    await loanPage.periodSelect.selectOption('24');
    await loanPage.monthlyAmountText.waitFor({ state: 'visible', timeout: 4000 });
    await loanPage.login();
    const loanDetailPage = new LoanDetailPage(page);
    const finalAmountText = await loanDetailPage.finalAmount.textContent()
    const finalMonthlyPaymentText = await loanDetailPage.finalMonthlyPayment.textContent()
    const finalPeriodText = await loanDetailPage.finalPeriod.textContent()
    expect.soft(finalAmountText).toBe('1000 €');
    expect.soft(finalMonthlyPaymentText).toBe('43.87 €');
    expect.soft(finalPeriodText).toBe('24 months');
})

test('Scroll and viewport visible elements', async ({page}) => {
    await loanPage.appyLoanButton2.scrollIntoViewIfNeeded()
    await expect.soft(loanPage.appyLoanButton2).toBeInViewport()
});