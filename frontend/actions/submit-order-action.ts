"use server"

import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "@/src/schemas"
import { revalidateTag, updateTag } from "next/cache"

 
type actionStateType = {
    errors : string[]
    success : string
}
export async function SubmitOrder(order:unknown,  prevState: actionStateType){
    
    const dataOrder = OrderSchema.parse(order)

    //Transaction register
    const url = `${process.env.API_URL}transactions`
    const req = await fetch(url , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...dataOrder})
    })

    const json = await req.json()
    if(!req.ok){
        const errors = ErrorResponseSchema.parse(json)
        return{
            errors: errors.message.map(issues => issues),
            success: ''
        }
    }

    const success = SuccessResponseSchema.parse(json)
    updateTag('products-by-category')

    return{
        errors: [],
        success: success.message
    }
    
}