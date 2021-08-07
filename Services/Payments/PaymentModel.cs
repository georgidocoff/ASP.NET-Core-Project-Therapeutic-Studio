namespace TherapeuticStudio.Services.Payments
{
    using System;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq.Expressions;

    using TherapeuticStudio.Data.Entity;

    public class PaymentModel
    {
        public Guid Id { get; set; }

        public int Type { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public Guid ClientId { get; set; }

        public DateTime? CreateTimeStamp { get; set; }

        public DateTime? UpdateTimeStamp { get; set; }

        public static Expression<Func<Payment, PaymentModel>> ProjectTo()
        {
            return payment => new PaymentModel
            {
                Id = payment.Id,
                Type = payment.PaymentType,
                Price = payment.Price,
                ClientId = payment.ClientId,
                CreateTimeStamp = payment.CreateAt,
                UpdateTimeStamp = payment.UpdateAt
            };
        }
    }
}
