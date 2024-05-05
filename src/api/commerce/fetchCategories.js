import Commerce from "@chec/commerce.js";

const fetchCategories = async () => {
    const commerce = new Commerce('pk_test_5679231f0e50d09e47c1f7773673522a983eddfbb0303', true);
    try {
      const { data: categories } = await commerce.categories.list();
      return categories;
    } catch (error) {
      console.error('Error fetching categories: ', error);
      throw error;
    }
  };

  export default fetchCategories;