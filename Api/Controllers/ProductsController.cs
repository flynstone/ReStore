using Api.Data;
using Api.Entities;
using Api.Extensions;
using Api.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

public class ProductsController : BaseApiController
{
  private readonly StoreContext _context;
  public ProductsController(StoreContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
  {
    // Set query to return a controlled list
    var query = _context.Products
      .Sort(productParams.OrderBy!)
      .Search(productParams.SearchTerm!)
      .Filter(productParams.Brands, productParams.Types)
      .AsQueryable();

    // Get the products using query params
    var products = await PagedList<Product>.ToPagedList(query,
      productParams.PageNumber, productParams.PageSize);

    // Set the http header
    Response.AddPaginationHeader(products.MetaData);

    return products;
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Product>> GetProduct(int id)
  {
    return await _context.Products.FindAsync(id);
  }


  [HttpGet("filters")]
  public async Task<IActionResult> GetFilters()
  {
    var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
    var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

    return Ok(new { brands, types });
  }
}