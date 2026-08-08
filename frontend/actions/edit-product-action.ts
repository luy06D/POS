"use server"

import { ErrorResponseSchema, Product, ProductFormSchema, SuccessResponseSchema } from "@/src/schemas"

type actionStateType = {
    errors: string[]
    success: string

}

export async function EditProduct(idProduct: Product['id'],  prevState: actionStateType, formData: FormData) {
    
    const productData = {
        name : formData.get('name'),
        price : formData.get('price'),
        inventory : formData.get('inventory'),
        categoryId : formData.get('categoryId')
    }

    //Validaciones
    const product = ProductFormSchema.safeParse(productData)

    if(!product.success){
        const errors = product.error.issues.map(issue => issue.message)
        return{
            errors,
            success : prevState.success
        }
    }

    // Registrar los productos
    const url = `${process.env.API_URL}products/${idProduct}`
    const req = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json' 
        },
        body: JSON.stringify({
            name: product.data.name,
            price: product.data.price,
            inventory: product.data.inventory,
            categoryId : product.data.categoryId
        })
    })

    const json = await req.json()

    if(!req.ok){
        const errors = ErrorResponseSchema.parse(json)
        return{
            errors: errors.message.map(issue => issue),
            success: ''
        }
    }

    // const success = SuccessResponseSchema.parse(json)
    
    return{
        errors: [],
        success: 'Producto actualizado correctamente.'
    }
    
}