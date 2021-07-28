namespace TherapeuticStudio.Services.Cients
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq.Expressions;

    using TherapeuticStudio.Data;
    using TherapeuticStudio.Data.Entity;
    using TherapeuticStudio.Services.Extensions;

    public class ClientModel
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        [MinLength(ApiConstants.ClientUcnMaxLenght)]
        [MaxLength(ApiConstants.ClientUcnMaxLenght)]
        public string UCN { get; set; }

        public static Expression<Func<Client, ClientModel>> ProjectTo()
        {
            return client => new ClientModel
            {
                Id = client.Id,
                FirstName = client.FirstName,
                MiddleName = client.MiddleName,
                LastName = client.LastName,
                UCN = SharedService.UcnModifier(client.UCN, "decrypt")
            };
        }
    }
}