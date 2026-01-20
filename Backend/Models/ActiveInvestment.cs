namespace InvestmentsApi.Models
{
    public class ActiveInvestment
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = "";
        public decimal AmountInvested { get; set; }
        public decimal ExpectedReturn { get; set; }
        public DateTime EndTime { get; set; }
    }
}
