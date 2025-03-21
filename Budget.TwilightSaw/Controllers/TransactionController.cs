﻿using Budget.TwilightSaw.Models;
using Budget.TwilightSaw.Service;
using Microsoft.AspNetCore.Mvc;

namespace Budget.TwilightSaw.Controllers;


[Route("api/[controller]")]
[ApiController]
public class TransactionController(TransactionService service) : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Category>> GetTransactions()
    {
        return Ok(service.GetTransactions());
    }

    [HttpGet("{id}")]
    public ActionResult<Category> GetTransaction(int id)
    {
        return Ok(service.GetTransaction(id));
    }

    [HttpPost]
    public ActionResult<Category> AddTransaction([FromBody] Transaction transaction)
    {
        service.AddTransaction(transaction);
        return CreatedAtAction(nameof(GetTransaction), new { id = transaction.Id }, transaction);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTransaction(int id, [FromBody] Transaction updatedTransaction)
    {
        var transaction = service.GetTransaction(id);
        if (transaction == null) return NotFound();

        transaction.Name = updatedTransaction.Name;
        transaction.DateTime = updatedTransaction.DateTime;
        transaction.Finance = updatedTransaction.Finance;
        transaction.CategoryId = updatedTransaction.CategoryId;

        service.UpdateTransaction(transaction);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTransaction(int id)
    {
        if (service.GetTransaction(id) == null) return NotFound();
        service.DeleteTransaction(id);
        return NoContent();
    }
}