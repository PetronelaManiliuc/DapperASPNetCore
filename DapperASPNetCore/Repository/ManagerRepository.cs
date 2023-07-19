using Dapper;
using DapperASPNetCore.Context;
using DapperASPNetCore.Contracts;
using DapperASPNetCore.Dto;
using DapperASPNetCore.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DapperASPNetCore.Repository
{
    public class ManagerRepository : IManagerRepository
    {
        private readonly DapperContext _context;

        public ManagerRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Manager>> GetManagers()
        {
            var query = "SELECT Id, Name, Age, Email, Phone, CompanyId FROM Managers";

            using (var connection = _context.CreateConnection())
            {
                var managers = await connection.QueryAsync<Manager>(query);
                return managers.ToList();
            }
        }

        public async Task<Manager> GetManager(int id)
        {
            var query = "SELECT * FROM Managers WHERE Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                var manager = await connection.QuerySingleOrDefaultAsync<Manager>(query, new { id });

                return manager;
            }
        }

        public async Task<Manager> CreateManager(ManagerForCreationDto manager)
        {
            var query = "INSERT INTO Managers (Name, Age, Email, Phone, CompanyId) VALUES (@Name, @Age, @Email, @Phone, @CompanyId)" +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var parameters = new DynamicParameters();
            parameters.Add("Name", manager.Name, DbType.String);
            parameters.Add("Age", manager.Age, DbType.String);
            parameters.Add("Email", manager.Email, DbType.String);
            parameters.Add("Phone", manager.Phone, DbType.String);
            parameters.Add("CompanyId", manager.CompanyId, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(query, parameters);

                var createdCompany = new Manager
                {
                    Id = id,
                    Name = manager.Name,
                    Email = manager.Email,
                    Phone = manager.Phone,
                    CompanyId = manager.CompanyId,
                    Age = manager.Age
                };

                return createdCompany;
            }
        }
    }
}
