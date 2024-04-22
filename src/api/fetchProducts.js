import Commerce from "@chec/commerce.js";

const fetchProducts = async () => {
    const commerce = new Commerce('pk_test_5679231f0e50d09e47c1f7773673522a983eddfbb0303', true);
    try {
      const { data } = await commerce.products.list();
      console.log('Products Data: ', data);
      return data;
    } catch (error) {
      console.error('Error loading products: ', error);
      throw error;
    }
  };

  export default fetchProducts;