namespace TherapeuticStudio.Data.Entity
{
    using System;
    using System.ComponentModel.DataAnnotations.Schema;

    using TherapeuticStudio.Data.Enums;

    public class Payment
    {
        public Guid Id { get; set; }

        public int PaymentType { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public Guid ClientId { get; set; }

        public Client Client { get; set; }

        public DateTime? CreateAt { get; set; }

        public DateTime? UpdateAt { get; set; }
    }
}
