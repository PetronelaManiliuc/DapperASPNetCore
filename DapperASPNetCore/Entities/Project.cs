using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DapperASPNetCore.Entities
{
    public class Project
    {
        public int Id { get; set; }

        public int ManagerId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public Phase Status { get; set; }

        public List<Employee> Employees { get; set; } = new List<Employee>();
    }
}
