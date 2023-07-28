using System.Collections.Generic;

namespace DapperASPNetCore.Entities
{
    public class Company
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Address { get; set; }
		public string Country { get; set; }

		public List<Employee> Employees { get; set; } = new List<Employee>();
		public List<Manager> Managers { get; set; } = new List<Manager>();
	}
}
