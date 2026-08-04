import { create } from 'zustand'
import { Coupon, CouponResponseSchema, Product, ShoppingCart } from './schemas'
import { devtools } from 'zustand/middleware'

interface Store {
    total: number
    contents: ShoppingCart
    coupon: Coupon
    discount : number
    addToCard: (product: Product) => void
    updateQuantity: (id: Product['id'], quantity: number) => void
    deleteItemProduct: (id: Product['id']) => void
    calculateTotal: () => void
    applyCoupon: (couponName: string) => void
    applyDiscount: () => void
    clearShoppingCart: () => void
}

const inicialState = {
        total: 0,
    discount: 0,
    contents: [],
    coupon: {
        name: '',
        message: '',
        percentage: 0,

    }
}

export const useStore = create<Store>()(devtools((set, get) => ({
    ...inicialState,

    // Agregar los productos al carrito...
    addToCard: (product) => {
        const { id: productId, ...data } = product
        let contents: ShoppingCart = []

        const duplicated = get().contents.findIndex(items => items.productId === productId)
        if (duplicated >= 0) {
            if (get().contents[duplicated].quantity >= get().contents[duplicated].inventory) return

            contents = get().contents.map(item => item.productId === productId ? {
                ...item,
                quantity: item.quantity + 1
            } : item)

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
        const contents = get().contents.map(item => item.productId === id ? { ...item, quantity } : item)
        set(() => ({
            contents
        }))

        get().calculateTotal()
    },
    // Quitar items del carrito..
    deleteItemProduct: (id) => {
        set((state) => ({
            contents: state.contents.filter(item => item.productId !== id)
        }))

        if(!get().contents.length){
            get().clearShoppingCart()
        }

        get().calculateTotal()
    },
    // Total a pagar - productos
    calculateTotal: () => {
        const total = get().contents.reduce((total, item) => total + (item.quantity * item.price), 0)
        set(() => ({
            total
        }))

        if(get().coupon.percentage){
            get().applyDiscount()
        }
    },
    // Apliar cupon de descuento..
    applyCoupon: async (couponName) => {
        const req = await fetch('/coupons/api', {
            method: 'POST',
            body: JSON.stringify({
                coupon_name: couponName
            })
        })

        const json = await req.json()

        const coupon = CouponResponseSchema.parse(json)
        set(() => ({
            coupon
        }))

        if(coupon.percentage){
            get().applyDiscount()
        }


    },
    // Aplicar el descuento del cupon valido
    applyDiscount: () => {
        const subTotalAmount = get().contents.reduce((total, item) => total + (item.quantity * item.price), 0)
        const discount = (get().coupon.percentage / 100) * subTotalAmount
        const total = subTotalAmount - discount

        set(() => ({
            discount,
            total    // Seteamos el nuevo total a pagar 
        }))
    },

    clearShoppingCart: () => {
        set(() => ({
            ...inicialState
        }))
    }
})))