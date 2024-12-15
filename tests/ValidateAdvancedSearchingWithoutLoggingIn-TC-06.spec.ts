import { test, expect } from '@playwright/test';// Import the required test and expect modules from Playwright

test('ValidateAdvancedSearchingWithoutLoggingIn', async ({ page }) => {

    // Step 1: Open the website URL
    await test.step('Open the Website URL', async () => {

         // Navigate to the Wiley Online Library website
        await page.goto(" https://onlinelibrary.wiley.com/ ");

         // Verify the page title to ensure successful navigatio
        await expect(page).toHaveTitle('Wiley Online Library | Scientific research articles, journals, books, and reference works');
    });

    // Step 2: Click on the Advanced Search link
    await test.step('Click on the Advanced Search link', async () => {

         // Locate the Advanced Search link and click on it
        await page.locator("//a[normalize-space()='Advanced Search']").click();
        
        // Locate and verify the presence of the Advanced Search text and pane identifier
        const advancedSearchText = page.locator("//span[normalize-space()='Advanced Search']").and(page.locator("//a[@id='pane-5aab5ec1-e445-4b30-9dd1-5d8bd864384601con']"));
        
        // Ensure the Advanced Search elements are visible within a timeout
        await expect(advancedSearchText).toBeVisible({timeout:5000});
        
        // Click the identified Advanced Search element
        await advancedSearchText.click();
    })
    
    // Step 3: Enter a keyword in one of the text fields
    await test.step('Enter a keyword in one of the text fields', async () => {
        
        // Locate the text field and fill it with the keyword 'Agriculture'
        await page.locator("//input[@id='text1']").fill("Agriculture");
    
    });

    // Step 4: Click on the Context Search Dropdown Menu
    await test.step('Click on the Context Search Dropdown Menu', async() => {
        
        // Locate and click on the context search dropdown menu
        await page.locator("//select[@id='searchArea1']").click();
    });

    // Step 5: Click on a context search option
    await test.step('Click on a context search option', async () => {

        // Select the 'Title' option from the dropdown menu
        await page.getByText('Title', { exact: true }).click();
    });

    // Step 6: Click on the search button
    await test.step('Click on the search button', async () => {

        // Locate and click on the search button
        await page.locator("//button[@id='advanced-search-btn']").click();

        // Locate the search result text element
        const advancedSearchResultText = page.locator("//span[@class='result__suffix']");
        
        // Verify the result text is visible within a timeout
        await expect(advancedSearchResultText).toBeVisible({timeout: 10000});
        
        // Validate the search result contains specific keywords/text
        await expect(advancedSearchResultText).toHaveText('Agriculture');
        await expect(advancedSearchResultText).toHaveText('Title');
    })



});