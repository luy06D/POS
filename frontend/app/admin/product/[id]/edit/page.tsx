import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{id: string}>

// Obtener productos por id...
  async function getProduct(id: string) {
    const url =  `${process.env.API_URL}products/${id}`
    const req = await fetch(url)
    const json = await req.json()

    if(!req.ok){
      notFound()
    }
    return json

  }

export default async function EditProductPage({params} : {params : Params}) {

  const {id}  = await params

  const product = await getProduct(id)
  
  return (  

    
    <>

      <Link
        href={'/admin/product?page=1'}
        className="rounded bg-green-400 font-bold py-2 px-10"
      >Volver</Link>
      <Heading>Editar Producto : {product.name}</Heading>

      <EditProductForm>
        <ProductForm 
        product={product}
        />
      </EditProductForm>


    </>
  )
}
