using Microsoft.EntityFrameworkCore;

namespace Budget.TwilightSaw.Repository;

public class Repository<T>(DbContext context) : IRepository<T> where T : class
{
    private readonly DbSet<T> _dbSet = context.Set<T>();
    public T GetById(int id)
    {
        return _dbSet.Find(id);
    }

    public IEnumerable<T> GetAll()
    {
        return _dbSet.ToList();
    }

    public void Delete(int id)
    {
        var entity = _dbSet.Find(id);
        if (entity == null) return;
        context.Remove(entity);
        context.SaveChanges();
    }

    public void Update(T entity)
    {
        context.Update(entity);
        context.SaveChanges();
    }

    public void Add(T entity)
    {
        context.Add(entity);
        context.SaveChanges();
    }
}