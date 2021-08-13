namespace TherapeuticStudio.Test
{
    using Xunit;
    using MyTested.AspNetCore.Mvc;
    using TherapeuticStudio.Controllers;
    using TherapeuticStudio.Data.Entity;
    using System.Linq;
    using System.Collections.Generic;
    using TherapeuticStudio.Services.Procedures;

    public class HomeControllerTest
    {
        [Fact]
        public void ProcedurePipe()
            =>
            MyMvc
            .Pipeline()
            .ShouldMap("/Error")
            .To<ProceduresController>(p => p.Get())
            .Which(controller => controller
            .WithData(x => x.WithEntities(new Procedure { })))
            .ShouldReturn()
                .ResultOfType<ProcedureModel>();


        [Fact]
        public void RequestGetShouldReturnCorrectResult()
            =>
            //Arrange
            MyController<ProceduresController>
                .Instance(controller => controller
                .WithUser("TestUser")
                //.WithData(data=>data.WithEntities(new Procedure {  })));
                //.WithData(Enumerable.Range());
                .WithData(x => x.WithEntities(new Procedure { })))
                //Act
                .Calling(c => c.Get())
                //Assert
                .ShouldReturn()
                .ResultOfType<ProcedureModel>();

        //private static IEnumerable<Procedure> GetProcedures()
        //    => Enumerable.Range(0,3).Select(i => new Procedure());

        [Fact]
        public void RequestCreateShouldReturnCorrectResult()
           =>
           //Arrange
           MyController<ProceduresController>
               .Instance(controller => controller
               .WithUser("TestUser")
               //.WithData(data=>data.WithEntities(new Procedure {  })));
               //.WithData(Enumerable.Range());
               .WithData(x => x.WithEntities(new Procedure { })))
               //Act
               .Calling(c => c.Create(new ProcedureModel { }))
               //Assert
               .ShouldReturn()
                .Created();

        [Fact]
        public void RequestDeletetShouldReturnCorrectResult()
           =>
           //Arrange
           MyController<ProceduresController>
               .Instance(controller => controller
               .WithUser("TestUser")
               //.WithData(data=>data.WithEntities(new Procedure {  })));
               //.WithData(Enumerable.Range());
               .WithData(x => x.WithEntities(new Procedure { })))
               //Act
               .Calling(c => c.Delete(1))
               //Assert
               .ShouldReturn()
                .Ok();
    }
}
