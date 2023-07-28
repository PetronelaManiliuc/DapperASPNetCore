using DapperASPNetCore.Contracts;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace DapperASPNetCore.Controllers
{
    [Route("api/employees")]
	[ApiController]
	public class EmployeesController : ControllerBase
	{
		private readonly IEmployeeRepository _employeesRepo;

		public EmployeesController(IEmployeeRepository employeeRepo)
		{
			_employeesRepo = employeeRepo;
		}

		[HttpGet]
		public async Task<IActionResult> GetEmployees()
		{
			try
			{
				var employees = await _employeesRepo.GetEmployees();
				return Ok(employees);
			}
			catch (Exception ex)
			{
				//log error
				return StatusCode(500, ex.Message);
			}
		}

		[HttpGet("multiple")]
		public async Task<IActionResult> GetMultipleEmployeesWithProjects()
		{
			try
			{
				var employees = await _employeesRepo.GetEmployees();
				return Ok(employees);
			}
			catch (Exception ex)
			{
				//log error
				return StatusCode(500, ex.Message);
			}
		}

	}
}
