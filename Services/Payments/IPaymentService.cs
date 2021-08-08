namespace TherapeuticStudio.Services.Payments
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IPaymentService
    {
        Task<PaymentModel> CreatePayment(PaymentModel paymentModel, Guid schedulerId);

        Task<IEnumerable<PaymentModel>> GetClient(Guid clientId);

        Task<IEnumerable<PaymentModel>> GetPayment(Guid id);

        Task<IEnumerable<PaymentModel>> GetPaymentsByDate(string currentDate);

        Task<PaymentModel> UpdatePayment(PaymentModel paymentModel, Guid id);

        Task<PaymentModel> DeletePayment(Guid id);
    }
}
