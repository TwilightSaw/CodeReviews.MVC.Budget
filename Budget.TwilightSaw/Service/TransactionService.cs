using Budget.TwilightSaw.Models;
using Budget.TwilightSaw.Repository;

namespace Budget.TwilightSaw.Service;

public class TransactionService(IRepository<Transaction> repository)
{
    public void AddTransaction(Transaction transaction)
    {
        repository.Add(transaction);
    }

    public List<Transaction> GetTransactions()
    {
        return repository.GetAll().ToList();
    }

    public Transaction GetTransaction(int id)
    {
        return repository.GetById(id);
    }

    public void UpdateTransaction(Transaction transaction)
    {
        repository.Update(transaction);
    }

    public void DeleteTransaction(int id)
    {
        repository.Delete(id);
    }
}