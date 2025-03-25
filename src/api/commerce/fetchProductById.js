import Commerce from "@chec/commerce.js";

const fetchProductById = async (id) => {
    const commerce = new Commerce('pk_test_5679231f0e50d09e47c1f7773673522a983eddfbb0303', true);
    try {
        const productData = await commerce.products.retrieve(id);
        return productData;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export default fetchProductById;