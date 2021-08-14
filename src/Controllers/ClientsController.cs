namespace TherapeuticStudio.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using TherapeuticStudio.Services.Clients;

    using static Data.ApiConstants;

    [Authorize]
    [ApiController]
    [Route("api/clients")]
    public class ClientsController : ControllerBase
    {
        private readonly IClientService clientService;

        public ClientsController(IClientService clientService)
        {
            this.clientService = clientService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientModel>>> Get()
        {
            var clients = await this.clientService.GetClients();
            return this.Ok(clients);
        }

        [HttpPost]
        public async Task<ActionResult<ClientModel>> Create(ClientModel clientModel)
        {
            try
            {
                var client = await this.clientService.CreateClient(clientModel);
                return this.Ok(client);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = AdministratorRoleName)]
        [HttpPatch("update/{id}")]
        public async Task<ActionResult<ClientModel>> Update(Guid id, ClientModel clientModel)
        {
            try
            {
                var client = await this.clientService.UpdateClient(clientModel, id);
                return this.Ok(client);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }

        }

        [Authorize(Roles = AdministratorRoleName)]
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<ClientModel>> Delete(Guid id)
        {
            try
            {
                var client = await this.clientService.DeleteClient(id);
                return this.Ok(client);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }
    }
}
