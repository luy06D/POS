import { CategoriesResponseSchema, Product, ProductType } from "@/src/schemas"

async function getCategories() {

    const url = `${process.env.API_URL}categories`
    const req = await fetch(url)
    const json = await req.json()
    const categories = CategoriesResponseSchema.parse(json)
    return categories
}

export default async function ProductForm({product} : {product?:ProductType }) {

    const categories = await getCategories()
    console.log(product);
    
    return (
        <>
            <div className="space-y-1 ">
                <label
                    htmlFor="name"
                    className="block"
                >Nombre Producto</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre Producto"
                    className="border border-gray-300 w-full p-2"
                    name="name"
                    defaultValue={product?.name}
                />
            </div>

            <div className="space-y-1 ">
                <label
                    htmlFor="price"
                    className="block mt-2"
                >Precio</label>
                <input
                    id="price"
                    type="number"
                    placeholder="Precio Producto"
                    className="border border-gray-300 w-full p-2"
                    name="price"
                    min={0}
                    defaultValue={product?.price}
                />
            </div>

            <div className="space-y-1 ">
                <label
                    htmlFor="inventory"
                    className="block mt-2"
                >Inventario</label>
                <input
                    id="inventory"
                    type="number"
                    placeholder="Cantidad Disponible"
                    className="border border-gray-300 w-full p-2"
                    name="inventory"
                    min={0}
                    defaultValue={product?.inventory}
                />
            </div>

            <div className="space-y-1 ">
                <label
                    htmlFor="categoryId"
                    className="block mt-2"
                >Categoría</label>
                <select
                    id="categoryId"
                    className="border border-gray-300 w-full p-2 bg-white"
                    name="categoryId"
                    defaultValue={product?.category.id}
                >
                    <option value="">Seleccione</option>
                    {categories.map(category => (
                        <option value={category.id} key={category.id} >{category.name}</option>
                    ))}


                </select>
            </div>

        </>
    )
}