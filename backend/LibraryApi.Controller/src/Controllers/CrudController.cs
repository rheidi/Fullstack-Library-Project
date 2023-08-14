using LibraryApi.Domain.src.Shared;
using LibraryApi.Service.src.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controller.src.Controllers;

[ApiController]
[Route("api/v1/[controller]s")]
public class CrudController<T, TReadDto, TCreateDto, TUpdateDto> : ControllerBase
{
  private readonly IBaseService<T, TReadDto, TCreateDto, TUpdateDto> _baseService;

  public CrudController(IBaseService<T, TReadDto, TCreateDto, TUpdateDto> baseService)
  {
    _baseService = baseService;
  }

  [HttpGet]
  public virtual async Task<ActionResult<IEnumerable<TReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
  {
    var result = (await _baseService.GetAll(queryOptions)).ToArray();
    return Ok(result);
  }

  [HttpGet("{id:Guid}")]
  public virtual async Task<ActionResult<TReadDto>> GetOneById ([FromRoute] Guid id)
  {
    return Ok(await _baseService.GetOneById(id));
  }

  [HttpPost]
  public virtual async Task<ActionResult<TReadDto>> CreateOne([FromBody] TCreateDto dto)
  {
    var createdObject = await _baseService.CreateOne(dto);
    return CreatedAtAction(nameof(CreateOne), createdObject);
  }

  [HttpPatch("{id:Guid}")]
  public virtual async Task<ActionResult<TReadDto>> UpdateOneById([FromRoute] Guid id, [FromBody] TUpdateDto updateDto)
  {
    var updatedObject = await _baseService.UpdateOneById(id, updateDto);
    return Ok(updatedObject);
  }

  [HttpDelete("{id:Guid}")]
  public virtual async Task<ActionResult<bool>> DeleteOneById([FromRoute] Guid id)
  {
    return StatusCode(204, await _baseService.DeleteOneById(id));
  }
}
