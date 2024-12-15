import { test, expect } from '@playwright/test'; // Import the required test and expect modules from Playwright

test('ValidateLoggingInUsingValidCredentials', async ({ page }) => {

    // Step 1: Open the website URL
    await test.step('Open the Website URL', async () => {

        // Navigate to the Wiley Online Library website
        await page.goto("https://onlinelibrary.wiley.com/");

        // Verify the page title to confirm successful navigation
        await expect(page).toHaveTitle("Wiley Online Library | Scientific research articles, journals, books, and reference works");
    });

    // Step 2: Click on the Login/Register link
    await test.step('Click on the Login/Register link', async () => {

        // Locate the 'Login/Register' button and click it
        await page.locator("//span[@class='sign-in-label']").click();
    });

    // Step 3: Select the Individual Login option from the dropdown menu
    await test.step('Click on the Individual Login option from the dropdown menu', async () => {
        
        // Click on the 'Individual login' option
        await page.locator("//a[normalize-space()='Individual login']").click();
        
        // Verify the presence of the 'Sign in to CONNECT' text to ensure navigation to the login page
        const signInText = page.getByText('Sign in to CONNECT', {exact:true}).and(page.locator("//p[@class='MuiTypography-root MuiTypography-body1 css-12d5dwb']"));
        await expect(signInText).toBeVisible({timeout: 5000});
    });

    // Step 4: Enter a valid email address as credentials and click the continue button
    await test.step('Enter valid Email address as a credential and click continue button', async () => {
        
        // Fill in the email input field with a valid email address
        await page.locator("//input[@id='email-input']").fill('smg.2000gunarathna@gmail.com');
        
        // Click the continue button
        await page.locator("//button[@id='sign-in-btn']").click();
        
        // Verify the 'Enter password' prompt appears to ensure progression to the password input step
        const enterPasswordText = page.getByText('Enter password', {exact:true}).and(page.locator("//p[@class='MuiTypography-root MuiTypography-body1 css-12d5dwb']"));
        await expect(enterPasswordText).toBeVisible({timeout: 5000});
    });

    // Step 5: Enter the correct password and click the continue button
    await test.step('Enter the correct password and click continue button', async () => {
        
        // Enter the password into the password input field
        await page.locator("//input[@id='pass-input']").pressSequentially(',5v+5DVmYV~K}U}');
        
        // Click the sign-in button to log in
        await page.locator("//button[@id='password-sign-in-btn']").click();
        
        // Verify the presence of the homepage logo/image to ensure successful login
        const homePageText = page.getByAltText('Wiley Online Library');
        await expect(homePageText).toBeVisible({timeout: 5000});
    })

});