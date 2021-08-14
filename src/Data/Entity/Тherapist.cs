namespace TherapeuticStudio.Data.Entity
{
    using System.ComponentModel.DataAnnotations;

    using TherapeuticStudio.Data.Enums;

    using static ApiConstants;

    public class Тherapist
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(ТherapistNameMaxLenght)]
        public string FirstName { get; set; }

        [MaxLength(ТherapistNameMaxLenght)]
        public string MiddleName { get; set; }

        [Required]
        [MaxLength(ТherapistNameMaxLenght)]
        public string LastName { get; set; }

        public PositionType? PositionType { get; set; }

        public RoleType? RoleType { get; set; }
    }
}
