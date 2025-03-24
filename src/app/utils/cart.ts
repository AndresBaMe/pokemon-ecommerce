
import Cookies from 'js-cookie';

interface Product {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export const addToCart = (product: Product) => { // Usé el tipo 'Product' en lugar de 'any'
  const currentCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];

  const cleanedProduct = {
    id: product.id,
    name: product.name,
    quantity: 1,
    image: product.sprites?.other?.['official-artwork']?.front_default ?? '',
    price: 1500
  };

  const existingProductIndex = currentCart.findIndex((item: { id: number }) => item.id === cleanedProduct.id);

  if (existingProductIndex !== -1) {
    currentCart[existingProductIndex].quantity += 1;
  } else {
    currentCart.push(cleanedProduct);
  }

  Cookies.set('cart', JSON.stringify(currentCart), { expires: 7 });
};

export const getCart = () => {
  return Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
};

export const clearCart = () => {
  Cookies.remove('cart');
};
