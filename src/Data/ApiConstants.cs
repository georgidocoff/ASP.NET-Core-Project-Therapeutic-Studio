namespace TherapeuticStudio.Data
{
    public static class ApiConstants
    {
        public const int ТherapistNameMaxLenght = 30;

        public const int ClientNameMaxLenght = 30;
        public const int ClientUcnMaxLenght = 10;
        public const string ClientUcnRegExp = "/[0-9{2}]+[0-1]{1}+[0-2]{1}+[0-3]{1}+[0-9]{1}+[0-9]{4}|[9]{10}";

        public const int ProcedureNameMaxLenght = 20;

        public const string AdministratorRoleName = "Administrator";
    }
}
