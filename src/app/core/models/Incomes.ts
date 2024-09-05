import { User } from "src/app/store/actions/user.action";

export class Income {
  idIncome!: number;
  amount!: string; // Change to string to match BigDecimal
  category!: string;
  date!: string; // Change to string to match LocalDate
  user!:User
}
