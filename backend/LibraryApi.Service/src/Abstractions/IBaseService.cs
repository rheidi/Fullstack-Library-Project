using LibraryApi.Domain.src.Shared;

namespace LibraryApi.Service.src.Abstractions;

public interface IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
{
  Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions);
  Task<TReadDto> GetOneById(string id);
  Task<TReadDto> UpdateOneById(string id, TUpdateDto updated);
  Task<bool> DeleteOneById(string id);
  Task<TReadDto> CreateOne(TCreateDto dto);
}