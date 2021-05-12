import instance from "./instance";

export const productAPI = {
    getProducts(pageNumber, seller, name, order, min, max) {
        return instance
            .get(`products?pageNumber=${pageNumber}&seller=${seller}&name=${name}&min=${min}&max=${max}&order=${order}`);
    },
    getProduct(id) {
        return instance
            .get(`products/${id}`)
    },
    createProduct(userInfo) {
        return instance
            .post(`products`, {}, {
                headers:
                    {
                        Authorization: `Bearer ${userInfo.token}`
                    }
            })
    },
    deleteProduct(userInfo, productId) {
        return instance
            .delete(`products/${productId}`, {
                headers: {Authorization: `Bearer ${userInfo.token}`}
            });
    },
    updateProduct(userInfo, product) {
        return instance
            .put(`products/${product._id}`, product, {
                headers: {Authorization: `Bearer ${userInfo.token}`}
            });
    },
    uploadImage(userInfo, bodyFormData) {
        return instance
            .post('uploads', bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
    }
};