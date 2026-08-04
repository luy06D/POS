"use client"

import { useStore } from "@/src/store"
import ShoppingCartItem from "./shoppingCartItem"
import Amount from "./Amount"
import CouponForm from "./couponForm"

export default function shoppingStore() {

  const content = useStore(state => state.contents)
  const total = useStore(state => state.total)
  const discount = useStore(state => state.discount)
  return (
    <>
      {content.length ? (
        <>
          <h2 className="text-4xl font-bold  text-gray-900">Resumen de Venta</h2>

          <ul role="list" className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500 ">
            {content.map(item => (
              <ShoppingCartItem
                key={item.productId}
                item={item}
              />
            ))}
          </ul>
          <dl className="space-y-6 border-t border-gray-300 py-6 text-sm font-medium text-gray-500">

            {discount ? (
              <Amount
                label="Descuento: "
                amount={discount}
                discount={true}
              />
            ) : null}

            <Amount
              label="Total a pagar: "
              amount={total}
            />
          </dl>
          <CouponForm />

        </>
      ) : (

        <p className="text-xl text-center text-gray-900">El carrito de compra esta vacio</p>
      )}


    </>
  )
}
