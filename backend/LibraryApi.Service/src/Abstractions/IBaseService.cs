using LibraryApi.Domain.src.Shared;

namespace LibraryApi.Service.src.Abstractions;

public interface IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
{
  Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions);
  Task<TReadDto> GetOneById(Guid id);
  Task<TReadDto> UpdateOneById(Guid id, TUpdateDto updated);
  Task<bool> DeleteOneById(Guid id);
  Task<TReadDto> CreateOne(TCreateDto dto);
}
