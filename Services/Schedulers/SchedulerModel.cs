namespace TherapeuticStudio.Services.Schedulers
{
    using System;
    using System.Globalization;
    using System.Linq.Expressions;

    using TherapeuticStudio.Data.Entity;

    public class SchedulerModel
    {
        public Guid Id { get; set; }

        public string TimeStamp { get; set; }

        public int TherapistId { get; set; }

        public Тherapist Тherapist { get; set; }

        public Guid ClientId { get; set; }

        public Client Client { get; set; }

        public int ProcedureId { get; set; }

        public Procedure Procedure { get; set; }

        public int PaymentType { get; set; }

        public Guid? PaymentId { get; set; }

        public Payment Payment { get; set; }

        public static Expression<Func<Scheduler, SchedulerModel>> ProjectTo()
        {
            return scheduler => new SchedulerModel
            {
                Id = scheduler.Id,
                TimeStamp = scheduler.TimeStamp.ToString("O"),
                TherapistId = scheduler.TherapistId,
                ClientId = scheduler.ClientId,
                ProcedureId = scheduler.ProcedureId,
                PaymentType = scheduler.PaymentType,
                PaymentId = scheduler.PaymentId
            };
        }
    }
}
