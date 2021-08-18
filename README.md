# ASP.NET-Core-Project-Therapeutic-Studio
with Web Api - Angular

This is some project for Therapeutic Studio with 

Scheduler and do same basic functionality with:

- manage clients,
- manage trainer,
- manage procedure,
- manage payments.

Project Start:
- Download project to a local machine via .zip file.
- Open existing project.
- select TherapeuticStudio.sln from downloaded unziped folder.
- Click OK.
- Thrust Security Warning (if You wish)
- Run project via Kestrel.
  Info: the dB will be seed with:
			- 3 Therapists;
			- 3 Procedure;
			- 3 Clients.
			
Project Functionality:
----------------------

Registered User without admin previlegue can:

In Home/Scheduler View:
 - add new Procedure for existing Client (parameter: existing therapist, for getted hour) and select the wright one;
 - can edit existing procedure and select payment method;
 
In Manage Client View:
 - view client Info and Time line for added Procedures;
 - the user can not modify Cient Information;
 

The seeded admin user is:

user: admin@studio.com
pass: admin123

Admin user can:

In Home/Scheduler View:
 - can do same as user;

In Manage Client View:
 - view client Info and Time line for added Procedures;
 - edit user info

In Cash View:
 - for the selected day can view Time line of paid/unpaid for all payments

In Administration View
 - a. can create new therapist;
 - a. can manage all therapists (including delete one);
 - b. can create new procedure;
 - b. can manage all procedures (including delete one);
 - c. can create new client;
 - c. can manage all clients (including delete one);
----------------------
 
 Technologies and tools used:
 
 - ASP.NET Core 5.0;
 - Microsoft EF core 5;
 - Microsoft Spa Service Exstension for Angular;
 - Bootstrap;
 - Ngx
 - MyTested.AspNetCore.Mvc
----------------------

