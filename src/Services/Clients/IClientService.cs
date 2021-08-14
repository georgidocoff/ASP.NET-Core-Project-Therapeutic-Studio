namespace TherapeuticStudio.Services.Clients
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IClientService
    {
        Task<IEnumerable<ClientModel>> GetClients();

        Task<ClientModel> CreateClient(ClientModel clientModel);

        Task<ClientModel> UpdateClient(ClientModel clientModel, Guid id);

        Task<ClientModel> DeleteClient(Guid id);
    }
}
