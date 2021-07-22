namespace TherapeuticStudio.Data.Entity
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using static ApiConstants;

    public class Client
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(ClientNameMaxLenght)]
        public string FirstName { get; set; }

        [MaxLength(ClientNameMaxLenght)]
        public string MiddleName { get; set; }

        [Required]
        [MaxLength(ClientNameMaxLenght)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(ClientUcnMaxLenght)]
        [RegularExpression(ClientUcnRegExp)]
        public string UCN { get; set; }


    }
}
