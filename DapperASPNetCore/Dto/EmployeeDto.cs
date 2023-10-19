namespace DapperASPNetCore.Dto
{
	public class EmployeeDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int Age { get; set; }
		public string Position { get; set; }
		public string ManagerName { get; set; }
		public string CompanyName { get; set; }
		public int CompanyId { get; set; }
		public int ManagerId { get; set; }
	}
}
