using DapperASPNetCore.Dto;
using DapperASPNetCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DapperASPNetCore.Contracts
{
    public interface IEmployeeRepository
	{
		public Task<IEnumerable<Employee>> GetEmployees();
		public Task<Employee> GetEmployee(int id);
		public Task<Employee> CreateEmployee(EmployeeForCreationDto employee);
		public Task UpdateEmployee(int id, EmployeeForCreationDto employee);
		public Task DeleteEmployee(int id);
		public Task<IEnumerable<Employee>> GetEmployeesAndProjects();

	}
}
