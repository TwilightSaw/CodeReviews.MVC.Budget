using Budget.TwilightSaw.Models;
using Budget.TwilightSaw.Repository;

namespace Budget.TwilightSaw.Service;

    public class CategoryService(IRepository<Category> repository)
    {
        public void AddCategory(Category category)
        {
            repository.Add(category);
        }

        public List<Category> GetCategories()
        {
            return repository.GetAll().ToList();
        }

        public Category GetCategory(int id)
        {
            return repository.GetById(id);
        }

        public void UpdateCategory(Category category)
        {
            repository.Update(category);
        }

        public void DeleteCategory(int id)
        {
            repository.Delete(id);
        }
}

