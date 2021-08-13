namespace TherapeuticStudio.Services.Payments
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IPaymentService
    {
        Task<PaymentModel> CreatePayment(PaymentModel paymentModel, Guid schedulerId);

        Task<IEnumerable<PaymentModel>> GetPaymentsByDate(string currentDate);
    }
}
