namespace TherapeuticStudio.Services.Therapists
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ITherapistService
    {
        Task<IEnumerable<TherapistModel>> GetTherapists();

        Task<TherapistModel> CreateTherapist(TherapistModel therapist);

        Task<TherapistModel> UpdateTherapist(TherapistModel therapistModel, int id);

        Task<TherapistModel> DeleteTherapist(int id);
    }
}
