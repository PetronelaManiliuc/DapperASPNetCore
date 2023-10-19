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


        public async Task<IEnumerable<Manager>> GetManagersByCompanyId(int companyId)
        {
            var query = "SELECT * FROM Managers WHERE CompanyID = @CompanyId";

            using (var connection = _context.CreateConnection())
            {
                var manager = await connection.QueryAsync<Manager>(query, new { companyId });

                return manager.ToList();
            }
        }

        //public async Task<Manager> GetManagerwithDependencies(int id)
        //{
        //    var query = "SELECT * FROM Managers m Join Employees e on  m.Id = e.ManagerId Left Join Projects p on m.Id = p.ManagerId WHERE m.Id = @Id";

        //    using (var connection = _context.CreateConnection())
        //    {
        //        var managerDict = new Dictionary<int, Manager>();
        //    }
        //}

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

                var createdManager = new Manager
                {
                    Id = id,
                    Name = manager.Name,
                    Email = manager.Email,
                    Phone = manager.Phone,
                    CompanyId = manager.CompanyId,
                    Age = manager.Age
                };

                return createdManager;
            }
        }

        public async Task UpdateManager(int id, ManagerForCreationDto manager)
        {
            var query = "UPDATE Managers SET Name = @Name, Age = @Age, Email = @Email, Phone = @Phone, CompanyId = @CompanyId WHERE Id = @Id";

            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);
            parameters.Add("Name", manager.Name, DbType.String);
            parameters.Add("Age", manager.Age, DbType.String);
            parameters.Add("Email", manager.Email, DbType.String);
            parameters.Add("Phone", manager.Phone, DbType.String);
            parameters.Add("CompanyId", manager.CompanyId, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task DeleteManager(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                var q1 = "Delete From Projects Where ManagerId = @Id";
                var q2 = "Delete From Employees Where ManagerId = @Id";

                var query = "DELETE FROM Managers WHERE Id = @Id";
                connection.Open();
                IDbTransaction transaction = null;
                try
                {
                    using (transaction = connection.BeginTransaction())
                    {
                        var parameters = new DynamicParameters();
                        parameters.Add("Id", id, DbType.Int32);
                        await connection.ExecuteAsync(q1, parameters, transaction: transaction);
                        await connection.ExecuteAsync(q2, parameters, transaction: transaction);
                        await connection.ExecuteAsync(query, parameters, transaction: transaction);
                        transaction.Commit();
                    }
                }
                catch(Exception ex) {
                    transaction.Rollback();
                }
                //   await connection.ExecuteAsync(query, new { id });
            }
        }
    }
}
