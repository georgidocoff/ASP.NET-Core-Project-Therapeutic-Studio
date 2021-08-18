# ASP.NET-Core-Project-Therapeutic-Studio
with Web Api - Angular

This is a Therapeutic Studio project.
The main functionalities are: 
 - drawing up a schedule for clients' visits; 
 - drawing up a schedule of therapists for their employment;
 - monitoring payments and managed procedures.

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

			
Project Functionalities:
----------------------

Two types of users can work with the platform: 
	with administrative rights and without such.

Registered User without admin rights may:

In Home/Scheduler View:
 - add new Procedure for an existing Client with parameters- existing therapist and exact time, and selecting the correct procedure from dropdown;
 - can edit current procedure and choose a payment method;
 
In Manage Client View:
 - can see the client information and Time line for booked Procedures;
 - the user cannot change Cient Information;
 

The seeded admin user is:

user: admin@studio.com
pass: admin123

User with admin rights may:

In Home/Scheduler View:
 - can do anything that is allowed to the user without admin rights;

In Manage Client View:
 - can see the client information and Time line for booked Procedures;
 - the user can change Cient Information;

In Cash View:
 - can monitor payments for specific day by tracking them by payment method and time;

In Administration View
 - a. can create a new therapist;
 - a. can manage all therapists (including delete one);
 - b. can create a new procedure;
 - b. can manage all procedures (including delete one);
 - c. can create a new client;
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

