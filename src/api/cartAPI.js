import instance from "./instance";

export const cartAPI = {
    addToCart(id) {
        return instance
            .get(`products/${id}`)
    },

};