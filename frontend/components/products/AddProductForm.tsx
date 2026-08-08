"use client"
import { AddProduct } from '@/actions/add-product-action'
import { useRouter } from 'next/navigation'
import React, { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'


export default function AddProductForm({children}: {children: React.ReactNode}) {
    
    const router = useRouter()
    const [state, dispatch] = useActionState(AddProduct, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.errors){
            state.errors.forEach(error => toast.error(error))
        }

        if(state.success){
            toast.success(state.success)
            router.push('/admin/product?page=1')
            
        }
    }, [state])

    
    

    return (
        <form action={dispatch}>
            {children}
            <input
                type='submit'
                className="rounded cursor-pointer bg-green-400 font-bold py-2 px-10 mt-5 "
                value='Registrar'
            />
        </form>


    )
}
