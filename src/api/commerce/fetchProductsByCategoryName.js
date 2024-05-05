import Commerce from "@chec/commerce.js";

const fetchProductsByCategoryName = async (categoryName) => {
    const commerce = new Commerce('pk_test_5679231f0e50d09e47c1f7773673522a983eddfbb0303', true);

    try {
        const { data: products } = await commerce.products.list({ category_slug: categoryName});
        return products;
    } catch (error) {
        console.error('Error fetching products by category: ', error);
        throw error;
    }
};

export default fetchProductsByCategoryName;