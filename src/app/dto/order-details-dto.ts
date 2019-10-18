import {CustomerDto} from './customerDto';
import {ItemDto} from './item-dto';

export class OrderDetailsDto {
  id: number;
  date: string;
  customer: CustomerDto;
  items: ItemDto;
  qty: number;
}
