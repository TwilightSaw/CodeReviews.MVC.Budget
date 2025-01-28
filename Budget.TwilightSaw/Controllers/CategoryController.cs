using Budget.TwilightSaw.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Budget.TwilightSaw.Service;

namespace Budget.TwilightSaw.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController(CategoryService service) : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Category>> GetCategories()
        {
            return Ok(service.GetCategories());
        }

        [HttpGet("{id}")]
        public ActionResult<Category> GetCategory(int id)
        {
            return Ok(service.GetCategory(id));
        }
        
        [HttpPost]
        public ActionResult<Category> AddCategory([FromBody] Category category)
        {
            service.AddCategory(category);
            return CreatedAtAction(nameof(GetCategory),new{id = category.Id}, category);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCategory(int id, [FromBody] Category updatedCategory)
        {
            var category = service.GetCategory(id);
            if (category == null) return NotFound();

            service.UpdateCategory(updatedCategory);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            if (service.GetCategory(id) == null) return NotFound();
            service.DeleteCategory(id);
            return NoContent();
        }
    }
}
