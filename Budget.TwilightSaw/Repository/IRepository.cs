using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;

namespace Budget.TwilightSaw.Repository;

public interface IRepository<T>
{
    T GetById(int id);
    IEnumerable<T> GetAll();
    void Delete(int id);
    void Update(T entity);
    void Add(T entity);

}