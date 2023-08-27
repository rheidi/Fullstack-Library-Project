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
    return await _dbSet.ToArrayAsync();
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
