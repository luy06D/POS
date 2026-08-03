import { create } from 'zustand'
import { Product, ShoppingCart } from './schemas'
import { devtools } from 'zustand/middleware'

interface Store {
    total: number
    contents: ShoppingCart
    addToCard: (product: Product) => void
    updateQuantity : (id: Product['id'], quantity: number) => void
    deleteItemProduct : (id: Product['id']) => void
    calculateTotal : () => void
}


export const useStore = create<Store>()(devtools((set, get) => ({
    total: 0,
    contents: [],
    // Agregar los productos al carrito...
    addToCard: (product) => {
        const { id: productId, ...data } = product
        let contents: ShoppingCart = []

        const duplicated = get().contents.findIndex(items => items.productId === productId)
        if (duplicated >= 0) {
            if(get().contents[duplicated].quantity >= get().contents[duplicated].inventory) return

            contents = get().contents.map(item => item.productId === productId ? {
                ...item,
                quantity: item.quantity +1 
            }: item)

        } else {
            contents = [...get().contents, {
                ...data,
                quantity: 1,
                productId
            }]

        }

        set(() => ({
            contents
        }))

        get().calculateTotal()
    },

    //Actualizar la cantidad desde el select del carrito..
    updateQuantity: (id, quantity) => {
        const contents = get().contents.map(item => item.productId === id ? {...item, quantity}: item)
        set(() => ({
            contents
        }))

         get().calculateTotal()
    },

    deleteItemProduct: (id) => {
        set((state) => ({
            contents: state.contents.filter(item => item.productId !== id

            )
        }))

         get().calculateTotal()
    },
    calculateTotal: () => {
        const total = get().contents.reduce((total, item) => total + (item.quantity * item.price), 0)
        set(() => ({
            total
        }))
    }
})))