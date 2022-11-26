using Api.Entities;

namespace Api.Extensions;

public static class ProductExtensions
{
    // Sort Query
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
    {
        // Set default sorting method by product name.
        if (string.IsNullOrEmpty(orderBy)) return query.OrderBy(p => p.Name); 

        // Switch query to sort data.
        query = orderBy switch
        {
            // Sort products price, descending or by product name.
            "price" => query.OrderBy(p => p.Price),
            "priceDesc" => query.OrderByDescending(p => p.Price),
            _ => query.OrderBy(p => p.Name)
        };

        return query;
    }

    // Search Query
    public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
    {
        // Set default search query
        if (string.IsNullOrEmpty(searchTerm)) return query;

        // Set result to lower case. 
        var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

        // Query the database with the text input from user.
        return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
    }

    // Filter Query
    public static IQueryable<Product> Filter(this IQueryable<Product> query, string? brands, string? types)
    {
        // Filter list by..
        var brandList = new List<string>();
        var typeList = new List<string>();

        // Set default filter query if brands are not selected.
        if (!string.IsNullOrEmpty(brands))
            brandList.AddRange(brands.ToLower().Split(",").ToList());

        // Set default filter query if types are not selected.
        if (!string.IsNullOrEmpty(types))
            typeList.AddRange(types.ToLower().Split(",").ToList());

        // Get the according filter.
        query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand!.ToLower()));
        query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type!.ToLower()));

        return query;
    }
}