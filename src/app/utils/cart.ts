// src/utils/cart.ts
import Cookies from 'js-cookie';

// Función para agregar productos al carrito
export const addToCart = (product: any) => {
  const currentCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];

  // Datos mínimos que sí puedes serializar sin problemas
  const cleanedProduct = {
    id: product.id,
    name: product.name,
    quantity: 1,
    image: product.sprites?.other?.['official-artwork']?.front_default ?? '', // ruta de imagen
    price: 1500 // puedes ajustar esto dinámicamente si usas otro precio
  };

  const existingProductIndex = currentCart.findIndex((item: any) => item.id === cleanedProduct.id);

  if (existingProductIndex !== -1) {
    currentCart[existingProductIndex].quantity += 1;
  } else {
    currentCart.push(cleanedProduct);
  }

  Cookies.set('cart', JSON.stringify(currentCart), { expires: 7 });
};

// Función para obtener los productos del carrito
export const getCart = () => {
  console.log(Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [])
  return Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : []
};

// Función para limpiar el carrito
export const clearCart = () => {
  Cookies.remove('cart');
};
