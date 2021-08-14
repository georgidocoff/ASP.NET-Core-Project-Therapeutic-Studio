export class PaymentModel implements IPaymentModel{
    type: number;
    price: number;
    clientId: string;
    createAt: Date;
    updateAt?: Date;
    id?: string;
}