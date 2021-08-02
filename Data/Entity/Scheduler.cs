namespace TherapeuticStudio.Data.Entity
{
    using System;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Scheduler
    {
        public Guid Id { get; set; }

        public DateTime TimeStamp { get; set; }

        public int TherapistId { get; set; }

        [ForeignKey(nameof(TherapistId))]
        public Тherapist Тherapist { get; set; }

        public Guid ClientId { get; set; }

        [ForeignKey(nameof(ClientId))]
        public Client Client { get; set; }

        public int ProcedureId { get; set; }

        [ForeignKey(nameof(ProcedureId))]
        public Procedure Procedure { get; set; }

        public int PaymentType { get; set; }

        public Guid? PaymentId { get; set; }

        [ForeignKey(nameof(PaymentId))]
        public Payment Payment { get; set; }
    }
}
