import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { CarritoabandonadoService } from './carritoabandonado.service';
import { DataVtexDto } from './dto/create-carritoabandonado.dto';
import { ValidationPipe } from '@nestjs/common';
import * as moment from 'moment'; 

@Controller('carritoabandonado')
export class CarritoabandonadoController {
  constructor(private readonly carritoabandonadoService: CarritoabandonadoService) {}
  
  @Post('/enviar-data')
  @UsePipes(new ValidationPipe())
  async obtenerDetallesDelProducto(@Body() dataVtexDto: DataVtexDto) {
    console.log(dataVtexDto.rclastcart);
    const rclastcart = dataVtexDto.rclastcart;
    const matches = rclastcart.match(/sku=([^&]+)/g); 
    const sessionDate = moment(dataVtexDto.rclastsessiondate).format('YYYY-MM-DD');
    const skus = matches ? matches.map(match => match.split('=')[1]) : [];
    if (!skus.length) {
      return { error: 'SKUs no encontrados en la solicitud' };
    }

    try {
      const productDetails = await this.carritoabandonadoService.getProductDetails(skus, dataVtexDto.email ,dataVtexDto.accountId,sessionDate);
      return { productDetails };
    } catch (error) {
      return { error: 'Error al obtener detalles de los productos' };
    }
  }

  @Post('/actualizar-data')
  @UsePipes(new ValidationPipe())
  async actualizarDataProducto(@Body() dataVtexDto: DataVtexDto) {
    console.log(dataVtexDto.rclastcart);
    const rclastcart = dataVtexDto.rclastcart;
    const matches = rclastcart.match(/sku=([^&]+)/g); 
    const sessionDate = moment(dataVtexDto.rclastsessiondate).format('YYYY-MM-DD');
    const skus = matches ? matches.map(match => match.split('=')[1]) : [];
    if (!skus.length) {
      return { error: 'SKUs no encontrados en la solicitud' };
    }

    // try {
    //   this.carritoabandonadoService.sendDataToEndpoint(productDetails, email, accountId,sessionDate,accessToken);
    //   const productDetails = await this.carritoabandonadoService.getProductDetails(skus, dataVtexDto.email ,dataVtexDto.accountId,sessionDate);
    //   return { productDetails };
    // } catch (error) {
    //   return { error: 'Error al obtener detalles de los productos' };
    // }
  }
}