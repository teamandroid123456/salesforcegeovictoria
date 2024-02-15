import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class DataVtexDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  rclastsessiondate: string;

  @IsNotEmpty()
  @IsString()
  rclastcart: string;

  @IsNotEmpty()
  @IsString()
  accountName: string;

  @IsNotEmpty()
  @IsString()
  rclastcartvalue: string;

  @IsNotEmpty()
  @IsNumber()
  carttag: number;
  
  @IsNotEmpty()
  @IsString()
  accountId:string;
}
