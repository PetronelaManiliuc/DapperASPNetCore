using Dapper;
using DapperASPNetCore.Context;
using DapperASPNetCore.Contracts;
using DapperASPNetCore.Dto;
using DapperASPNetCore.Entities;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DapperASPNetCore.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DapperContext _context;

        public EmployeeRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task AssignEmployeeToProject(IEnumerable<EmployeeProject> employees)
        {
            using (var connection = _context.CreateConnection())
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    string sql = "insert into EmployeeProject (EmployeeId, ProjectId) values(@EmployeeId, @ProjectId)";
                    var existingEmployees = GetProjectEmployees(employees.FirstOrDefault().ProjectId);
                    foreach (var a in employees)
                    {
                        var isExistingEmployee = existingEmployees.Result.Select(a => a.EmployeeId).Contains(a.EmployeeId);
                        if (!isExistingEmployee)
                        {
                            var item = await connection.ExecuteAsync(sql, new { EmployeeId = a.EmployeeId, ProjectId = a.ProjectId }, transaction);
                        }
                    }

                    transaction.Commit();
                }
            }
        }
        private async Task<IEnumerable<EmployeeProject>> GetProjectEmployees(int projectId)
        {
            var query = "SELECT * FROM EmployeeProject WHERE ProjectId = @ProjectId";

            using (var connection = _context.CreateConnection())
            {
                var pairs = await connection.QueryAsync<EmployeeProject>(query, new { projectId });

                return pairs.ToList();
            }
        }

        public async Task<Employee> CreateEmployee(EmployeeForCreationDto employee)
        {
            var query = "INSERT INTO Employees (Name, Age, Position, CompanyId, ManagerId) VALUES (@Name, @Age, @Position, @CompanyId, @ManagerId)" +
                   "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("Name", employee.Name, DbType.String);
            parameters.Add("Age", employee.Age, DbType.String);
            parameters.Add("Position", employee.Position, DbType.String);
            parameters.Add("ManagerId", employee.ManagerId, DbType.String);
            parameters.Add("CompanyId", employee.CompanyId, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(query, parameters);

                var createdEmployee = new Employee
                {
                    Id = id,
                    Name = employee.Name,
                    Position = employee.Position,
                    ManagerId = employee.ManagerId,
                    CompanyId = employee.CompanyId,
                    Age = employee.Age
                };

                return createdEmployee;
            }
        }

        public async Task DeleteEmployee(int id)
        {
            var query = "DELETE FROM Employees WHERE Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }

        public async Task<Employee> GetEmployee(int id)
        {
            var query = "SELECT * FROM Employees WHERE Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                var employee = await connection.QuerySingleOrDefaultAsync<Employee>(query, new { id });

                return employee;
            }
        }

        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            var test = GetEmployeesAndDependencies();
            var query = "SELECT * FROM Employees ";

            using (var connection = _context.CreateConnection())
            {
                var employees = await connection.QueryAsync<Employee>(query);
                return employees.ToList();
            }
        }

        public async Task<IEnumerable<EmployeeDto>> GetEmployeesAndDependencies()
        {
            var query = "SELECT e.Id, e.Name, e.Position, e.Age, m.Name As ManagerName, c.Name as CompanyName " +
                            "FROM Employees AS e " +
                            "LEFT JOIN Managers AS m " +
                            "ON e.ManagerId = m.Id " +
                            "LEFT JOIN Companies AS c " +
                            "ON e.CompanyId = c.Id ";

            using (var connection = _context.CreateConnection())
            {
                var employees = await connection.QueryAsync<EmployeeDto>(query);

                return employees.ToList();
            }
        }

        public Task<IEnumerable<Employee>> GetEmployeesAndProjects()
        {
            var query = "SELECT * FROM Employees e ";
            throw new System.NotImplementedException();
        }

        public async Task UpdateEmployee(EmployeeDtoForUpdate employee)
        {
            var query = "UPDATE Employees SET Name = @Name, Age = @Age, Position = @Position, @CompanyId = CompanyId, ManagerId = @ManagerId  WHERE Id = @Id";
            //Employees(Name, Age, Position, CompanyId, ManagerId) VALUES(@Name, @Age, @Position, @CompanyId, @ManagerId)" +

            var parameters = new DynamicParameters();
            parameters.Add("Id", employee.Id, DbType.Int32);
            parameters.Add("Name", employee.Name, DbType.String);
            parameters.Add("Age", employee.Age, DbType.String);
            parameters.Add("Position", employee.Position, DbType.String);
            parameters.Add("CompanyId", employee.CompanyId, DbType.String);
            parameters.Add("ManagerId", employee.ManagerId, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }
    }
}
