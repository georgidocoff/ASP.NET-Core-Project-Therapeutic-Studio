namespace TherapeuticStudio.Services.Payments
{
    using Microsoft.EntityFrameworkCore;

    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Threading.Tasks;

    using TherapeuticStudio.Data;
    using TherapeuticStudio.Data.Entity;

    public class PaymentService : IPaymentService
    {
        private readonly ApplicationDbContext applicationDbContext;

        public PaymentService(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        public async Task<PaymentModel> CreatePayment(PaymentModel paymentModel, Guid schedulerId)
        {
            var scheduler = this.applicationDbContext.Schedulers
                                    .FirstOrDefault(x => x.Id == schedulerId);

            if (scheduler.PaymentId != null)
            {
                var currentPayment = this.applicationDbContext.Payments.FirstOrDefault(p => p.Id == scheduler.PaymentId);

                currentPayment.PaymentType = paymentModel.Type;
                currentPayment.Price = paymentModel.Price != 0 ? paymentModel.Price : currentPayment.Price;
                currentPayment.UpdateAt = DateTime.UtcNow;

                this.applicationDbContext.Payments.Update(currentPayment);

                await this.applicationDbContext.SaveChangesAsync();
                paymentModel.Id = scheduler.PaymentId.Value;
                return (paymentModel);
            }

            var payment = new Payment()
            {
                Id = paymentModel.Id,
                PaymentType = paymentModel.Type,
                Price = paymentModel.Price,
                ClientId = paymentModel.ClientId,
                CreateAt = DateTime.UtcNow
            };

            this.applicationDbContext.Payments.Add(payment);

            await this.applicationDbContext.SaveChangesAsync();
            paymentModel.Id = payment.Id;
            paymentModel.CreateTimeStamp = payment.CreateAt;
            return paymentModel;
        }

        public async Task<IEnumerable<PaymentModel>> GetPaymentsByDate(string currentDate)
        {
            DateTime currDate;

            var isCurrDate = DateTime.TryParseExact(currentDate,
                "R",
                CultureInfo.InvariantCulture, DateTimeStyles.None, out currDate);

            if (!isCurrDate)
            {
                throw new InvalidCastException("The date is in incorect format.");
            }

            return await applicationDbContext.Payments
                .Select(PaymentModel.ProjectTo())
                .Where(ts => ts.CreateTimeStamp.Value.Date == currDate.Date)
                .ToListAsync();
        }
    }
}
