using AutoMapper;
using LibraryApi.Domain.src.Abstractions;
using LibraryApi.Domain.src.Shared;
using LibraryApi.Service.src.Abstractions;

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
  public async Task<bool> DeleteOneById(string id)
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

  public async Task<TReadDto> GetOneById(string id)
  {
    return _mapper.Map<TReadDto>(await _baseRepo.GetOneById(id));
  }

  public async Task<TReadDto> UpdateOneById(string id, TUpdateDto updated)
  {
    var foundItem = await _baseRepo.GetOneById(id);
    if (foundItem is null)
    {
      throw new Exception("Item not found.");
    }
    var updatedEntity = _baseRepo.UpdateOneById(foundItem, _mapper.Map<T>(updated));
    return _mapper.Map<TReadDto>(updatedEntity);
  }

  public async Task<TReadDto> CreateOne(TCreateDto dto)
  {
    var entity = await _baseRepo.CreateOne(_mapper.Map<T>(dto));
    return _mapper.Map<TReadDto>(entity);
  }
} 