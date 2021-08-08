using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using TherapeuticStudio.Data;
using TherapeuticStudio.Data.Entity;
using TherapeuticStudio.Data.Enums;

namespace TherapeuticStudio.Services.Therapists
{
    public class TherapistService : ITherapistService
    {
        private readonly ApplicationDbContext dbContext;

        public TherapistService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<TherapistModel> CreateTherapist(TherapistModel therapistModel)
        {
            var therapist = new Тherapist
            {
                Id =therapistModel.Id,
                FirstName = therapistModel.FirstName,
                MiddleName = therapistModel.MiddleName,
                LastName = therapistModel.LastName,
                PositionType = therapistModel.PositionType.HasValue ? therapistModel.PositionType.Value:null,
                RoleType = therapistModel.RoleType.HasValue? therapistModel.RoleType.Value:null
            };

            this.dbContext.Therapists.Add(therapist);

            await this.dbContext.SaveChangesAsync();
            therapistModel.Id = therapist.Id;
            return therapistModel;
        }

        public async Task<TherapistModel> DeleteTherapist(int id)
        {
            var therapist = this.dbContext.Therapists.FirstOrDefault(s => s.Id == id);
            this.dbContext.Therapists.Remove(therapist);
            await this.dbContext.SaveChangesAsync();
            return new TherapistModel { Id = id };
        }

        public async Task<IEnumerable<TherapistModel>> GetTherapists()
        {
            return await dbContext.Therapists
                .Select(TherapistModel.ProjectTo())
                .ToListAsync();
        }

        public async Task<TherapistModel> UpdateTherapist(TherapistModel therapistModel, int id)
        {
            var therapist = this.dbContext.Therapists.FirstOrDefault(x => x.Id == id);

            if (therapistModel.FirstName != string.Empty)
            {
                therapist.FirstName = therapistModel.FirstName;
            }
            if (therapistModel.MiddleName != string.Empty)
            {
                therapist.MiddleName = therapistModel.MiddleName;
            }
            if (therapistModel.LastName != string.Empty)
            {
                therapist.LastName = therapistModel.LastName;
            }
            if (therapistModel.PositionType != 0)
            {
                therapist.PositionType = therapistModel.PositionType.Value;
            }
            if (therapistModel.RoleType != 0)
            {
                therapist.RoleType = therapistModel.RoleType.Value;
            }

            this.dbContext.Therapists.Update(therapist);

            await this.dbContext.SaveChangesAsync();
            therapistModel.Id = therapist.Id;
            return therapistModel;
        }
    }
}
