import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { categories } from './data/categories';
import { products } from './data/products';


@Injectable()
export class SeederService {

    constructor(
        @InjectRepository(Category) private readonly categoriRepository : Repository<Category>,
        @InjectRepository(Product) private readonly productRepository : Repository<Product>,
        private datasource: DataSource
    ){}

    //Limpia la base de datos 
    async onModuleInit(){
       const connection = this.datasource
       await connection.dropDatabase()
       await connection.synchronize()
    }
    //Inyecta los datos en la base de datos 
    async seed(){
        await this.categoriRepository.save(categories)
        for await (const seedProduct of products){
            const category = await this.categoriRepository.findOneBy({id: seedProduct.categoryId})
            const product = new Product()
            product.name = seedProduct.name
            product.image = seedProduct.image
            product.price = seedProduct.price
            product.inventory = seedProduct.inventory
            product.category = category!
            await this.productRepository.save(product)
        }
    }
}
