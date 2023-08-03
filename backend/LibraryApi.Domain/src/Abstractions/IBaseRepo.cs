using LibraryApi.Domain.src.Shared;

namespace LibraryApi.Domain.src.Abstractions;

public interface IBaseRepo<T>
{
  IEnumerable<T> GetAll(QueryOptions queryOptions);
  T GetOneById(string id);
  T UpdateOneById(T UpdatedEntity, string id);
  bool DeleteOneById(string id);
}
