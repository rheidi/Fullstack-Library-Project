using LibraryApi.Domain.src.Shared;

namespace LibraryApi.Domain.src.Abstractions;

public interface IBaseRepo<T>
{
  Task<IEnumerable<T>> GetAll(QueryOptions queryOptions);
  Task<T> GetOneById(string id);
  Task<T> UpdateOneById(T originalEntity, T updatedEntity);
  Task<bool> DeleteOneById(T entity);
  Task<T> CreateOne(T entity);
}