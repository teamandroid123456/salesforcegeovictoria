import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CarritoabandonadoService {
  constructor() {}

  private async getAccessToken(): Promise<string> {
    try {
      const response = await axios.post('https://mccpl-f2jqb2j21shfrqv655qlv4.auth.marketingcloudapis.com/v2/token', {
        grant_type: 'client_credentials',
        client_id: 'rhcpyzt0o6ks3c2qzcpy47x1',
        client_secret: 'QkngX4gxSXSGUcuD2BvWHZHB'
      });
      return response.data.access_token;
    } catch (error) {
      throw new Error('Error al obtener el token de acceso');
    }
  }
  async   getProductDetails(skus: string[], email: string,accountId:string,sessionDate:string): Promise<any[]> {
    try {
      const accessToken = await this.getAccessToken();
      const productDetailsPromises = skus.map(async (skuValue: string) => {
        const response = await axios.get(`https://footloose.vtexcommercestable.com.br/api/catalog_system/pub/products/search?fq=skuId:${skuValue}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const productName = response.data[0].productName;
        const imageUrl = response.data[0].items[0].images[0].imageUrl;
        let listPrice = response.data[0].items[0].sellers[0].commertialOffer.ListPrice;
        let price = response.data[0].items[0].sellers[0].commertialOffer.Price;
        if (listPrice === price) {
          listPrice = "";
        }
  
        return {
          email, 
          productName,
          imageUrl,
          listPrice,
          price,
          accountId,
          sku: skuValue,
          flag:0  ,
          sessionDate       
        };
      });
      const productDetails = await Promise.all(productDetailsPromises);
      await this.sendDataToEndpoint(productDetails, email, accountId,sessionDate,accessToken); // Se pasa el email como parámetro
      return productDetails;
    } catch (error) {
      throw new Error('Error al obtener detalles de los productos');
    }
  }
  
  private async sendDataToEndpoint(productDetails: any[], email: string,accountId:string,sessionDate:string, accessToken: string): Promise<void> {
    try {
      const dataToSend = {
        items: productDetails.map((product: any) => {
          return {
            email,
            productName: product.productName,
            imageUrl: product.imageUrl,
            listPrice: product.listPrice,
            price: product.price,
            accountId,
            sku: product.sku ,
            flag:0,
            fechaCarrito:sessionDate,
            sessionDate
          };
        }),
      };
  
        await axios.post('https://mccpl-f2jqb2j21shfrqv655qlv4.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:7908B309-D4F6-4DC2-A371-3C2719914DFB/rows', dataToSend, {
          headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      console.log('Datos enviados correctamente al endpoint.');
    } catch (error) {
      throw new Error('Error al enviar los datos al endpoint');
    }
  }
}  