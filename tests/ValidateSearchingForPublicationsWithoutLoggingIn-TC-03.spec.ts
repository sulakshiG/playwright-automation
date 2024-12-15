import { test, expect } from '@playwright/test'; // Import the required test and expect modules from Playwright

test('ValidateSearchingForPublicationsWithoutLoggingIn', async ({ page }) => {

    // Step 1: Open the website URL
    await test.step('Open the Website URL', async () => {

        // Navigate to the Wiley Online Library website
        await page.goto(" https://onlinelibrary.wiley.com/ ");

        // Verify the page title to ensure successful navigation
        await expect(page).toHaveTitle('Wiley Online Library | Scientific research articles, journals, books, and reference works');
    });

    // Step 2: Enter a search term in the search field
    await test.step('Click on the search field and enter some value', async () => {
        
        // Locate the search input field and type the keyword "Agriculture" with a slight delay between keystrokes
        await page.locator("//input[@id='searchField1']").pressSequentially("Agriculture", { delay: 200 }); 
    })
    
    // Step 3: Click the search button to perform the search
    await test.step('Click on the Search button', async () => {

        // Locate and click the search button
        await page.locator("//button[@title='Search']").click();
        // await page.pause();

        // Locate the element displaying search results
        const searchResultText = page.locator("//span[@class='result__suffix']");
        
        // Verify that the search result element is visible within a timeout of 10 seconds
        await expect(searchResultText).toBeVisible({timeout: 10000});

          // Validate that the search results contain the keyword "Agriculture"
        await expect(searchResultText).toHaveText('Agriculture');

    });

});