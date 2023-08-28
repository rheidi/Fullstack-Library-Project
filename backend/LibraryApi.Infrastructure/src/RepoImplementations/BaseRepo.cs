using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Domain.src.Entities;
using LibraryApi.Domain.src.Shared;
using LibraryApi.Infrastructure.src.Database;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Infrastructure.src.RepoImplementations;

public class BaseRepo<T> : IBaseRepo<T> where T : class
{
  private readonly DbSet<T> _dbSet;
  private readonly DatabaseContext _context;

  public BaseRepo(DatabaseContext dbContext)
  {
    _dbSet = dbContext.Set<T>();
    _context = dbContext;
  }

  public virtual async Task<T> CreateOne(T entity)
  {
    await _dbSet.AddAsync(entity);
    await _context.SaveChangesAsync();
    return entity;
  }

  public async Task<bool> DeleteOneById(T entity)
  {
    _dbSet.Remove(entity);
    await _context.SaveChangesAsync();
    return true;
  }

  public virtual async Task<IEnumerable<T>> GetAll(QueryOptions queryOptions)
  {
    var items = _dbSet.AsQueryable();

    if(!string.IsNullOrEmpty(queryOptions.Search))
    {
      var searchTerm = queryOptions.Search.ToLower();

      if (typeof(T) == typeof(Book))
      {
        items = items.Where(b => ((Book)
        (object)b).Title.ToLower().Contains(searchTerm));
        items = items.Include(b => ((Book)(object)b).Genre);
        items = items.Include(b => ((Book)(object)b).Author);
      }
      else if (typeof(T) == typeof(Author))
      {
        items = items.Where(a => ((Author)(object)a).FirstName.ToLower().Contains(searchTerm) ||
        ((Author)(object)a).LastName.ToLower().Contains(searchTerm));
      }
       else if (typeof(T) == typeof(User))
      {
        items = items.Where(u => ((User)(object)u).FirstName.ToLower().Contains(searchTerm) ||
        ((User)(object)u).LastName.ToLower().Contains(searchTerm));
      }
    }

    if (!queryOptions.OrderByDescending)
    {
      items.Reverse();
    }

    items = items.Skip((queryOptions.PageNumber - 1) * queryOptions.PageSize)
      .Take(queryOptions.PageSize);

    return await items.ToListAsync();
  }

  public virtual async Task<T?> GetOneById(Guid id)
  {
    return await _dbSet.FindAsync(id);
  }

  public async Task<T> UpdateOneById(T updatedEntity)
  {
    _dbSet.Update(updatedEntity);
    await _context.SaveChangesAsync();
    return updatedEntity;
  }
}
