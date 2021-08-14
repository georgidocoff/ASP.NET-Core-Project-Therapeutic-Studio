namespace TherapeuticStudio.Services.Extensions
{
    using System.Security.Claims;

    using static Data.ApiConstants;

    public static class ClaimPrincipal
    {
        public static string Id(this ClaimsPrincipal user)
            => user.FindFirst(ClaimTypes.NameIdentifier).Value;

        public static bool IsAdmin(this ClaimsPrincipal user)
            => user.IsInRole(AdministratorRoleName);
    }
}
