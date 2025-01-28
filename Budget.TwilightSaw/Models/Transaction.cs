namespace Budget.TwilightSaw.Models;

public class Transaction
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime DateTime { get; set; }
    public decimal Finance { get; set; }
    public virtual Category Category { get; set; }
    public int CategoryId { get; set; }
}