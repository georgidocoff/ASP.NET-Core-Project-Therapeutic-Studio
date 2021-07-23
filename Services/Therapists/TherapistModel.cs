namespace TherapeuticStudio.Services.Therapists
{
    using System;
    using System.Linq.Expressions;

    using TherapeuticStudio.Data.Entity;
    using TherapeuticStudio.Data.Enums;

    public class TherapistModel
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public PositionType? PositionType { get; set; }

        public RoleType? RoleType { get; set; }

        public static Expression<Func<Тherapist, TherapistModel>> ProjectTo()
        {
            return therapist => new TherapistModel
            {
                Id = therapist.Id,
                FirstName = therapist.FirstName,
                MiddleName = therapist.MiddleName,
                LastName = therapist.LastName,
                PositionType = therapist.PositionType,
                RoleType = therapist.RoleType
            };
        }
    }
}
