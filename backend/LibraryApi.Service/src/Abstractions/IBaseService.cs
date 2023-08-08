using LibraryApi.Domain.src.Shared;

namespace LibraryApi.Service.src.Abstractions;

public interface IBaseService<T, TDto>
{
  IEnumerable<TDto> GetAll(QueryOptions queryOptions);
  TDto GetOneById(string id);
  TDto UpdateOneById(string id, TDto updated);
  bool DeleteOneById(string id);
}
