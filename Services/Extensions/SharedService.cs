namespace TherapeuticStudio.Services.Extensions
{
    using System;

    public static class SharedService
    {
        public static string UcnModifier(string ucn, string mode)
        {
            int modifierDigit = 12;

            string output = string.Empty;

            switch (mode)
            {
                case "encrypt":
                    foreach (var element in ucn)
                    {
                        output += (char)((int)element + modifierDigit);
                    }
                    break;
                case "decrypt":
                    foreach (var element in ucn)
                    {
                        output += (char)((int)element - modifierDigit);
                    }
                    break;
                default:
                    throw new InvalidOperationException($"The mode {mode} you entered is not valid for current context.");
            }

            return output;
        }
    }
}
