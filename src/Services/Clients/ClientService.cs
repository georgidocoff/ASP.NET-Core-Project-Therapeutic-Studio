namespace TherapeuticStudio.Services.Clients
{
    using Microsoft.EntityFrameworkCore;

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using TherapeuticStudio.Data;
    using TherapeuticStudio.Data.Entity;
    using TherapeuticStudio.Services.Extensions;

    public class ClientService : IClientService
    {
        private readonly ApplicationDbContext applicationDbContext;

        public ClientService(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        public async Task<ClientModel> CreateClient(ClientModel clientModel)
        {
            var client = new Client()
            {
                Id = clientModel.Id,
                FirstName = clientModel.FirstName,
                MiddleName = clientModel.MiddleName,
                LastName = clientModel.LastName,
                UCN = SharedService.UcnModifier(clientModel.UCN, "encrypt")
            };

            this.applicationDbContext.Clients.Add(client);

            await this.applicationDbContext.SaveChangesAsync();
            clientModel.Id = client.Id;
            return clientModel;
        }

        public async Task<ClientModel> DeleteClient(Guid id)
        {
            var client = this.applicationDbContext.Clients.FirstOrDefault(s => s.Id == id);

            if (client == null)
            {
                throw new InvalidOperationException("Null reference argument exception.");
            }

            this.applicationDbContext.Clients.Remove(client);
            await this.applicationDbContext.SaveChangesAsync();
            return new ClientModel { Id = id };
        }

        public async Task<IEnumerable<ClientModel>> GetClients()
        {
            return await applicationDbContext.Clients
               .Select(ClientModel.ProjectTo())
               .ToListAsync();
        }

        public async Task<ClientModel> UpdateClient(ClientModel clientModel, Guid id)
        {
            var client = this.applicationDbContext.Clients.FirstOrDefault(x => x.Id == id);

            if (client == null)
            {
                throw new InvalidOperationException("Null reference argument exception.");
            }

            if (clientModel.FirstName != string.Empty)
            {
                client.FirstName = clientModel.FirstName;
            }
            if (clientModel.MiddleName != string.Empty)
            {
                client.MiddleName = clientModel.MiddleName;
            }
            if (clientModel.LastName != string.Empty)
            {
                client.LastName = clientModel.LastName;
            }
            if (clientModel.UCN != string.Empty)
            {
                client.UCN = SharedService.UcnModifier(clientModel.UCN, "encrypt");
            }

            this.applicationDbContext.Clients.Update(client);

            await this.applicationDbContext.SaveChangesAsync();
            clientModel.Id = id;
            return (clientModel);
        }

    }
}
