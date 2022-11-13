using System.ComponentModel.DataAnnotations.Schema;
using Api.Entities;

namespace Api.Entities;

[Table("BasketItems")]
public class BasketItem
{
  public int Id { get; set; }
  public int Quantity { get; set; }

  // Foreign Key / Navigation Properties
  public int ProductId { get; set; }
  public Product Product { get; set; }

  public int BasketId { get; set; }
  public Basket Basket { get; set; }
}