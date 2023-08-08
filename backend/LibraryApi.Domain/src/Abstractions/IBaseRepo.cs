using LibraryApi.Domain.src.Shared;

namespace LibraryApi.Domain.src.Abstractions;

public interface IBaseRepo<T>
{
  IEnumerable<T> GetAll(QueryOptions queryOptions);
  T GetOneById(string id);
  T UpdateOneById(T originalEntity, T updatedEntity);
  bool DeleteOneById(T entity);
}
