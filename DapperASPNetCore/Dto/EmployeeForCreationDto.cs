namespace DapperASPNetCore.Dto
{
    public class EmployeeForCreationDto
	{
		public string Name { get; set; }
		public int Age { get; set; }
		public string Position { get; set; }
		public int CompanyId { get; set; }
		public int ManagerId { get; set; }
	}
}
