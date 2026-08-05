import { SubmitOrder } from "@/actions/submit-order-action"
import { useActionState, useEffect, useEffectEvent } from "react"
import { useStore } from "@/src/store"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"


export default function SubmitOrderForm() {

   // const router = useRouter()
    const total = useStore(state => state.total)
    const coupon = useStore(state => state.coupon.name)
    const contents = useStore(state => state.contents)
    const clearShoppingCart = useStore(state => state.clearShoppingCart)
    const order = {
        total,
        coupon,
        contents
    }

    const SubmitOrderWithDate = SubmitOrder.bind(null , order)
    const [state, dispatch] = useActionState(SubmitOrderWithDate, {
        errors: [],
        success: ''
    })


    useEffect(() => {
        if(state.errors){
            state.errors.forEach(error => toast.error(error))
        }
        if(state.success){
            toast.success(state.success)
            clearShoppingCart()

         //   router.refresh()
        }
    }, [state])

    return (
        <form
        action={dispatch}
        >
            <input
                type="submit"
                className="mt-5 w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3"
                value={'Confirmar venta'}
            />
        </form>
    )
}
