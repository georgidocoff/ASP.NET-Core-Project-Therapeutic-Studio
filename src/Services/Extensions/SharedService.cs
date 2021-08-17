namespace TherapeuticStudio.Services.Extensions
{
    using System;

    public static class SharedService
    {
        public static string UcnModifier(string ucn, string mode)
        {
            string output = string.Empty;
            int modifierDigit = 12;

            if (ucn==null)
            {
                throw new InvalidOperationException("Null reference argument exception.");
            }

            switch (mode)
            {
                case "encrypt":
                    if (ucn == "9999999999")
                    {
                        return "FFFFFFFFFF";
                    }

                    foreach (var element in ucn)
                    {
                        output += (char)((int)element + modifierDigit);
                    }
                    break;
                case "decrypt":
                    if (ucn == "FFFFFFFFFF")
                    {
                        return "9999999999";
                    }

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
