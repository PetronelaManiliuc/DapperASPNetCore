using DapperASPNetCore.Contracts;
using DapperASPNetCore.Dto;
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


		[HttpGet("{id}", Name = "EmployeeyById")]
		public async Task<IActionResult> GetEmployee(int id)
		{
			try
			{
				var employee = await _employeesRepo.GetEmployee(id);
				if (employee == null)
					return NotFound();

				return Ok(employee);
			}
			catch (Exception ex)
			{
				//log error
				return StatusCode(500, ex.Message);
			}
		}

		[HttpGet]
		public async Task<IActionResult> GetEmployees()
		{
			try
			{
				var employees = await _employeesRepo.GetEmployeesAndDependencies();
				return Ok(employees);
			}
			catch (Exception ex)
			{
				//log error
				return StatusCode(500, ex.Message);
			}
		}

		[HttpPost]
		public async Task<IActionResult> CreateEmployee(EmployeeForCreationDto employee)
		{
			try
			{
				var createdCompany = await _employeesRepo.CreateEmployee(employee);
				return CreatedAtRoute("EmployeeyById", new { id = createdCompany.Id }, createdCompany);
			}
			catch (Exception ex)
			{
				//log error
				return StatusCode(500, ex.Message);
			}
		}

		[HttpPut]
		public async Task<IActionResult> UpdateCompany(EmployeeDtoForUpdate employee)
		{
			try
			{
				var dbCompany = await _employeesRepo.GetEmployee(employee.Id);
				if (dbCompany == null)
					return NotFound();

				await _employeesRepo.UpdateEmployee(employee);
				return NoContent();
			}
			catch (Exception ex)
			{
				//log error
				return StatusCode(500, ex.Message);
			}
		}

		//add delete method


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
