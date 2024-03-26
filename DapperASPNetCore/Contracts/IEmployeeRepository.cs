using DapperASPNetCore.Dto;
using DapperASPNetCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DapperASPNetCore.Contracts
{
    public interface IEmployeeRepository
    {
        public Task<IEnumerable<Employee>> GetEmployees();
        public Task<IEnumerable<EmployeeDto>> GetEmployeesAndDependencies();
        public Task<Employee> GetEmployee(int id);
        public Task<Employee> CreateEmployee(EmployeeForCreationDto employee);
        public Task UpdateEmployee( EmployeeDtoForUpdate employee);
        public Task DeleteEmployee(int id);
        public Task<IEnumerable<Employee>> GetEmployeesAndProjects();
        public Task AssignEmployeeToProject(IEnumerable<EmployeeProject> employees);

    }
}
