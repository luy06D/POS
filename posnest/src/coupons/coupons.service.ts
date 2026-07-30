import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
import { endOfDay, isAfter } from 'date-fns';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon) private readonly couponRepository : Repository<Coupon>
  ){}
  create(createCouponDto: CreateCouponDto) {
    return this.couponRepository.save(createCouponDto)
  }

  findAll() {
    return this.couponRepository.find()
  }

  async findOne(id: number) {
    const coupons = await this.couponRepository.findOneBy({id})
    if(!coupons){
      throw new NotFoundException('El cupón no existe')
    }

    return coupons
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.findOne(id)
    Object.assign(coupon, updateCouponDto)
    return await this.couponRepository.save(coupon)
  }

  async remove(id: number) {
    const coupon = await this.findOne(id)
    await this.couponRepository.remove(coupon)
    return 'Cupón eliminado correctamente'
  }

  async ApplyCoupon(couponName: string){
    const couponExist = await this.couponRepository.findOneBy({name: couponName})
    if(!couponExist){
      throw new NotFoundException('El cupón no existe')
    }

    const currentDate = new Date()
    const expirationDate = endOfDay(couponExist.expirationDate)

    if(isAfter(currentDate, expirationDate)){
      throw new UnprocessableEntityException('Cupón ya expirado')
    }

    return{
      message: 'Cupón válido',
      ...couponExist
    }
  }


}
