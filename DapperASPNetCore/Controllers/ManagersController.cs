using DapperASPNetCore.Contracts;
using DapperASPNetCore.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace DapperASPNetCore.Controllers
{
    [Route("api/managers")]
    [ApiController]
    public class ManagersController : ControllerBase
    {
        private readonly IManagerRepository _managerRepo;

        public ManagersController(IManagerRepository managerRepo)
        {
            _managerRepo = managerRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetManagers()
        {
            try
            {
                var managers = await _managerRepo.GetManagers();
                return Ok(managers);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{companyId}", Name = "ManagerByCompanyId")]
        public async Task<IActionResult> GetManagers(int companyId)
        {
            try
            {
                var managers = await _managerRepo.GetManagersByCompanyId(companyId);
                return Ok(managers);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        //[HttpGet("{id}", Name = "ManagerById")]
        //public async Task<IActionResult> GetManager(int id)
        //{
        //    try
        //    {
        //        var manager = await _managerRepo.GetManager(id);
        //        if (manager == null)
        //            return NotFound();

        //        return Ok(manager);
        //    }
        //    catch (Exception ex)
        //    {
        //        //log error
        //        return StatusCode(500, ex.Message);
        //    }
        //}

        [HttpPost]
        public async Task<IActionResult> CreateManager(ManagerForCreationDto manager)
        {
            try
            {
                var createdManager = await _managerRepo.CreateManager(manager);
                return CreatedAtRoute("ManagerById", new { id = createdManager.Id }, createdManager);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateManager(int id, ManagerForCreationDto manager)
        {
            try
            {
                var dbmanager = await _managerRepo.GetManager(id);
                if (dbmanager == null)
                    return NotFound();

                await _managerRepo.UpdateManager(id, manager);
                return NoContent();
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteManager(int id)
        {
            try
            {
                var dbManager = await _managerRepo.GetManager(id);
                if (dbManager == null)
                    return NotFound();

                await _managerRepo.DeleteManager(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        //[HttpGet("getWithDependencies/{id}")]
        //public async Task<IActionResult> GetManagerWithDependencies(int id)
        //{
        //    try
        //    {
        //        var manager = await _managerRepo.GetManagerwithDependencies(id);
        //        if (manager == null)
        //            return NotFound();

        //        return Ok(manager);
        //    }
        //    catch (Exception ex)
        //    {
        //        //log error
        //        return StatusCode(500, ex.Message);
        //    }
        //}
    }
}
