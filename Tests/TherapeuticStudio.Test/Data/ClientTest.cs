namespace TherapeuticStudio.Test.Data
{
    using TherapeuticStudio.Services.Clients;

    public class ClientTest
    {
        public static string apiRoute = "api/clients";

        public static ClientModel clientModel = new ClientModel
        {
            FirstName = "Test",
            LastName = "Test",
            UCN = "9999999999"
        };
    }
}
