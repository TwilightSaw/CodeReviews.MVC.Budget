namespace Budget.TwilightSaw.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<Transaction>? Transactions { get; set; }
    }
}
