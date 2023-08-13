using LibraryApi.Domain.src.Abstractions;
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

  public Task<T> CreateOne(T entity)
  {
      throw new NotImplementedException();
  }

  public Task<bool> DeleteOneById(T entity)
  {
      throw new NotImplementedException();
  }

  public Task<IEnumerable<T>> GetAll(QueryOptions queryOptions)
  {
      throw new NotImplementedException();
  }

  public async Task<T> GetOneById(Guid id)
  {
    return await _dbSet.FindAsync(id);
  }

  public Task<T> UpdateOneById(T originalEntity, T updatedEntity)
  {
      throw new NotImplementedException();
  }
}
