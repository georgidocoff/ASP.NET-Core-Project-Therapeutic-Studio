namespace TherapeuticStudio.Data.Entity
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    using static ApiConstants;

    public class Procedure
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(ProcedureNameMaxLenght)]
        public string Name { get; set; }

        [Range(0,180)]
        public int Duration { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
    }
}
