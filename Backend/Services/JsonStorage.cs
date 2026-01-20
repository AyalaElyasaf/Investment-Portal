using InvestmentsApi.Models;
using System.Text.Json;

namespace InvestmentsApi.Services
{
    public static class JsonStorage
    {
        private static readonly string FilePath = "Data/users.json";
        private static readonly object _lock = new();

        public static List<UserAccount> LoadUsers()
        {
            lock (_lock)
            {
                if (!File.Exists(FilePath))
                    return new();

                var json = File.ReadAllText(FilePath);
                return JsonSerializer.Deserialize<List<UserAccount>>(json) ?? new();
            }
        }

        public static void SaveUsers(IEnumerable<UserAccount> users)
        {
            lock (_lock)
            {
                Directory.CreateDirectory("Data");

                var json = JsonSerializer.Serialize(users, new JsonSerializerOptions
                {
                    WriteIndented = true
                });

                File.WriteAllText(FilePath, json);
            }
        }
    }
}
