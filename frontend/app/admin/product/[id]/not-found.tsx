import Heading from "@/components/ui/Heading";
import Link from "next/link";


export default function NotFound() {
    return (
        <div className="text-center">
            <Heading>Producto no Encontrado</Heading> {''}
            <p>Talvez quieras regresar a
                <Link
                    href={'/admin/product?page=1'}
                    className= "font-bold text-green-500 "
                > Productos</Link>
            </p>
        </div>
    )
}
