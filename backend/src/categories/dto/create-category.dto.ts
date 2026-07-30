import {IsNotEmpty, } from 'class-validator'


// AQUI DEFINIMOS LAS DATOS INGRESADOS POR EL USUARIO
// VALIDACION & ESTRUCTURA 
export class CreateCategoryDto {
    @IsNotEmpty({message: 'El nombre de la categoria no puede ir vacio'})
    name!: string 
}
