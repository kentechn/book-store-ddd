import { 
  Body, 
  Controller, 
  HttpCode, 
  HttpStatus, 
  Post 
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/order.dto';

@Controller('orders')
export class OrderController {
  constructor() {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<void> {
    // TODO: order usecaseの呼び出し
  }
}
