import React, { useState, useEffect } from 'react';

function App() {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() = & gt; {
        // Carregar os produtos disponíveis do local storage ou de uma API
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            // Exemplo de dados iniciais de produtos
            const initialProducts = [
                { id: 1, name: 'Drone 1', description: 'O drone mais vendido', price: 1000 },
                { id: 2, name: 'Drone 2', description: 'Ótima qualidade de imagem', price: 1500 },
                { id: 3, name: 'Drone 3', description: 'Ideal para iniciantes', price: 800 }
            ];
            setProducts(initialProducts);
            localStorage.setItem('products', JSON.stringify(initialProducts));
        }

        // Carregar itens do carrinho de compra do local storageconst storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const addToCart = (product) = & gt; {
        const newCartItems = [...cartItems];
        const existingCartItem = newCartItems.find((item) = & gt; item.id === product.id);

        if (existingCartItem) {
            existingCartItem.quantity++;
        } else {
            newCartItems.push({...product, quantity: 1 });
        }

        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    const removeFromCart = (product) = & gt; {
        const newCartItems = cartItems.filter((item) = & gt; item.id !== product.id);
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    const calculateTotal = () = & gt; {
        return cartItems.reduce((total, item) = & gt; total + item.quantity * item.price, 0);
    };

    return ( <
            div >
            <
            h1 > Minha Loja < /h1>

            <
            div classname = "container" > {
                products.map((product) = & gt;
                    ( <
                        div classname = "product"
                        key = "{product.id}" >
                        <
                        h3 > { product.name } < /h3> <
                        p > { product.description } < /p> <
                        p > R$ { product.price } < /p> <
                        button onclick = "{()" == "" > addToCart(product)
                    } & gt; Adicionar ao Carrinho < /button> < /
                    div >
                ))
        } <
        /div>

    <
    div classname = "cart" >
        <
        h2 > Carrinho de Compra < /h2> {
    cartItems.map((item) = & gt;
        ( <
            div classname = "cart-item"
            key = "{item.id}" >
            <
            div >
            <
            p > { item.name } < /p> <
            p > Quantidade: { item.quantity } < /p> < /
            div > <
            button onclick = "{()" == "" > removeFromCart(item)
        } & gt; Remover < /button> < /
        div >
    ))
} {
    cartItems.length & gt;
    0 & amp; & amp; < p classname = "total" > Total: R$ { calculateTotal() } < /p>} < /
    div > <
        /div>
);
}