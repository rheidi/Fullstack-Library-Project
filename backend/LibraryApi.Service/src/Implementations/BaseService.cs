using AutoMapper;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Domain.src.Shared;
using LibraryApi.Service.src.Abstractions;
using LibraryApi.Service.src.Shared;

namespace LibraryApi.Service.src.Implementations;

public class BaseService<T, TReadDto, TCreateDto, TUpdateDto> : IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
{
  private readonly IBaseRepo<T> _baseRepo;
  protected readonly IMapper _mapper;

  public BaseService(IBaseRepo<T> baseRepo, IMapper mapper)
  {
    _baseRepo = baseRepo;
    _mapper = mapper;
  }
  public async Task<bool> DeleteOneById(Guid id)
  {
    var foundItem = await _baseRepo.GetOneById(id);
    if (foundItem != null)
    {
      await _baseRepo.DeleteOneById(foundItem);
      return true;
    }
    return false;
  }

  public async Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions)
  {
    return _mapper.Map<IEnumerable<TReadDto>>(await _baseRepo.GetAll(queryOptions));
  }

  public async Task<TReadDto> GetOneById(Guid id)
  {
    var foundItem = await _baseRepo.GetOneById(id);
    if (foundItem is null)
    {
      throw CustomException.NotFoundException();
    }
    return _mapper.Map<TReadDto>(foundItem);
  }

  public async Task<TReadDto> UpdateOneById(Guid id, TUpdateDto updated)
  {
    var foundItem = await _baseRepo.GetOneById(id);
    if (foundItem is null)
    {
      throw CustomException.NotFoundException();
    }
    var updatedEntity = _baseRepo.UpdateOneById(_mapper.Map<T>(updated));
    return _mapper.Map<TReadDto>(updatedEntity);
  }

  public virtual async Task<TReadDto> CreateOne(TCreateDto dto)
  {
    var entity = await _baseRepo.CreateOne(_mapper.Map<T>(dto));
    return _mapper.Map<TReadDto>(entity);
  }
}
