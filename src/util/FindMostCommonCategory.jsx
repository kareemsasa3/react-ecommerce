/**
 * Finds the most common category ID from a list of category IDs.
 *
 * @param {Array<number>} categoryIds - An array of category IDs.
 * @returns {number | null} - The most common category ID, or null if no categories are found.
 */
const findMostCommonCategory = (categoryIds) => {
    if (!categoryIds || categoryIds.length === 0) {
      console.log('No category IDs provided or list is empty.');
      return null; // Return null if the list is empty or invalid
    }
  
    const categoryCount = {}; // Object to count category occurrences
    
    // Count the occurrences of each category ID
    categoryIds.forEach((categoryId) => {
      if (!categoryCount[categoryId]) {
        categoryCount[categoryId] = 1; // Initialize count
      } else {
        categoryCount[categoryId] += 1; // Increment count
      }
    });
  
    // Determine the most common category ID
    let mostCommonCategoryId = null;
    let maxCount = 0;
    
    Object.entries(categoryCount).forEach(([categoryId, count]) => {
      if (count > maxCount) {
        mostCommonCategoryId = Number(categoryId); // Update most common category ID
        maxCount = count; // Update maximum count
      }
    });
  
    console.log('Most common category ID:', mostCommonCategoryId); // Log the result
  
    return mostCommonCategoryId; // Return the most common category ID
  };
  
  export default findMostCommonCategory;
  